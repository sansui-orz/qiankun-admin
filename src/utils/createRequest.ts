// import axios, { AxiosResponse } from 'axios'
// import Cookie from 'js-cookie'

export const TOKEN_NAME = 'TOKEN'

export default function createRequest() {
  type AxiosResponse = import('axios').AxiosResponse
  type AxiosInstance = import('axios').AxiosInstance
  // type AxiosGet = import('axios').get
  let instance: AxiosInstance | undefined = undefined
  async function init(): Promise<AxiosInstance> {
    if (instance) return instance
    const Axios = await import('axios')
    const Cookie = (await import('js-cookie')).default
    const { default: axios } = Axios
    instance = axios.create({
      baseURL: 'http://localhost:7999'
    })
    
    instance.interceptors.request.use(function(config) {
      const token = Cookie.get(TOKEN_NAME)
      config.headers['x-token'] = token
      return config;
    })
    
    instance.interceptors.response.use(function(response: AxiosResponse) {
      if (response.status === 403) {
        window.location.href = location.host + '/login?back=' + decodeURIComponent(window.location.href)
        throw new Error(response.data.message || '登录状态异常，请先登录!')
      } else if (response.status !== 200 || response.data.code !== 200) {
        throw new Error(response.data.message || '请求异常!')
      }
      return response.data
    })
    return instance
  }
  type getType = AxiosInstance['get']
  return {
    get: async (...args) => {
      const instance = await init()
      return instance.get(...args)
    },
    getAxios: () => {
      return import('axios')
    }
  } as { get: getType }
}
