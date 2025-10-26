// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

const sampleProducts = [
  { id: uuidv4(), name: "Su Şişesi 1L", category: "İçecek", unit: "adet", qty: 120, cost: 0.5, price: 1.0, expiry: "" },
  { id: uuidv4(), name: "Kuru Bakliyat 1kg", category: "Kuru Gıda", unit: "kg", qty: 40, cost: 2.0, price: 3.5, expiry: "" },
  { id: uuidv4(), name: "Bira 330ml", category: "Alkol", unit: "adet", qty: 200, cost: 0.8, price: 2.5, expiry: "" },
  { id: uuidv4(), name: "Taze Et 1kg", category: "Et", unit: "kg", qty: 30, cost: 8.0, price: 12.0, expiry: "" },
  { id: uuidv4(), name: "Süt 1L", category: "İçecek", unit: "adet", qty: 60, cost: 0.9, price: 1.6, expiry: "" },
  { id: uuidv4(), name: "Peynir 500g", category: "Kuru Gıda", unit: "adet", qty: 50, cost: 3.0, price: 5.0, expiry: "" },
  { id: uuidv4(), name: "Kola 330ml", category: "İçecek", unit: "adet", qty: 180, cost: 0.6, price: 1.4, expiry: "" },
  { id: uuidv4(), name: "Çikolata", category: "Kuru Gıda", unit: "adet", qty: 120, cost: 0.4, price: 1.0, expiry: "" },
  { id: uuidv4(), name: "Jamon 200g", category: "Et", unit: "adet", qty: 20, cost: 4.0, price: 6.0, expiry: "" },
  { id: uuidv4(), name: "Viski 0.7L", category: "Alkol", unit: "şişe", qty: 15, cost: 20, price: 40, expiry: "" }
];

export function DepoProvider({ children }) {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(()=>{
    try{
      const s = localStorage.getItem("emsal_products");
      if(s) setProducts(JSON.parse(s));
    }catch(e){}
  },[]);

  useEffect(()=>{
    try{ localStorage.setItem("emsal_products", JSON.stringify(products)); }catch(e){}
  },[products]);

  const addProduct = (p) => {
    const item = { id: uuidv4(), ...p };
    setProducts(prev => [item, ...prev]);
    return item;
  };

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(x => x.id===id ? { ...x, ...data } : x));
  };

  const removeProduct = (id) => setProducts(prev => prev.filter(x => x.id!==id));

  const adjustStock = (id, delta) => {
    setProducts(prev => prev.map(x => x.id===id ? { ...x, qty: Number(x.qty) + Number(delta) } : x));
  };

  return <DepoContext.Provider value={{ products, addProduct, updateProduct, removeProduct, adjustStock }}>{children}</DepoContext.Provider>;
}

export const useDepo = () => useContext(DepoContext);
