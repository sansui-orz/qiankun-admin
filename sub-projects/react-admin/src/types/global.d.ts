declare module 'main_request_react/request' {
  export const get: import('axios').AxiosInstance['get']
  export const post: import('axios').AxiosInstance['post']
  export const put: import('axios').AxiosInstance['put']
  export const del: import('axios').AxiosInstance['delete']
}