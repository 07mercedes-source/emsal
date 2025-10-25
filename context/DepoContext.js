// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

const sampleProducts = [
  { id: uuidv4(), sku: "P-1001", name: "Su (1L)", category: "içecek", unit: "adet", stock: 120, cost: 0.5, sell: 1.2, expiry: "" },
  { id: uuidv4(), sku: "P-1002", name: "Ekmek", category: "kuru gıda", unit: "adet", stock: 60, cost: 0.4, sell: 0.9, expiry: "" },
  { id: uuidv4(), sku: "P-1003", name: "Şarap", category: "alkol", unit: "şişe", stock: 30, cost: 5, sell: 12, expiry: "" },
  { id: uuidv4(), sku: "P-1004", name: "Tavuk Eti (kg)", category: "et", unit: "kg", stock: 25, cost: 4, sell: 8, expiry: "" },
  { id: uuidv4(), sku: "P-1005", name: "Kola (0.5L)", category: "içecek", unit: "adet", stock: 200, cost: 0.6, sell: 1.5, expiry: "" },
  { id: uuidv4(), sku: "P-1006", name: "Pasta Malzemesi", category: "kuru gıda", unit: "kg", stock: 15, cost: 3.5, sell: 7, expiry: "" },
  { id: uuidv4(), sku: "P-1007", name: "Bira", category: "alkol", unit: "şişe", stock: 50, cost: 1.2, sell: 3, expiry: "" },
  { id: uuidv4(), sku: "P-1008", name: "Dana Eti (kg)", category: "et", unit: "kg", stock: 10, cost: 6, sell: 12, expiry: "" },
  { id: uuidv4(), sku: "P-1009", name: "Pirinç (kg)", category: "kuru gıda", unit: "kg", stock: 40, cost: 1.1, sell: 2.5, expiry: "" },
  { id: uuidv4(), sku: "P-1010", name: "Portakal Suyu", category: "içecek", unit: "adet", stock: 90, cost: 0.8, sell: 2, expiry: "" },
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("emsal_products");
      if (saved) setProducts(JSON.parse(saved));
      else setProducts(sampleProducts);
    } catch (e) {
      setProducts(sampleProducts);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emsal_products", JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  const addProduct = (p) => {
    const newP = { id: uuidv4(), sku: `P-${Math.floor(Math.random() * 9000) + 1000}`, ...p };
    setProducts((s) => [newP, ...s]);
    return newP;
  };

  const updateProduct = (id, data) => {
    setProducts((s) => s.map((it) => (it.id === id ? { ...it, ...data } : it)));
  };

  const removeProduct = (id) => setProducts((s) => s.filter((it) => it.id !== id));

  // Teslim alma (stok arttır)
  const receiveProduct = ({ id, qty }) => {
    setProducts((s) => s.map((it) => (it.id === id ? { ...it, stock: Number(it.stock) + Number(qty) } : it)));
  };

  // Sevk et (stok azalt)
  const shipProduct = ({ id, qty }) => {
    setProducts((s) => s.map((it) => (it.id === id ? { ...it, stock: Math.max(0, Number(it.stock) - Number(qty)) } : it)));
  };

  return (
    <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct, receiveProduct, shipProduct }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
