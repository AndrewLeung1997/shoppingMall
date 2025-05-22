import React from "react";
import { Row } from "antd";
import ProductCard from "../ProductCard";

export default function ProductSection({ products, onProductClick }) {
  return (
    <Row wrap gutter={[8, 8]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </Row>
  );
}