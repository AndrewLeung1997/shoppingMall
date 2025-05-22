import { useState } from "react";

export default function useCart() {
  const [items, setItems] = useState([]);
  function addToCart(product, quantity) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
  }
  function removeFromCart(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  function updateQuantity(id, quantity) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
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