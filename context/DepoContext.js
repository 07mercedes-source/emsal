// context/DepoContext.js
import { createContext, useContext, useEffect, useState } from "react";

const DepoContext = createContext(null);

export function DepoProvider({ children }) {
  const [products, setProducts] = useState([]);

  // localStorage key
  const KEY = "emsal_depo_products_v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProducts(JSON.parse(raw));
      else {
        // örnek başlangıç ürünleri (10 örnek isteğine göre)
        const demo = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Ürün ${i + 1}`,
          stock: (i + 1) * 5,
          unit: "adet",
          cost: ((i + 1) * 2).toFixed(2),
          expiry: "",
        }));
        setProducts(demo);
        localStorage.setItem(KEY, JSON.stringify(demo));
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(products)); } catch (e) {}
  }, [products]);

  const addProduct = (p) => {
    const newId = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
    const item = { id: newId, ...p };
    setProducts([item, ...products]);
    return item;
  };

  const updateProduct = (id, patch) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </DepoContext.Provider>
  );
}

export function useDepo() {
  const ctx = useContext(DepoContext);
  if (!ctx) return { products: [], addProduct: () => {}, updateProduct: () => {}, removeProduct: () => {} };
  return ctx;
}
