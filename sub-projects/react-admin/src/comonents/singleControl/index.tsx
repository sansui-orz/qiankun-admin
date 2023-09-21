/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FloatButton, Drawer, Button, Tree, TreeProps } from 'antd'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import Cookie from 'js-cookie'
import request from 'main_for_react/request';
import { useNavigate } from 'react-router-dom'

const menus = [
  {
    title: '数据看板',
    key: 0,
    url: '/'
  },
  {
    title: '数据详情',
    key: 1,
    url: '/detail'
  },
  {
    title: '数据表格',
    key: 2,
    url: '/data-table'
  },
  {
    title: 'store操作示例',
    key: 3,
    url: '/store-action-example'
  }
]

export default function SingleControl() {
  const user = useSelector<RootState, RootState['userState']>((state) => state.userState)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    request.get('/config').then((res: { data: { userInfo: RootState['userState'] } }) => {
      const userInfo = res.data.userInfo
      dispatch({ type: 'setUserStateState', value: userInfo })
    })
  }, [])

  const onShow = useCallback(() => {
    setShow((show) => !show)
  }, [])
  const signout = useCallback(() => {
    Cookie.remove('TOKEN')
    location.href = qiankunMainAppHost + '/login?back=' + encodeURIComponent(location.origin) + '&withToken=true'
  }, [])
  const onSelect = useCallback<Exclude<TreeProps['onSelect'], undefined>>((i) => {
    // @ts-ignore
    navigate(menus[i].url)
  }, [navigate])
  return (
    <div id="single-control">
      <FloatButton onClick={onShow}/>
      <Drawer title="子应用菜单功能" width={300} open={show} onClose={() => setShow(false)}>
        <div className="mb-10 border-b-2">登录信息</div>
        <div className="flex items-center justify-between mb-20">
          <div className="text-16">{ user.username }</div>
          <Button danger size="small" onClick={signout}>退出登录</Button>
        </div>
        <div className="mb-10 border-b-2">菜单切换</div>
        <Tree treeData={menus} onSelect={onSelect}>
        </Tree>
      </Drawer>
    </div>
  )
}