import React from "react";
import {
  Drawer,
  List,
  Typography,
  Button,
  Row,
  Col,
  Empty,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  DeleteFilled,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function QtyInput({ value, min = 1, max = 99, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #d9d9d9",
        borderRadius: 6,
        overflow: "hidden",
        width: 90,
        background: "#fff",
        height: 28,
      }}
    >
      <Button
        type="text"
        icon={<MinusOutlined style={{ fontSize: 14 }} />}
        disabled={value <= min}
        size="small"
        onClick={() => onChange(Math.max(min, value - 1))}
        tabIndex={-1}
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      />
      <InputNumber
        min={min}
        max={max}
        value={value}
        controls={false}
        onChange={onChange}
        size="small"
        style={{
          border: "none",
          width: 34,
          textAlign: "center",
          fontSize: 15,
          background: "none",
          padding: 0,
          height: 28,
          lineHeight: "28px",
          verticalAlign: "middle",
        }}
        // 消除左右箭頭(Chrome/Safari)
        addonAfter={null}
      />
      <Button
        type="text"
        icon={<PlusOutlined style={{ fontSize: 14 }} />}
        disabled={value >= max}
        size="small"
        onClick={() => onChange(Math.min(max, value + 1))}
        tabIndex={-1}
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      />
    </div>
  );
}

function getItemAdditionalPrice(item) {
  if (!item.options || !item.selectedOptions) return 0;
  let sum = 0;
  item.options.forEach((opt) => {
    const selected = item.selectedOptions?.[opt.title];
    const found = opt.value.find((v) => v.item === selected);
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
  const safeQuantity = (q) => (typeof q === "number" && q > 0 ? q : 1);
  const getFinalUnitPrice = (item) =>
    (item.price || 0) + getItemAdditionalPrice(item);

  const total = items.reduce(
    (sum, i) => sum + getFinalUnitPrice(i) * safeQuantity(i.quantity),
    0
  );

  const width =
    typeof window !== "undefined" && window.innerWidth < 500 ? "100vw" : 390;
  const mainColor = "#1677ff";

  // Header 右上角 - 清空鈕
  const HeaderExtra = (
    <Button
      type="text"
      icon={<DeleteFilled />}
      size="small"
      style={{
        color: "#aaa",
        fontWeight: 400,
        fontSize: 15,
        marginRight: -8,
        background: "none",
      }}
      onClick={onClear}
      disabled={items.length === 0}
    >
      清空
    </Button>
  );

  return (
    <Drawer
      title={
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          <ShoppingCartOutlined
            style={{ fontSize: 22, color: mainColor, marginRight: 8 }}
          />
          購物車
        </span>
      }
      placement="right"
      open={open}
      onClose={onClose}
      width={width}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 0,
          background: "#fff",
        },
        footer: {
          padding: "16px 18px 20px 18px",
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
        },
      }}
      closeIcon={null}
      extra={HeaderExtra}
      footer={
        <Button
          type="primary"
          size="large"
          block
          disabled={items.length === 0}
          style={{
            background: mainColor,
            borderRadius: 24,
            fontWeight: 500,
            fontSize: 17,
            letterSpacing: 1,
            height: 48,
            boxShadow: "0 2px 8px #1677ff18",
          }}
        >
          {items.length > 0
            ? ` $${Number(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`
            : ""}
        </Button>
      }
    >
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 0 12px" }}>
        {items.length === 0 ? (
          <Empty
            description="購物車暫無商品"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ paddingTop: "60px" }}
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={items}
            renderItem={(item) => {
              const addPrice = getItemAdditionalPrice(item);
              const finalUnitPrice = getFinalUnitPrice(item);
              const quantity = safeQuantity(item.quantity);

              return (
                <List.Item
                  style={{
                    background: "#f8fafd",
                    borderRadius: 14,
                    marginBottom: 16,
                    padding: 0,
                    border: "1px solid #f1f3f7",
                  }}
                >
                  <Row align="top" gutter={12} style={{ padding: 14 }}>
                    <Col flex="0 0 56px">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: 7,
                          background: "#f5f5f5",
                          border: "1px solid #e6e6e6",
                          display: "block",
                        }}
                      />
                    </Col>
                    <Col flex="auto" style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: 12.5,
                          color: "#888",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: 2,
                        }}
                      >
                        {item.brand}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 15.5,
                          marginBottom: 4,
                          wordBreak: "break-all",
                          color: "#23272e",
                        }}
                      >
                        {item.name}
                      </div>
                      {item.selectedOptions &&
                        Object.keys(item.selectedOptions).length > 0 && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#7a869a",
                              marginBottom: 2,
                            }}
                          >
                            {Object.entries(item.selectedOptions).map(
                              ([key, value]) => {
                                let optionPrice = 0;
                                const opt = (item.options || []).find(
                                  (opt) => opt.title === key
                                );
                                if (opt) {
                                  const found = opt.value.find(
                                    (v) => v.item === value
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
                                          fontWeight: 500,
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginTop: 6,
                        }}
                      >
                        <QtyInput
                          value={quantity}
                          min={1}
                          max={99}
                          onChange={(val) => {
                            if (typeof val === "number" && val > 0) {
                              onUpdateQty(item.id, val);
                            }
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: mainColor,
                            marginLeft: 8,
                          }}
                        >
                          ${finalUnitPrice * quantity}
                        </Text>
                      </div>
                    </Col>
                    <Col
                      flex="0 0 auto"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        marginLeft: 8,
                      }}
                    >
                      <Button
                        shape="circle"
                        icon={<DeleteOutlined />}
                        danger
                        size="small"
                        type="text"
                        onClick={() => onRemove(item.id)}
                        style={{
                          fontSize: 16,
                          marginTop: 2,
                          color: "#aaa",
                          background: "none",
                        }}
                      />
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </Drawer>
  );
}
