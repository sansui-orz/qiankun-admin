import React from 'react'
import { useLocation, Location } from 'react-router-dom';

export default function useRouteChange(callback: (location: Location) => void, deep: any[]) {
  let location = useLocation();
  React.useEffect(() => {
    callback(location)
  }, [location, ...deep]);
}