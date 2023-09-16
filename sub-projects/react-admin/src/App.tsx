import { ReactNode, useCallback } from 'react'
import { AliveScope } from 'react-activation'
import SetMainStateContext from '@/hooks/context/setGlobalState'
import { ConfigProvider } from "antd";

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

type AppProps = {
  children: ReactNode;
  setGlobalState?: (args: { type: string; value: any }) => void;
}

function App(props: AppProps) {
  const setGlobalState = useCallback((arg: { type: string; value: any} ) => {
    props.setGlobalState && props.setGlobalState(arg)
  }, [])

  return (
    <div className="react-app">
      <ConfigProvider theme={theme} locale={zhCN}>
        <SetMainStateContext.Provider value={{ setGlobalState }}>
          <AliveScope>
            { props.children }
          </AliveScope>
        </SetMainStateContext.Provider>
      </ConfigProvider>
    </div>
  )
}

export default App
