import React from "react";
import { Card } from "antd";

// Dummy data (replace img src with your own!)
const products = [
  {
    id: 1,
    image:
      "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1671010804.13424969.png?thumb=1&w=600&f=webp&q=85",
    title: "小米 空氣淨化器 4 Pro",
    subtitle: "618抢先购 官方立减15%",
    price: "1288",
    sold: "500+人购买",
    highlights: [
      { text: "天猫", color: "red" },
      { text: "", color: "black" },
    ],
  },
  {
    id: 2,
    image:
      "https://i02.appmifile.com/361_item_hk/21/02/2025/c256f7619723ee001f97c95f022f5ed8.png?thumb=1&w=1000&f=webp&q=85",
    title: "浪漫繁星S999足银莫桑钻项链",
    subtitle: "618抢先购 热销爆款",
    price: "218.96",
    sold: "200+人购买",
    highlights: [],
  },
  {
    id: 3,
    image:
      "https://i02.appmifile.com/662_item_hk/13/09/2024/ca53caff87bb7d1449a5ecd3676dbca2.png?thumb=1&w=320&f=webp&q=85",
    title: "520礼物 999足银手链女生",
    subtitle: "618抢先购 热销爆款",
    price: "153.36",
    sold: "100+人购买",
    highlights: [],
  },
  {
    id: 4,
    image:
      "https://i02.appmifile.com/865_item_hk/18/10/2024/81b9633ef09d5f1db77e141f27d34ae1.png?thumb=1&w=320&f=webp&q=85",
    title: "天猫 黑色皮裤女秋冬季高腰",
    subtitle: "官方立减15% 退货宝 包邮",
    price: "82",
    sold: "200+人购买",
    highlights: [
      { text: "天猫", color: "red" },
      { text: "黑色皮裤女秋冬季高腰", color: "black" },
    ],
  },
  {
    id: 5,
    image:
      "https://img.alicdn.com/imgextra/i4/2200716938982/O1CN01P5eN8F1vAB2zAoyzh_!!2200716938982.jpg",
    title: "储物香港单人可折叠客厅沙发",
    subtitle: "满1000减50 包邮",
    price: "749",
    sold: "100+人购买",
    highlights: [],
  },
];

const ProductCard = ({ product }) => (
  <Card
    className="tb-card"
    bordered={false}
    bodyStyle={{ padding: "12px 10px 10px 10px" }}
    hoverable
    cover={
      <div className="tb-card-imgbox">
        <img className="tb-card-img" src={product.image} alt={product.title} />
      </div>
    }
  >
    <div className="tb-card-title">
      {product.highlights && product.highlights.length > 0 && (
        <>
          {product.highlights.map((h, idx) => (
            <span
              key={idx}
              style={{
                color: h.color === "red" ? "#ff0036" : "#222",
                fontWeight: h.color === "red" ? 600 : 400,
                marginRight: 2,
              }}
            >
              {h.text}
            </span>
          ))}
        </>
      )}
      {product.title}
    </div>
    <div className="tb-card-subtitle">
      <span style={{ color: "#ff0036", fontWeight: 500 }}>{product.subtitle.split(" ")[0]}</span>
      <span style={{ color: "#ff9a00", fontWeight: 500, marginLeft: 6 }}>{product.subtitle.split(" ")[1] || ""}</span>
      <span style={{ color: "#999", fontWeight: 400, marginLeft: 6 }}>{product.subtitle.split(" ")[2] || ""}</span>
    </div>
    <div className="tb-card-bottom">
      <span className="tb-card-price">
        ￥<b>{product.price}</b>
      </span>
      <span className="tb-card-sold">{product.sold}</span>
    </div>
  </Card>
);

export default function TaobaoCardGrid() {
  return (
    <div className="tb-card-list">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      <style>{`
        .tb-card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          padding: 18px 10px;
          background: #fafafa;
        }
        .tb-card {
          border-radius: 22px !important;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px #0001;
          min-width: 0;
        }
        .tb-card-imgbox {
          aspect-ratio: 1/1;
          width: 100%;
          background: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .tb-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 18px;
          transition: transform 0.18s;
        }
        .tb-card:hover .tb-card-img {
          transform: scale(1.03);
        }
        .tb-card-title {
          font-size: 18px;
          font-weight: 500;
          color: #222;
          margin: 8px 0 2px 0;
          line-height: 1.25;
          min-height: 2.5em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tb-card-subtitle {
          font-size: 15px;
          margin-bottom: 4px;
        }
        .tb-card-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .tb-card-price {
          color: #ff0036;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.5px;
        }
        .tb-card-price b {
          font-size: 25px;
          font-weight: 800;
        }
        .tb-card-sold {
          font-size: 15px;
          color: #999;
        }
        @media (max-width: 600px) {
          .tb-card-list {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 8px;
          }
          .tb-card-title { font-size: 15px; }
          .tb-card-price { font-size: 18px; }
        }
      `}</style>
    </div>
  );
}