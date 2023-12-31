import { defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import qiankun from "vite-plugin-qiankun";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const commonConifg = {
    base: env.APP_HOST,
    define: {
      $t: '__transition',
      qiankunMainAppHost: `'${env.FEDERATION_HOST}'`
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/assets/base/variable.less";`
        }
      }
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
          main_for_vue: env.FEDERATION_HOST + '/remoteEntryForVue.js',
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
