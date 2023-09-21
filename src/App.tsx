import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.less";
import router from "./router/router";
import store, { RootState } from "@/store";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';


const theme = {
  components: {
    Tabs: {
      cardPaddingSM: "0 10px 0 4px",
      // cardBg: "#ffffff",
      itemSelectedColor: "#00b96b",
      horizontalMargin: "0px",
    },
    Button: {
      defaultBg: '#00b96b',
      colorPrimary: '#00b96b',
      ghostBg: '#00b96b'
    }
  },
  token: {
    colorPrimary: "#00b96b",
  },
};

function Innner() { // 因为要使用store, 所以再抽离出一层
  const { language } = useSelector<RootState, RootState["userState"]>((state) => state.userState);
  useEffect(() => {
    dayjs.locale(language === 'zh' ? 'zh-cn' : 'en');
  }, [language])

  return (
    <ConfigProvider theme={theme} locale={language === 'zh' ? zhCN : enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

function App() {
  useEffect(() => {
    const loading = document.getElementById('app-loading')
    if (loading) document.body.removeChild(loading)
  }, [])
  return (
    <Provider store={store}>
      <Innner />
    </Provider>
  );
}

export default App;
