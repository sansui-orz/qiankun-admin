import { createBrowserRouter, } from "react-router-dom";

import NotFound from '@/pages/notfound';
import Databoard from "@/pages/databoard";
import DataboardDetail from '@/pages/databoard/detail';
import DataTable from '@/pages/datatable';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Databoard />,
    errorElement: <NotFound />
  },
  {
    path: '/detail',
    element: <DataboardDetail />
  },
  {
    path: '/data-table',
    element: <DataTable />
  }
]);

export default router
