import React from "react";
import { Layout, Menu, Input, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function TaobaoAppBar() {
  return (
    <Header className="taobao-appbar">
      <div className="taobao-logo">
        <img
          src="https://gw.alicdn.com/imgextra/i3/O1CN01snQ5rT1MWHtQzI3bk_!!6000000001473-2-tps-160-60.png"
          alt="Taobao"
        />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        className="taobao-menu"
        items={[
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "首页",
          },
          {
            key: "categories",
            icon: <AppstoreOutlined />,
            label: "商品分类",
          },
          {
            key: "cart",
            icon: <ShoppingCartOutlined />,
            label: "购物车",
          },
          {
            key: "user",
            icon: <UserOutlined />,
            label: "个人中心",
          },
        ]}
      />
      <div className="taobao-search">
        <Input.Search
          placeholder="搜索商品/店铺"
          allowClear
          enterButton="搜索"
          size="large"
        />
      </div>
      <div className="taobao-action">
        <Button type="link" className="taobao-action-login">
          登录
        </Button>
        <Button type="primary" className="taobao-action-signup" style={{ background: "#ff5000", borderColor: "#ff5000" }}>
          免费注册
        </Button>
      </div>
      <style>{`
        .taobao-appbar {
          display: flex;
          align-items: center;
          background: #fff;
          box-shadow: 0 2px 8px #0001;
          height: 70px;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .taobao-logo img {
          height: 38px;
        }
        .taobao-menu {
          flex: 1 1 auto;
          border-bottom: none !important;
          background: transparent !important;
          margin-left: 32px;
        }
        .taobao-search {
          width: 320px;
          margin: 27px 28px 0 16px;
        }
        .taobao-action {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .taobao-action-login {
          font-size: 16px;
          padding: 0 8px;
          color: #595959;
        }
        .taobao-action-signup {
          font-size: 16px;
          border-radius: 4px;
          font-weight: 500;
          height: 40px;
        }
        @media (max-width: 900px) {
          .taobao-appbar {
            flex-direction: column;
            align-items: flex-start;
            height: auto;
            padding: 10px 10px 0 10px;
          }
          .taobao-logo { margin-bottom: 6px; }
          .taobao-search { width: 100%; margin: 12px 0; }
          .taobao-menu { margin-left: 0; width: 100%; }
          .taobao-action { margin-bottom: 8px; }
        }
        @media (max-width: 600px) {
          .taobao-appbar { padding: 4px; }
          .taobao-search { width: 100%; }
        }
      `}</style>
    </Header>
  );
}