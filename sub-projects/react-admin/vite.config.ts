import { defineConfig, loadEnv } from "vite";
import path from "path";
import qiankun from "vite-plugin-qiankun";
import federation from "@originjs/vite-plugin-federation";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const commonConifg = {
    base: env.APP_HOST,
    define: {
      $t: '__transition',
      qiankunMainAppHost: `'${env.FEDERATION_HOST}'`
    },

    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      qiankun("reac18", {
        useDevMode: true,
      }),
      externalGlobals({
        React: "react",
        ReactDom: "react-dom",
        ReactRouterDom: "react-router-dom",
      }),
      federation({
        name: "react-admin",
        remoteType: "module",
        remotes: {
          main_for_react: env.FEDERATION_HOST + "/remoteEntryForReact.js",
          format: "module",
          from: "webpack",
        },
      }),
    ],
  }

  const productionConfig = {
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          name: "react-admin-[name]",
        },
      },
    },
  }

  const developmentConfig = {
    server: {
      port: 8001,
      cors: true,
      origin: 'http://localhost:8001',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }

  return {
    ...commonConifg,
    ...(mode === 'production' ? productionConfig : developmentConfig)
  };
});
