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

// Helper: 計算單一商品選項加價總和
function getItemAdditionalPrice(item) {
  if (!item.options || !item.selectedOptions) return 0;
  let sum = 0;
  item.options.forEach(opt => {
    const selected = item.selectedOptions?.[opt.title];
    const found = opt.value.find(v => v.item === selected);
    if (found && found.additionalPrice) sum += found.additionalPrice;
  });
  return sum;
}

export default function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onClear,
}) {
  // 確保 quantity 為正整數，否則當作 1
  const safeQuantity = q => (typeof q === "number" && q > 0 ? q : 1);

  const getFinalUnitPrice = item =>
    (item.price || 0) + getItemAdditionalPrice(item);

  // 計算總價時也確保 quantity 正確
  const total = items.reduce(
    (sum, i) => sum + getFinalUnitPrice(i) * safeQuantity(i.quantity),
    0
  );

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
        renderItem={item => {
          const addPrice = getItemAdditionalPrice(item);
          const finalUnitPrice = getFinalUnitPrice(item);
          const quantity = safeQuantity(item.quantity);

          return (
            <List.Item style={{ padding: "10px 0" }}>
              <Row
                style={{ width: "100%", paddingTop: "20px" }}
                align="middle"
                wrap={false}
              >
                <Col flex="0 0 48px">
                  <img
                    src={item.images?.[0]}
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
                      marginBottom: 2,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.name}
                  </div>
                  {/* 選項顯示區 */}
                  {item.selectedOptions &&
                    Object.keys(item.selectedOptions).length > 0 && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "#888",
                          marginBottom: 2,
                        }}
                      >
                        {Object.entries(item.selectedOptions).map(
                          ([key, value]) => {
                            let optionPrice = 0;
                            const opt = (item.options || []).find(
                              opt => opt.title === key
                            );
                            if (opt) {
                              const found = opt.value.find(
                                v => v.item === value
                              );
                              optionPrice =
                                found && found.additionalPrice
                                  ? found.additionalPrice
                                  : 0;
                            }
                            return (
                              <div key={key}>
                                {key}：{value}
                                {optionPrice > 0 && (
                                  <span
                                    style={{
                                      color: "#d4380d",
                                      marginLeft: 2,
                                    }}
                                  >
                                    (+${optionPrice})
                                  </span>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  <Space size="small" align="center">
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      單價：${finalUnitPrice}
                    </Text>
                    <InputNumber
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={qty => {
                        // 防呆！只接受正整數
                        if (typeof qty === "number" && qty > 0) {
                          onUpdateQty(item.id, qty);
                        } else if (qty === null || qty === undefined) {
                          // 清空時自動設回 1
                          onUpdateQty(item.id, 1);
                        }
                      }}
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
                      ${finalUnitPrice * quantity}
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
          );
        }}
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