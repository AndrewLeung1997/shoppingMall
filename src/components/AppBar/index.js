import React from "react";
import { Header } from "antd/es/layout/layout";
import { Row, Col, Input, Space, Button, Badge, Typography } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function AppBar({
  search,
  setSearch,
  cartCount,
  onCartClick,
}) {
  return (
    <Header
      style={{
        background: "#fff",
        boxShadow: "0 2px 8px #f0f1f2",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Row align="middle" justify="space-between">
        <Col>
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            我的商城
          </Title>
        </Col>
        <Col flex="auto" style={{ maxWidth: 480 }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜尋商品"
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col>
          <Space>
            <Button icon={<LoginOutlined />}>登入</Button>
            <Button icon={<UserOutlined />}>註冊</Button>
            <Badge count={cartCount}>
              <Button
                shape="circle"
                icon={<ShoppingCartOutlined />}
                onClick={onCartClick}
                type="primary"
              />
            </Badge>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}