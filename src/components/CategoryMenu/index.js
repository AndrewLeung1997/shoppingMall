import React from "react";
import { Menu } from "antd";

export default function CategoryMenu({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <Menu
      mode="inline"
      selectedKeys={selectedCategory ? [selectedCategory] : []}
      onClick={({ key }) => onSelect(key === "全部" ? null : key)}
      style={{ border: "none" }}
    >
      <Menu.Item key="全部">全部</Menu.Item>
      {categories.map((cat) => (
        <Menu.Item key={cat}>{cat}</Menu.Item>
      ))}
    </Menu>
  );
}