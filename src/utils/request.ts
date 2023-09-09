import axios, { AxiosResponse } from 'axios'
import Cookie from 'js-cookie'

const TOKEN_NAME = 'TOKEN'

const instance = axios.create({
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

export default instance
