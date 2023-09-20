import React, { useCallback, useMemo } from "react";
import { Card, Tabs } from "antd";
import type { TabsProps } from "antd";
import Login, { LoginSubmitType } from "./components/login";
import Signup, { SignupSubmitType } from "./components/signup";
import banner1 from "@/assets/images/banner/banner1.png";
import banner2 from "@/assets/images/banner/banner2.png";
import banner3 from "@/assets/images/banner/banner3.png";
import banner4 from "@/assets/images/banner/banner4.png";
import banner5 from "@/assets/images/banner/banner5.png";
import banner6 from "@/assets/images/banner/banner6.png";
import banner7 from "@/assets/images/banner/banner7.png";
import logo from '@/assets/images/logo.png';
import "./index.less";

const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];
const day = Math.floor(Math.random() * banners.length) // new Date().getDay()
export default function LoginSignup() {
  const onLoginSubmit = useCallback<LoginSubmitType>(() => {}, []);
  const onSignupSubmit = useCallback<SignupSubmitType>(() => {}, []);
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "login",
        label: "登录",
        children: <Login onSubmit={onLoginSubmit} />,
      },
      {
        key: "signup",
        label: "注册",
        children: <Signup onSubmit={onSignupSubmit} />,
      },
    ],
    []
  );
  return (
    <div
      className="flex items-center justify-center w-full h-full login-page"
      style={{ background: "" }}
    >
      <Card
        hoverable
        style={{ width: 600 }}
        cover={
          <div
            className="relative w-full bg-center bg-no-repeat bg-cover h-200"
            style={{
              backgroundImage: `url(${banners[day]})`,
              borderRadius: "8px 8px 0 0",
            }}
          >
            <div className="blur"></div>
            <img className="login-logo" src={logo} />
          </div>
        }
      >
        <Tabs defaultActiveKey="login" items={items} />
      </Card>
    </div>
  );
}
