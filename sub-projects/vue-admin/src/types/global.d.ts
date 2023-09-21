



declare module 'main_for_vue/request' {
  export const get: import('axios').AxiosInstance['get']
  export const post: import('axios').AxiosInstance['post']
  export const put: import('axios').AxiosInstance['put']
  export const del: import('axios').AxiosInstance['delete']
}

declare module 'main_for_vue/i18n' {
  export const i18nInit:  (config: { [language in string]: { [code in string]: string } }, defaultLanguage?: string) => { t: (code: string, options?: any) => string}
}