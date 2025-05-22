import { useState } from "react";

export default function useCart() {
  const [items, setItems] = useState([]);

  function addToCart(productWithOptions) {
    // 產生唯一 key：商品id-選項
    const key =
      productWithOptions.id +
      "-" +
      Object.entries(productWithOptions.selectedOptions || {})
        .map(([k, v]) => `${k}:${v}`)
        .join("|");

    // 檢查是否已有同商品同選項
    const existIdx = items.findIndex(item => item.id === key);

    if (existIdx !== -1) {
      // 已有同組合，數量累加
      setItems(prev =>
        prev.map((item, idx) =>
          idx === existIdx
            ? { ...item, quantity: item.quantity + productWithOptions.quantity }
            : item
        )
      );
    } else {
      // 沒有，當新項目加入
      setItems(prev => [
        ...prev,
        {
          ...productWithOptions,
          id: key,
        },
      ]);
    }
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function updateQuantity(id, qty) {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: typeof qty === "number" && qty > 0 ? qty : 1 }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}