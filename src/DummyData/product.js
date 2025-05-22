export const categories = [
  "手機通訊",
  "家用電器",
  "服飾配件",
  "美妝護理",
  "電腦辦公",
  "運動戶外",
  "食品飲料",
];

export const allProducts = [
  {
    id: 1,
    name: "小米 14 Ultra 智能手機",
    images: [
      "https://i02.appmifile.com/390_item_hk/27/02/2024/5ae17de595076ed89610f335f2bb3f2d.png?thumb=1&w=1000&f=webp&q=85",
      "https://dummyimage.com/300x300/cccccc/333&text=iPhone+15+側面",
    ],
    price: 9999,
    sold: 1200,
    type: "熱賣",
    category: "手機通訊",
    info: { 尺寸: "6.7吋", 顏色: "黑色", 型號: "A3101" },
    options: [
      {
        title: "機身顏色",
        value: [
          { item: "黑色鈦金屬", available: true },
          { item: "白色鈦金屬", available: true },
          { item: "沙漠金鈦金屬", available: true },
          { item: "原色鈦金屬", available: true },
        ],
      },
      {
        title: "儲存容量",
        value: [
          { item: "128GB", available: true },
          { item: "256GB", available: true },
        ],
      },
    ],
  },
];
