import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Divider,
  Carousel,
  Space,
  InputNumber,
  Button,
  Tabs,
  Rate,
  List,
} from "antd";

const { Title, Text } = Typography;

// 假評論資料
const dummyReviews = [
  {
    user: "小明",
    rating: 5,
    comment: "商品品質很好，出貨快！",
  },
  {
    user: "阿花",
    rating: 4,
    comment: "整體不錯，會再回購。",
  },
];

export default function ProductModal({
  visible,
  product,
  onAddToCart,
  onCancel,
}) {
  const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setQuantity(1);
    // 初始化選項：預設第一個 available 的 item
    if (product && product.options) {
      const initial = {};
      product.options.forEach((opt) => {
        const firstAvailable = opt.value.find((v) => v.available);
        initial[opt.title] = firstAvailable ? firstAvailable.item : "";
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  if (!product) return null;

  // 處理使用者點擊選項
  const handleOptionChange = (title, item) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: item }));
  };

  // 在購買tab內插入這段
  const renderOptions = () => (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {product.options &&
        product.options.map((opt) => (
          <div key={opt.title}>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>
              {opt.title}：
            </div>
            <Space>
              {opt.value.map((v) => (
                <Button
                  key={v.item}
                  type={
                    selectedOptions[opt.title] === v.item
                      ? "primary"
                      : "default"
                  }
                  disabled={!v.available}
                  onClick={() => handleOptionChange(opt.title, v.item)}
                >
                  {v.item}
                </Button>
              ))}
            </Space>
          </div>
        ))}
    </Space>
  );

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
            {product.images.map((img, idx) => (
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
          <Tabs
            defaultActiveKey="buy"
            items={[
              {
                key: "buy",
                label: "購買",
                children: (
                  <div>
                    <Space
                      direction="vertical"
                      size={20}
                      style={{ width: "100%", marginTop: 24 }}
                    >
                      {/* 商品選項 */}
                      {renderOptions()}
                      {/* 價格區 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {product.oldPrice && (
                          <Text
                            delete
                            type="secondary"
                            style={{ fontSize: 18, marginRight: 10 }}
                          >
                            HKD${product.oldPrice}
                          </Text>
                        )}
                        <Title
                          level={3}
                          style={{ color: "#d4380d", margin: 0 }}
                        >
                          HKD${product.price}
                        </Title>
                        {!!product.discount && (
                          <span
                            style={{
                              background: "#ff4d4f",
                              color: "#fff",
                              borderRadius: 6,
                              padding: "2px 10px",
                              marginLeft: 12,
                              fontWeight: 600,
                              fontSize: 14,
                            }}
                          >
                            {product.discount}
                          </span>
                        )}
                      </div>
                      {/* 銷量 */}
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        已售：{product.sold}
                      </Text>
                      {/* 數量與購物車 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          flexWrap: "wrap",
                          marginTop: 8,
                        }}
                      >
                        <span style={{ fontSize: 15, fontWeight: 500 }}>
                          數量：
                        </span>
                        <InputNumber
                          min={1}
                          max={99}
                          value={quantity}
                          onChange={setQuantity}
                          style={{ width: 70 }}
                          size="middle"
                        />
                        <Button
                          type="primary"
                          size="large"
                          style={{
                            marginLeft: 8,
                            minWidth: 140,
                            fontWeight: 600,
                            letterSpacing: 2,
                            boxShadow: "0 2px 8px #ffccc7",
                          }}
                          onClick={() => {
                            onAddToCart(product, quantity, selectedOptions);
                            onCancel();
                          }}
                        >
                          加入購物車
                        </Button>
                      </div>
                    </Space>
                  </div>
                ),
              },
              {
                key: "description",
                label: "產品描述",
                children: (
                  <div>
                    <Space
                      direction="vertical"
                      size={8}
                      style={{ width: "100%" }}
                    >
                      <Text>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </Text>
                    </Space>
                  </div>
                ),
              },
              {
                key: "info",
                label: "基本資訊",
                children: (
                  <div>
                    <Title level={5}>產品規格</Title>
                    <Divider style={{ margin: "8px 0" }} />
                    <Space
                      direction="vertical"
                      size={8}
                      style={{ width: "100%" }}
                    >
                      {Object.entries(product.info).map(([k, v]) => (
                        <div key={k}>
                          <Text type="secondary">{k}：</Text>
                          <Text>{v}</Text>
                        </div>
                      ))}
                    </Space>
                  </div>
                ),
              },
              {
                key: "shipping",
                label: "送貨",
                children: (
                  <div>
                    <Title level={5}>送貨方式</Title>
                    <Divider style={{ margin: "8px 0" }} />
                    <ul>
                      <li>宅配（1-2 天內出貨）</li>
                      <li>超商取貨（2-3 天）</li>
                      <li>滿 $1000 免運費</li>
                    </ul>
                  </div>
                ),
              },
              {
                key: "reviews",
                label: "評論",
                children: (
                  <div>
                    <Title level={5}>用戶評論</Title>
                    <Divider style={{ margin: "8px 0" }} />
                    <List
                      itemLayout="horizontal"
                      dataSource={dummyReviews}
                      locale={{ emptyText: "暫無評論" }}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <span>
                                {item.user}
                                <Rate
                                  disabled
                                  value={item.rating}
                                  style={{ fontSize: 14, marginLeft: 8 }}
                                />
                              </span>
                            }
                            description={item.comment}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ),
              },
              {
                key: "rating",
                label: "評分",
                children: (
                  <div>
                    <Title level={5}>整體評分</Title>
                    <Divider style={{ margin: "8px 0" }} />
                    <div style={{ fontSize: 20, fontWeight: 700 }}>
                      <Rate
                        allowHalf
                        disabled
                        value={4.5}
                        style={{ fontSize: 28, color: "#faad14" }}
                      />{" "}
                      4.5 / 5
                    </div>
                    <Text type="secondary">（根據 2 則評論）</Text>
                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </Modal>
  );
}
