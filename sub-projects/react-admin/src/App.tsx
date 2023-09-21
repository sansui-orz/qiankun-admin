import { ReactNode, useEffect } from "react";
import { AliveScope } from "react-activation";
import ConnectMainStore from "@/hooks/context/connectMainStore";
import { ConfigProvider } from "antd";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/store";
import dayjs from "dayjs";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

import "./App.less";

const theme = {
  components: {
    Tabs: {
      cardPaddingSM: "0 10px 0 4px",
      // cardBg: "#ffffff",
      itemSelectedColor: "#ffffff",
      horizontalMargin: "0px",
    },
    Button: {
      defaultBg: "#00b96b",
      colorPrimary: "#00b96b",
      ghostBg: "#00b96b",
    },
  },
  token: {
    colorPrimary: "#00b96b",
  },
};

export type AppProps = {
  children: ReactNode;
  dispatch?: (arg: { type: string; value: any }) => void;
  getMainState?: () => any;
};

function Inner(props: AppProps) {
  const { language } = useSelector<RootState, RootState["userState"]>(
    (state) => state.userState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dayjs.locale(language === "zh" ? "zh-cn" : "en"); // 'en'
  }, [language]);
  return (
    <ConnectMainStore.Provider
      value={{
        dispatch: props.dispatch || dispatch,
        getMainState: props.getMainState,
      }}
    >
      <ConfigProvider theme={theme} locale={language === "zh" ? zhCN : enUS}>
        {props.children}
      </ConfigProvider>
    </ConnectMainStore.Provider>
  );
}

function App(props: AppProps) {
  return (
    <div className="react-app">
      <Provider store={store}>
        <Inner dispatch={props.dispatch} getMainState={props.getMainState}>
          <AliveScope>
            {props.children}
          </AliveScope>
        </Inner>
      </Provider>
    </div>
  );
}

export default App;
