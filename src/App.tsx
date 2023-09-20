import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.less";
import router from "./router/router";
import store from "@/store";

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

function App() {
  useEffect(() => {
    const loading = document.getElementById('app-loading')
    if (loading) document.body.removeChild(loading)
  }, [])
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
