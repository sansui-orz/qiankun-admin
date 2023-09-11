import React from "react";
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
      cardBg: '#ffffff',
      itemSelectedColor: '#ffffff',
      horizontalMargin: '0px'
    },
  },
  token: { colorPrimary: "#00b96b" },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
