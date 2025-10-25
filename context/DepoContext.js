// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

const SAMPLE_PRODUCTS = [
  { id: uuidv4(), sku: "P001", name: "Su (1L)", category: "İçecek", unit: "adet", qty: 100, cost: 0.5, expiry: "" },
  { id: uuidv4(), sku: "P002", name: "Ekmek", category: "Kuru Gıda", unit: "adet", qty: 200, cost: 0.3, expiry: "" },
  { id: uuidv4(), sku: "P003", name: "Bira", category: "Alkol", unit: "adet", qty: 80, cost: 1.8, expiry: "" },
  { id: uuidv4(), sku: "P004", name: "Dana Eti (kg)", category: "Et", unit: "kg", qty: 50, cost: 6.0, expiry: "" },
  { id: uuidv4(), sku: "P005", name: "Kahve", category: "İçecek", unit: "paket", qty: 60, cost: 2.5, expiry: "" },
  { id: uuidv4(), sku: "P006", name: "Pişirme Tereyağ", category: "Kuru Gıda", unit: "kg", qty: 30, cost: 4.0, expiry: "" },
  { id: uuidv4(), sku: "P007", name: "Kola", category: "İçecek", unit: "adet", qty: 150, cost: 0.9, expiry: "" },
  { id: uuidv4(), sku: "P008", name: "Peynir", category: "Kuru Gıda", unit: "kg", qty: 40, cost: 3.5, expiry: "" },
  { id: uuidv4(), sku: "P009", name: "Vodka", category: "Alkol", unit: "adet", qty: 25, cost: 10.0, expiry: "" },
  { id: uuidv4(), sku: "P010", name: "Çay", category: "İçecek", unit: "paket", qty: 90, cost: 1.2, expiry: "" }
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]); // teslim/çıkış kayıtları

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_products");
      const h = localStorage.getItem("emsal_history");
      if (s) setProducts(JSON.parse(s)); else setProducts(SAMPLE_PRODUCTS);
      if (h) setHistory(JSON.parse(h));
    } catch {
      setProducts(SAMPLE_PRODUCTS);
    }
  }, []);

  useEffect(() => { localStorage.setItem("emsal_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("emsal_history", JSON.stringify(history)); }, [history]);

  const addProduct = (p) => {
    const newP = { ...p, id: uuidv4(), sku: p.sku || `SKU-${Date.now()}` };
    setProducts(prev => [newP, ...prev]);
    return newP;
  };

  const updateProduct = (id, data) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));

  const removeProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  // teslim alma: depo artışı
  const receiveProduct = ({ productId, qty, cost, expiry }) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, qty: (Number(p.qty) || 0) + Number(qty), cost: cost ?? p.cost, expiry: expiry || p.expiry } : p));
    setHistory(prev => [{ type: "receive", productId, qty: Number(qty), date: new Date().toISOString(), cost: Number(cost || 0) }, ...prev]);
  };

  // sevk: depo düşüşü
  const dispatchProduct = ({ productId, qty, restaurantId }) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, qty: Math.max(0, (Number(p.qty) || 0) - Number(qty)) } : p));
    setHistory(prev => [{ type: "dispatch", productId, qty: Number(qty), date: new Date().toISOString(), restaurantId }, ...prev]);
  };

  const getHistoryBetween = (from, to) => {
    const f = new Date(from).getTime();
    const t = new Date(to).getTime();
    return history.filter(h => {
      const d = new Date(h.date).getTime();
      return d >= f && d <= t;
    });
  };

  return (
    <DepoContext.Provider value={{
      products, addProduct, updateProduct, removeProduct,
      receiveProduct, dispatchProduct, history, getHistoryBetween
    }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
