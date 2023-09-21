import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import qiankunInit from "./qiankun";
import { axios, i18nInit } from "./utils";
import store from "@/store";
import { ConfigResponse } from "./types/api";
import languageEn from "@/utils/language-en.json";
import languageZh from "@/utils/language-zh.json";

i18nInit({
  en: languageEn,
  "zh-CN": languageZh,
});

function init() {
  ReactDOM.createRoot(document.querySelector("#app") as HTMLElement).render(
    <App></App>
  );
  qiankunInit();
}

if (location.pathname !== "/login") {
  axios
    .get<ConfigResponse>("/config")
    .then((res) => {
      store.dispatch({ type: "setUserInfo", value: res.data.userInfo });
      store.dispatch({ type: "setMenus", value: res.data.rules.menus });
      init();
    })
    .catch((err) => {});
} else {
  init();
}

export default {};
