import React, { ReactNode, useState, useCallback } from "react";
import { Layout, theme, Button, Avatar, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { TOKEN_NAME } from "@/utils/createRequest";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import "./index.less";

const { Header: AntdHeader } = Layout;
interface HeaderProps {
  children: ReactNode;
}
function Header(props: HeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { avatar, username, account, language } = useSelector<
    RootState,
    RootState["userState"]
  >((state) => state.userState);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openStatusChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
    },
    [setOpen]
  );

  const signout = useCallback(() => {
    Cookie.remove(TOKEN_NAME);
    navigate("/login");
  }, [navigate]);
  const changeLanguage = useCallback(() => {
    dispatch({ type: 'changeLanguage', value: language === 'zh' ? 'en' : 'zh' })
    setTimeout(() => {
      // 多语言切换直接重渲染，因为涉及的地方会很多
      location.reload()
    })
  }, [language])
  return (
    <AntdHeader
      className="flex items-center pl-10 pr-20 header h-50"
      style={{ background: colorBgContainer }}
    >
      {props.children}
      <div className="flex items-center justify-end grow">
        <div className="language" onClick={changeLanguage}>
          <div className={`zh ${language === 'zh' ? 'active-languge' : ''}`}>中</div>
          <div className={`en ${language === 'en' ? 'active-languge' : ''}`}>en</div>
        </div>
        <Popover
          content={
            <>
              <div className="text-center text-gray-300 text-14">{account}</div>
              <Button className="w-full" danger type="text" onClick={signout}>
                {$t('signout')}
              </Button>
            </>
          }
          title={<div className="text-center">{username}</div>}
          open={open}
          trigger="click"
          onOpenChange={openStatusChange}
        >
          <div className="cursor-pointer">
            {avatar ? (
              <Avatar
                style={{ verticalAlign: "middle" }}
                size="large"
                src={avatar}
              />
            ) : (
              <Avatar
                style={{ verticalAlign: "middle", backgroundColor: "#f56a00" }}
                size="large"
              >
                {username}
              </Avatar>
            )}
          </div>
        </Popover>
      </div>
    </AntdHeader>
  );
}

export default React.memo(Header);
