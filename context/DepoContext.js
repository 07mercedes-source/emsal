// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

const SAMPLE = [
  { id: uuidv4(), category: "Kuru Gıda", name: "Un", unit: "25 kg", stock: 40, cost: 10 },
  { id: uuidv4(), category: "İçecek", name: "Su", unit: "1.5 lt", stock: 120, cost: 0.5 },
  { id: uuidv4(), category: "Et", name: "Kıyma", unit: "10 kg", stock: 15, cost: 50 },
  { id: uuidv4(), category: "Alkol", name: "Bira", unit: "0.5 lt", stock: 80, cost: 2 },
  { id: uuidv4(), category: "Kuru Gıda", name: "Şeker", unit: "5 kg", stock: 60, cost: 6 },
  { id: uuidv4(), category: "İçecek", name: "Kola", unit: "0.33 lt", stock: 200, cost: 1.2 },
  { id: uuidv4(), category: "Kuru Gıda", name: "Pirinç", unit: "1 kg", stock: 50, cost: 2 },
  { id: uuidv4(), category: "İçecek", name: "Meyve Suyu", unit: "1 lt", stock: 40, cost: 3 },
  { id: uuidv4(), category: "Et", name: "Tavuk", unit: "5 kg", stock: 12, cost: 20 },
  { id: uuidv4(), category: "Kuru Gıda", name: "Tuz", unit: "1 kg", stock: 90, cost: 0.8 }
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const s = localStorage.getItem("emsal_depo_products");
      return s ? JSON.parse(s) : SAMPLE;
    } catch (e) { return SAMPLE; }
  });

  useEffect(()=> { localStorage.setItem("emsal_depo_products", JSON.stringify(products)); }, [products]);

  const addProduct = (p) => {
    setProducts(prev => [...prev, { id: uuidv4(), ...p }]);
  };

  const updateProduct = (id, changes) => {
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...changes } : x));
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(x => x.id !== id));
  };

  const receiveProduct = ({ id, qty, cost }) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Number(p.stock)+Number(qty), cost: cost ?? p.cost } : p));
  };

  const shipProducts = (items /* [{id, qty}] */) => {
    setProducts(prev => prev.map(p => {
      const it = items.find(i => i.id === p.id);
      if (!it) return p;
      return { ...p, stock: Math.max(0, Number(p.stock) - Number(it.qty)) };
    }));
  };

  return <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct, receiveProduct, shipProducts }}>{children}</DepoContext.Provider>;
}

export const useDepo = () => useContext(DepoContext);
