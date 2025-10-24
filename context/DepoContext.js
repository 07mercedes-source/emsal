// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // küçük helper - eğer yoksa basit id fonksiyonu kullan

const DepoContext = createContext(null);

// örnek 10 ürün
const initialProducts = [
  { id: "P-001", name: "Bira 500ml", category: "İçecek", unit: "adet", qty: 120, cost: 1.5 },
  { id: "P-002", name: "Et - Dana 1kg", category: "Et", unit: "kg", qty: 20, cost: 8.0 },
  { id: "P-003", name: "Ekmek", category: "Kuru Gıda", unit: "adet", qty: 200, cost: 0.6 },
  { id: "P-004", name: "Zeytin", category: "Kuru Gıda", unit: "kg", qty: 30, cost: 3.0 },
  { id: "P-005", name: "Kola 330ml", category: "İçecek", unit: "adet", qty: 150, cost: 1.1 },
  { id: "P-006", name: "Votka 700ml", category: "Alkol", unit: "şişe", qty: 40, cost: 12.0 },
  { id: "P-007", name: "Pirinç 5kg", category: "Kuru Gıda", unit: "torba", qty: 25, cost: 10.0 },
  { id: "P-008", name: "Şarap 750ml", category: "Alkol", unit: "şişe", qty: 35, cost: 15.0 },
  { id: "P-009", name: "Süt 1L", category: "İçecek", unit: "adet", qty: 80, cost: 1.0 },
  { id: "P-010", name: "Tuz 1kg", category: "Kuru Gıda", unit: "adet", qty: 100, cost: 0.5 },
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("emsal_products");
      return raw ? JSON.parse(raw) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem("emsal_depo_history");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem("emsal_products", JSON.stringify(products)); } catch (e) {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem("emsal_depo_history", JSON.stringify(history)); } catch (e) {}
  }, [history]);

  function addProduct({ name, category, unit, qty, cost }) {
    // id otomatik
    const id = `P-${Math.floor(Math.random() * 9000) + 1000}`;
    const p = { id, name, category, unit, qty: Number(qty || 0), cost: Number(cost || 0) };
    setProducts((s) => [p, ...s]);
    return p;
  }

  function updateProduct(id, patch) {
    setProducts((s) => s.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removeProduct(id) {
    setProducts((s) => s.filter((p) => p.id !== id));
    setHistory((h) => [...h, { type: "delete", id, date: new Date().toISOString() }]);
  }

  function receiveProduct({ id, qty, cost, expiry }) {
    // stok artar (teslim alma)
    setProducts((s) => s.map((p) => (p.id === id ? { ...p, qty: Number(p.qty) + Number(qty), cost: Number(cost || p.cost) } : p)));
    setHistory((h) => [...h, { type: "receive", id, qty: Number(qty), cost: Number(cost), expiry: expiry || null, date: new Date().toISOString() }]);
  }

  function shipProducts({ items, toRestaurant }) {
    // items = [{id, qty}, ...]
    setProducts((s) => {
      const map = new Map(s.map((p) => [p.id, { ...p }]));
      items.forEach(({ id, qty }) => {
        if (map.has(id)) {
          map.get(id).qty = Number(map.get(id).qty) - Number(qty);
        }
      });
      return Array.from(map.values());
    });
    setHistory((h) => [...h, { type: "ship", items, toRestaurant, date: new Date().toISOString() }]);
  }

  function getHistoryBetween(start, end) {
    const s = start ? new Date(start) : null;
    const e = end ? new Date(end) : null;
    return history.filter((h) => {
      const d = new Date(h.date);
      if (s && d < s) return false;
      if (e && d > e) return false;
      return true;
    });
  }

  return (
    <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct, receiveProduct, shipProducts, history, getHistoryBetween }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
