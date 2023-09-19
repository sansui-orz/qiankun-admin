import store, { StoreStateType } from "@/store";
import { MenuItem } from "@/types/api";

export default function connect(
  listenStates: string[]
) {
  const watchMap = new Map();
  let beforeState: StoreStateType | null = null;
  const changeQueue = new Set<keyof StoreStateType>([]);
  store.subscribe(() => {
    const state = store.getState();
    if (!beforeState) {
    } else if (beforeState) {
      let key: keyof StoreStateType;
      for (key in state) {
        if (beforeState[key] !== state[key]) {
          changeQueue.add(key);
        }
      }
    }
    beforeState = state;
    // 使用微任务同步子应用，避免频繁的变更
    changeQueue.size > 0 &&
      Promise.resolve().then(() => {
        const newState: Partial<StoreStateType> = {};
        let changed = false;
        const arr = [...changeQueue.values()];
        for (let i = 0; i < arr.length; i++) {
          if (listenStates.includes(arr[i])) {
            // @ts-ignore
            newState[arr[i]] = state[arr[i]];
            changed = true;
          }
        }
        if (changed) {
          // 数据有变化则调用子应用的监听函数进行处理
          for (let onChanged of watchMap.values()) {
            onChanged && onChanged(newState);
          }
        }
        changeQueue.clear();
      });
  });

  return {
    connectReactStore(key: string, reactStore: any) {
      function update(newState: Partial<StoreStateType>) {
        let key: keyof StoreStateType;
        for (key in newState) {
          reactStore.dispatch({
            type: `set${key[0].toUpperCase() + key.slice(1)}State`,
            value: newState[key],
          });
        }
      }
      // 关联时，先同步一次状态
      update(store.getState());

      // reducer中需要定义一个action, type为set[StateName]State, 此action中用入参直接覆盖全部值
      watchMap.set(key, update);
      return {
        getMainState: () => {
          return store.getState();
        },
        dispatch: (arg: { type: string; value: any }) => {
          if (arg.type === "addTabs") {
            store.dispatch((dispatch, getState) => {
              const menus: MenuItem[] = getState().menusState.menus;
              return dispatch!({
                type: arg.type,
                value: { url: arg.value as string, menus },
              });
            });
          } else {
            store.dispatch(arg);
          }
        },
        unconnect: () => {
          watchMap.delete(key);
        },
      };
    },
    // Vue链接与React不一样，需要传入要共享的useStore的方法map
    connectVueStore(key: string, useStoreMap: {
      [key in keyof StoreStateType]: () => {
        setStoreState: (values: any) => void;
      };
    }) {
      function update(newState: Partial<StoreStateType>) {
        let key: keyof StoreStateType;
        for (key in newState) {
          const storeInstance = useStoreMap[key] && useStoreMap[key]()
          if (storeInstance) {
            storeInstance.setStoreState(newState[key])
          }
        }
      }
      // 关联时，先同步一次状态。Vue需要先等pinia挂载到应用实例后才能使用store，所以初始化做个异步
      Promise.resolve().then(() => {
        update(store.getState());
      })
      // 每个store中需要定义一个action, setStoreState, 此action中用入参直接覆盖全部值
      watchMap.set(key, update);
      return {
        getMainState: () => {
          return store.getState();
        },
        dispatch: (arg: { type: string; value: any }) => {
          if (arg.type === "addTabs") {
            store.dispatch((dispatch, getState) => {
              const menus: MenuItem[] = getState().menusState.menus;
              return dispatch!({
                type: arg.type,
                value: { url: arg.value as string, menus },
              });
            });
          } else {
            store.dispatch(arg);
          }
        },
        unconnect: () => {
          watchMap.delete(key);
        },
      };
    },
  };
}
