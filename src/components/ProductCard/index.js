import React from "react";
import { Card, Typography, Tag, Button, Tooltip, Space } from "antd";
import {
  ShoppingCartOutlined,
  FireFilled,
  StarFilled,
  ClockCircleFilled,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const typeIcon = {
  熱賣: <FireFilled style={{ color: "red", marginRight: 4 }} />,
  人氣: <StarFilled style={{ color: "#faad14", marginRight: 4 }} />,
  最新: <ClockCircleFilled style={{ color: "#52c41a", marginRight: 4 }} />,
};


// Discount helper
function getDiscountPercent(price, originalPrice) {
  if (!originalPrice || price >= originalPrice) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export default function ProductCard({ product, onClick, onAddToCart }) {
  const hasDiscount =
    product.orignialPrice && product.price < product.orignialPrice;
  const discountPercent = getDiscountPercent(
    product.price,
    product.orignialPrice
  );

  return (
    <Card
      hoverable
      style={{
        width: 245,
        margin: 10,
        borderRadius: 10,
        boxShadow: "0 2px 12px #f0f1f5",
        transition: "box-shadow 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      styles={{ body: { padding: 14, paddingBottom: 8 } }}
      cover={
        <div
          style={{
            width: "100%",
            height: 180,
            background: "#f6f6f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => onClick(product)}
        >
          <img
            alt={product.name}
            src={product.images[0]}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: 10,
              transition: "transform 0.2s",
            }}
          />
        </div>
      }
      onClick={() => onClick(product)}
    >
      <div style={{ minHeight: 56 }}>
        <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 2 }}>
          {product.name}
        </Title>
        <div style={{ marginBottom: 4 }}>
          <Tag
            color={
              product.type === "熱賣"
                ? "red"
                : product.type === "人氣"
                  ? "gold"
                  : "green"
            }
            style={{ fontWeight: 600 }}
          >
            {typeIcon[product.type]}
            {product.type}
          </Tag>
        </div>
        <Space size="small" style={{ marginBottom: 2, flexWrap: "wrap"}}>
          <Tag>{product.sellingStatus === true ? "有存貨" : "已下架"}</Tag>
          <Tag color={product.productStatus === '接受預訂' ? '#dc5a19' : '#00806c'}>{product.productStatus}</Tag>
          
        </Space>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 8,
          justifyContent: "space-between",
          minHeight: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text type="danger" style={{ fontSize: 20, fontWeight: 700 }}>
            HK${product.price}
          </Text>
          {hasDiscount && (
            <Text
              delete
              type="secondary"
              style={{
                fontSize: 13,
                marginLeft: 8,
                color: "#bfbfbf",
              }}
            >
              HK${product.orignialPrice}
            </Text>
          )}
          {/* {hasDiscount && (
            <Tag
              color="red"
              style={{
                marginLeft: 8,
                fontWeight: 600,
                fontSize: 12,
                borderRadius: 4,
                height: 22,
                display: "flex",
                alignItems: "center",
                padding: "0 6px",
              }}
            >
              -{discountPercent}%
            </Tag>
          )} */}
        </div>
      </div>
    </Card>
  );
}
