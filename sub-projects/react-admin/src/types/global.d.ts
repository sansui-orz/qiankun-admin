declare module 'main_request/request' {
  export const get: import('axios').AxiosInstance['get']
  export const post: import('axios').AxiosInstance['post']
}