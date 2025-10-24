// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const DepoContext = createContext(null);

const sampleProducts = [
  { id: 1, name: "Un 25kg", unit: "kg", stock: 50, cost: 10.5, expiry: "2026-01-01" },
  { id: 2, name: "Şeker 10kg", unit: "kg", stock: 30, cost: 8.2, expiry: "2026-02-10" },
  { id: 3, name: "Su 1L", unit: "adet", stock: 200, cost: 0.5, expiry: "2027-05-01" },
  { id: 4, name: "Peynir 2kg", unit: "adet", stock: 20, cost: 12.0, expiry: "2025-12-01" },
  { id: 5, name: "Ekmek", unit: "adet", stock: 150, cost: 0.9, expiry: "2025-10-31" },
  { id: 6, name: "Yumurta 30'lu", unit: "adet", stock: 60, cost: 3.5, expiry: "2025-11-20" },
  { id: 7, name: "Süt 1L", unit: "adet", stock: 80, cost: 1.2, expiry: "2025-12-10" },
  { id: 8, name: "Tuz 1kg", unit: "kg", stock: 40, cost: 0.7, expiry: "2028-01-01" },
  { id: 9, name: "Yağ 5L", unit: "L", stock: 25, cost: 15.0, expiry: "2026-06-01" },
  { id: 10, name: "Çay 1kg", unit: "kg", stock: 12, cost: 6.5, expiry: "2027-09-01" },
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_products");
      if (s) setProducts(JSON.parse(s));
      else setProducts(sampleProducts);
    } catch (e) {
      setProducts(sampleProducts);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("emsal_products", JSON.stringify(products)); } catch (e) {}
  }, [products]);

  const addProduct = (p) => {
    const id = products.length ? Math.max(...products.map((x) => x.id)) + 1 : 1;
    const np = { ...p, id };
    setProducts((s) => [...s, np]);
  };

  const updateProduct = (id, updates) => {
    setProducts((s) => s.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const removeProduct = (id) => setProducts((s) => s.filter((p) => p.id !== id));

  return (
    <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
