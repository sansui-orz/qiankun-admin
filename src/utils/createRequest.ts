export const TOKEN_NAME = "TOKEN";

export default function createRequest() {
  type AxiosResponse = import("axios").AxiosResponse;
  type AxiosInstance = import("axios").AxiosInstance;
  let instance: AxiosInstance | undefined = undefined;
  async function init(): Promise<AxiosInstance> {
    if (instance) return instance;
    // 作为模块联邦不能使用esm的方式同步引入模块，否则会将模块一同打入模块中无法共享依赖
    const Axios = await import("axios");
    const Cookie = (await import("js-cookie")).default;
    let { default: axios } = Axios;
    // @ts-ignore
    if (axios.default) axios = axios.default
    instance = axios.create({
      baseURL: "http://localhost:7999",
    });

    instance.interceptors.request.use(function (config) {
      const token = Cookie.get(TOKEN_NAME);
      if (token) {
        config.headers["x-token"] = token;
      }
      return config;
    });

    instance.interceptors.response.use(
      function (response: AxiosResponse) {
        if (response.data.code !== 200) {
          throw new Error(response.data.message || "请求异常!");
        }
        return response.data;
      },
      function ({ response }: { response: AxiosResponse }) {
        if (response.status === 403) {
          location.href =
            location.origin +
            "/login?back=" +
            encodeURIComponent(location.href);
          throw new Error(response.data.message || "登录状态异常，请先登录!");
        }
        return response;
      }
    );
    return instance;
  }
  return {
    get: async (...args) => {
      const instance = await init();
      return instance.get(...args);
    },
    post: async (...args) => {
      const instance = await init();
      return instance.post(...args);
    },
  } as {
    get: AxiosInstance["get"];
    post: AxiosInstance["post"];
  };
}
