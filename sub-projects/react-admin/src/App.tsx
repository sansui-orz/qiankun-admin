import { ReactNode } from 'react'
import { AliveScope } from 'react-activation'
import ConnectMainStore from '@/hooks/context/connectMainStore'
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "@/store";

import dayjs from 'dayjs';
// import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');// 'en'

import './App.less'

const theme = {
  components: {
    Tabs: {
      cardPaddingSM: "0 10px 0 4px",
      // cardBg: "#ffffff",
      itemSelectedColor: "#ffffff",
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

export type AppProps = {
  children: ReactNode;
  dispatch?: (arg: {type: string; value: any}) => void;
  getMainState?: () => any;
}

function App(props: AppProps) {
  return (
    <div className="react-app">
      <Provider store={store}>
        <ConfigProvider theme={theme} locale={zhCN}>
          <ConnectMainStore.Provider value={{ dispatch: props.dispatch, getMainState: props.getMainState }}>
            <AliveScope>
              { props.children }
            </AliveScope>
          </ConnectMainStore.Provider>
        </ConfigProvider>
      </Provider>
    </div>
  )
}

export default App
