import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import qiankun from "vite-plugin-qiankun";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const commonConifg = {
    base: env.APP_HOST,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      qiankun("vue3sub", {
        useDevMode: true,
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
      federation({
        name: "vue-admin",
        remoteType: "module",
        remotes: {
          main_request_vue: env.FEDERATION_HOST + '/remoteEntryForVue.js',
          format: "module",
          from: "webpack",
        },
      }),
    ],
  };
  const productionConfig = {
    build: {
      target: 'esnext',
    },
  }
  const developmentConfig = {
    server: {
      port: 8002,
      cors: true,
      origin: "http://localhost:8002",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  }
  return {
    ...commonConifg,
    ...(mode === 'production' ? productionConfig : developmentConfig)
  };
});
