import React, { useState, useEffect } from "react";
import {
  Modal, Row, Col, Typography, Divider, Carousel, Space,
  InputNumber, Button, Tabs, Rate, List, Table
} from "antd";

const { Title, Text } = Typography;

function ProductOptions({ options, selected, onChange }) {
  if (!options) return null;
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {options.map(opt => (
        <div key={opt.title}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>{opt.title}：</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              rowGap: 8, // 可選，讓上下間距更美觀
            }}
          >
            {opt.value.map(v => (
              <Button
                key={v.item}
                type={selected[opt.title] === v.item ? "primary" : "default"}
                disabled={!v.available}
                onClick={() => onChange(opt.title, v.item)}
                style={{ marginBottom: 4 }}
              >
                {v.item}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </Space>
  );
}

// 子元件：價格、數量、購物車
function BuyBar({ product, quantity, setQuantity, onAddToCart, selectedOptions }) {
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {product.oldPrice && (
          <Text delete type="secondary" style={{ fontSize: 18, marginRight: 10 }}>
            HKD${product.oldPrice}
          </Text>
        )}
        <Title level={3} style={{ color: "#d4380d", margin: 0 }}>
          HKD${product.price}
        </Title>
        {!!product.discount && (
          <span style={{
            background: "#ff4d4f", color: "#fff", borderRadius: 6,
            padding: "2px 10px", marginLeft: 12, fontWeight: 600, fontSize: 14,
          }}>
            {product.discount}
          </span>
        )}
      </div>
      <Text type="secondary" style={{ fontSize: 13 }}>
        已售：{product.sold}
      </Text>
      <div style={{
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 8,
      }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>數量：</span>
        <InputNumber
          min={1} max={99} value={quantity} onChange={setQuantity}
          style={{ width: 70 }} size="middle"
        />
        <Button
          type="primary" size="large"
          style={{
            marginLeft: 8, minWidth: 140, fontWeight: 600,
            letterSpacing: 2, boxShadow: "0 2px 8px #ffccc7",
          }}
          onClick={() => onAddToCart(product, quantity, selectedOptions)}
        >
          加入購物車
        </Button>
      </div>
    </Space>
  );
}

// 子元件：產品資訊表
function InfoTable({ info }) {
  if (!info || info.length === 0) return <Text type="secondary">無資料</Text>;
  return (
    <Table
      dataSource={info}
      columns={[
        { title: "項目", dataIndex: "title", key: "title", width: "40%",
          render: text => <Text type="secondary">{text}</Text> },
        { title: "內容", dataIndex: "value", key: "value",
          render: text => <Text>{text}</Text> },
      ]}
      size="small"
      pagination={false}
      bordered
      rowKey={(record, idx) => idx}
    />
  );
}

// 子元件：評論
function Reviews({ reviews }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews || []}
      locale={{ emptyText: "暫無評論" }}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<span>{item.user}<Rate disabled value={item.rating} style={{ fontSize: 14, marginLeft: 8 }} /></span>}
            description={item.comment}
          />
        </List.Item>
      )}
    />
  );
}

// 子元件：評分
function RatingBar({ value, count }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>
        <Rate allowHalf disabled value={value} style={{ fontSize: 28, color: "#faad14" }} /> {value} / 5
      </div>
      <Text type="secondary">（根據 {count} 則評論）</Text>
    </div>
  );
}

// 主元件
export default function ProductModal({
  visible, product, onAddToCart, onCancel
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setQuantity(1);
    if (product && product.options) {
      const initial = {};
      product.options.forEach(opt => {
        const firstAvailable = opt.value.find(v => v.available);
        initial[opt.title] = firstAvailable ? firstAvailable.item : "";
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  if (!product) return null;

  // Tabs 配置
  const tabItems = [
    {
      key: "buy",
      label: "購買",
      children: (
        <Space direction="vertical" size={20} style={{ width: "100%", marginTop: 24 }}>
          <ProductOptions
            options={product.options}
            selected={selectedOptions}
            onChange={(title, item) =>
              setSelectedOptions(prev => ({ ...prev, [title]: item }))
            }
          />
          <BuyBar
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={(...args) => {
              onAddToCart(...args);
              onCancel();
            }}
            selectedOptions={selectedOptions}
          />
        </Space>
      ),
    },
    {
      key: "description",
      label: "產品描述",
      children: (
        <Text>
          {product.description || "暫無描述"}
        </Text>
      ),
    },
    {
      key: "info",
      label: "基本資訊",
      children: (
        <>
          <Title level={5}>產品規格</Title>
          <Divider style={{ margin: "8px 0" }} />
          <InfoTable info={product.productInfo} />
        </>
      ),
    },
    {
      key: "shipping",
      label: "送貨",
      children: (
        <>
          <Title level={5}>送貨方式</Title>
          <Divider style={{ margin: "8px 0" }} />
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>宅配（1-2 天內出貨）</li>
            <li>超商取貨（2-3 天）</li>
            <li>滿 $1000 免運費</li>
          </ul>
        </>
      ),
    },
    {
      key: "reviews",
      label: "評論",
      children: (
        <>
          <Title level={5}>用戶評論</Title>
          <Divider style={{ margin: "8px 0" }} />
          <Reviews reviews={product.reviews || []} />
        </>
      ),
    },
    {
      key: "rating",
      label: "評分",
      children: (
        <>
          <Title level={5}>整體評分</Title>
          <Divider style={{ margin: "8px 0" }} />
          <RatingBar value={product.rating || 4.5} count={product.reviews?.length || 0} />
        </>
      ),
    },
  ];

  return (
    <Modal
      open={visible}
      title={product.name}
      onCancel={onCancel}
      width={900}
      footer={[]}
      styles={{ body: { padding: 24 } }}
    >
      <Row gutter={32}>
        <Col xs={24} md={10}>
          <Carousel>
            {(product.images || []).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  borderRadius: 8,
                  background: "#f8f8f8",
                }}
              />
            ))}
          </Carousel>
        </Col>

        <Col xs={24} md={14}>
          <Tabs defaultActiveKey="buy" items={tabItems} />
        </Col>
      </Row>
    </Modal>
  );
}