import React from "react";
import {
  Drawer,
  List,
  Typography,
  Space,
  InputNumber,
  Button,
  Divider,
  Row,
  Col,
} from "antd";

const { Text } = Typography;

export default function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onClear,
}) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Drawer
      title="購物車"
      placement="right"
      open={open}
      onClose={onClose}
      width={window.innerWidth < 500 ? "100vw" : 350}
      bodyStyle={{ padding: "0 8px", overflowX: "hidden" }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClear} style={{ marginRight: 8 }}>
            清空購物車
          </Button>
          <Button type="primary" disabled={items.length === 0}>
            結帳（暫未開放）
          </Button>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={items}
        locale={{ emptyText: "購物車暫無商品" }}
        renderItem={(item) => (
          <List.Item style={{ padding: "10px 0" }}>
            <Row style={{ width: "100%", paddingTop: "20px" }} align="middle" wrap={false}>
              <Col flex="0 0 48px">
                <img
                  src={item.images[0]}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "cover",
                    borderRadius: 4,
                    background: "#f5f5f5",
                  }}
                  alt={item.name}
                />
              </Col>
              <Col flex="auto" style={{ paddingLeft: 12 }}>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                    marginBottom: 4,
                    wordBreak: "break-all",
                  }}
                >
                  {item.name}
                </div>
                <Space size="small" align="center">
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    單價：${item.price}
                  </Text>
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(qty) => onUpdateQty(item.id, qty)}
                    size="small"
                    style={{ width: 48 }}
                  />
                </Space>
              </Col>
              <Col
                style={{
                  minWidth: 80,
                  textAlign: "right",
                  paddingLeft: 8,
                  paddingRight: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Text strong style={{ fontSize: 16 }}>
                    ${item.price * item.quantity}
                  </Text>
                  <Button
                    size="small"
                    type="link"
                    danger
                    onClick={() => onRemove(item.id)}
                    style={{
                      padding: 0,
                      fontSize: 15,
                      marginTop: 2,
                      lineHeight: 1,
                    }}
                  >
                    移除
                  </Button>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Divider />
      <div style={{ textAlign: "right" }}>
        <Text strong style={{ fontSize: 16 }}>
          總計：${total}
        </Text>
      </div>
    </Drawer>
  );
}