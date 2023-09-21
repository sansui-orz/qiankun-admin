import { I18n, TranslateOptions  } from 'i18n-js'

declare global {
  const $t: (code: string, options?: TranslateOptions) => string;
  interface Window {
    __transition: Function;
    __i18n_instance__: I18n;
    __i18nCache__: ConfigType;
  }
}

type ConfigType = { [language: string]: { [code: string]: string } };
window.__i18nCache__ = {} as ConfigType

export function i18nInit(config: ConfigType, defaultLanguage?: string) {
  console.log('config ', config)
  /**
   config = {
      en: {
        hello: "Hi!",
      },
      "zh-CH": {
        hello: "Olá!",
      },
    }
   */
  const languageCodes = Object.keys(config)
  languageCodes.forEach((languageCode: string) => {
    if (window.__i18nCache__[languageCode]) {
      window.__i18nCache__[languageCode] = Object.assign(window.__i18nCache__[languageCode], config[languageCode])
    } else {
      window.__i18nCache__[languageCode] = config[languageCode]
    }
  })
  if (window.__i18n_instance__) {
    window.__i18n_instance__.store(window.__i18nCache__)
    return window.__i18n_instance__
  }
  const i18n = new I18n(config);
  i18n.defaultLocale = defaultLanguage || localStorage.getItem('language') === 'zh' ? 'zh-CN' : 'en'
  i18n.locale = defaultLanguage || localStorage.getItem('language') === 'zh' ? 'zh-CN' : 'en'
  window.__transition = i18n.t.bind(i18n);
  window.__i18n_instance__ = i18n;
  return i18n;
}