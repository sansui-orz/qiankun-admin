import { createBrowserRouter, } from "react-router-dom";
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import NotFound from '@/pages/notfound';
import Databoard from '@/pages/databoard';
import DataboardDetail from '@/pages/databoard/detail';
import StoreActionExample from '@/pages/storeActionExample';
import DataTable from '@/pages/datatable';
import KeeperHoc from './keeperHoc'

const router = createBrowserRouter([
  {
    path: "/",
    element: KeeperHoc('/databoard', <Databoard />),
    errorElement: <NotFound />
  },
  {
    path: '/detail',
    element: KeeperHoc('/databoard/detail', <DataboardDetail />),
  },
  {
    path: '/data-table',
    element: KeeperHoc('/databoard/data-table', <DataTable />),
  },
  {
    path: '/store-action-example',
    element: KeeperHoc('/databoard/store-action-example', <StoreActionExample />),
  }
], {
  basename: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/databoard' : '/'
});

export default router
