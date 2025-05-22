import React, { useState } from "react";
import { Layout, Typography, Tabs } from "antd";
import AppBar from "../AppBar";
import CategoryMenu from "../CategoryMenu";
import ProductSection from "../ProductSection";
import ProductModal from "../ProductModal";
import CartDrawer from "../CartDrawer";
import { allProducts, categories } from "../../DummyData/product";
import useCart from "../../hooks/useCart";


const { Sider, Content } = Layout;
const { Title } = Typography;

const tabList = [
  { key: "熱賣", label: "熱賣" },
  { key: "人氣", label: "人氣" },
  { key: "最新", label: "最新" },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [modalProduct, setModalProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("熱賣");
  const cart = useCart();

  // 篩選商品
  function filterProducts(type) {
    let products = allProducts.filter((p) => p.type === type);
    if (selectedCategory)
      products = products.filter((p) => p.category === selectedCategory);
    if (search)
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    return products;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppBar
        search={search}
        setSearch={setSearch}
        cartCount={cart.items.length}
        onCartClick={() => setCartOpen(true)}
      />
      <Layout>
        <Sider
          width={180}
          style={{
            background: "#fafafa",
            borderRight: "1px solid #f0f0f0",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <CategoryMenu
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </Sider>
        <Content style={{ padding: 24, background: "#fff" }}>
          {/* 推薦牆，如要加可在此插入 <PromoWall /> */}
          {/* <PromoWall /> */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            size="large"
            tabBarGutter={32}
            items={tabList.map(tab => ({
              key: tab.key,
              label: tab.label,
              children: (
                <div style={{ marginTop: 24 }}>
                  <ProductSection
                    products={filterProducts(tab.key)}
                    onProductClick={setModalProduct}
                  />
                </div>
              ),
            }))}
          />
        </Content>
      </Layout>
      <ProductModal
        visible={!!modalProduct}
        product={modalProduct}
        onAddToCart={cart.addToCart}
        onCancel={() => setModalProduct(null)}
      />
      <CartDrawer
        open={cartOpen}
        items={cart.items}
        onClose={() => setCartOpen(false)}
        onRemove={cart.removeFromCart}
        onUpdateQty={cart.updateQuantity}
        onClear={cart.clearCart}
      />
    </Layout>
  );
}