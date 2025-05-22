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
    id: 20392,
    name: "小米 14 Ultra 智能手機",
    images: [
      "https://i02.appmifile.com/390_item_hk/27/02/2024/5ae17de595076ed89610f335f2bb3f2d.png?thumb=1&w=1000&f=webp&q=85",
      "https://dummyimage.com/300x300/cccccc/333&text=iPhone+15+側面",
    ],
    price: 9999,
    sold: 1200,
    type: "熱賣",
    category: "手機通訊",
    productInfo: [
      { title: "尺寸", value: "152.8 x 71.5 x 8.6 mm" },
      { title: "顏色", value: "鈦金屬" },
      { title: "儲存容量", value: "256GB" },
      { title: "相機", value: "5000萬像素" },
      { title: "電池", value: "5000mAh" },
      { title: "處理器", value: "Snapdragon 8 Gen 3" },
      { title: "RAM", value: "16GB" },
      { title: "顯示器", value: "6.73吋 AMOLED" },
      { title: "網絡", value: "5G" },
      { title: "操作系統", value: "MIUI 15" },
      { title: "防水等級", value: "IP68" },
      { title: "重量", value: "226克" },
      { title: "材質", value: "玻璃、金屬" },
    ],
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
  {
    id: 20230,
    name: "MacBook Pro 16 inch 2024",
    images: [
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mbp16-2024.png",
      "https://dummyimage.com/300x300/cccccc/333&text=iPhone+15+側面",
    ],
    price: 9999,
    sold: 1200,
    type: "熱賣",
    category: "手機通訊",
    productInfo: [
      { title: "尺寸", value: "355.7 x 248.1 x 16.2 mm" },
      { title: "顏色", value: "太空灰" },
      { title: "儲存容量", value: "最高8TB" },
      { title: "相機", value: "5000萬像素" },
      { title: "電池", value: "5000mAh" },
      { title: "處理器", value: "M3 Pro" },
      { title: "RAM", value: "16GB" },
      { title: "顯示器", value: "16.2吋 Liquid Retina XDR" },
      { title: "網絡", value: "Wi-Fi 6E" },
      { title: "操作系統", value: "macOS Sonoma" },
      { title: "防水等級", value: "IP68" },
      { title: "重量", value: "2.2公斤" },
      { title: "材質", value: "鋁合金" },
     
    ],
    options: [
      {
        title: "機身顏色",
        value: [
          { item: "太空灰", available: true },
          { item: "銀色", available: true },
          
        ],
      },
      {
        title: "儲存容量",
        value: [
          { item: "256GB", available: true, additionalPrice: 0 },
          { item: "512GB", available: true, additionalPrice: 2000 },
          { item: "1TB", available: true, additionalPrice: 4000 },
          { item: "2TB", available: true, additionalPrice: 8000 },
          { item: "4TB", available: true, additionalPrice: 16000 },
          { item: "8TB", available: true, additionalPrice: 32000 },
          
        ],
      },
      {
        title: "RAM",
        value: [
          { item: "16GB", available: true, additionalPrice: 0 },
          { item: "32GB", available: true, additionalPrice: 2000 },
          { item: "64GB", available: true, additionalPrice: 4000 },
          
        ],
      },
      {
        title: "顯示器",
        value: [
          { item: "16.2吋 Liquid Retina XDR", available: true, additionalPrice: 0 },
          { item: "16.2吋 Liquid Retina XDR with ProMotion", available: true, additionalPrice: 2000 },
        ],
      },
      {
        title: "處理器",
        value: [
          { item: "M3 Pro", available: true, additionalPrice: 0 },
          { item: "M3 Max", available: true, additionalPrice: 2000 },
          
        ],
      },
    ],
  },
];
