// context/DepoContext.js
import React, { createContext, useContext, useState } from "react";

const DepoContext = createContext();

const initialProducts = [
  { id: 1, name: "Un 25kg", stock: 50, unit: "Çuval", cost: 300 },
  { id: 2, name: "Şeker 50kg", stock: 20, unit: "Çuval", cost: 400 },
  { id: 3, name: "Tereyağı 1kg", stock: 100, unit: "Kg", cost: 150 },
  { id: 4, name: "Peynir 1kg", stock: 80, unit: "Kg", cost: 200 },
  { id: 5, name: "Zeytinyağı 5lt", stock: 30, unit: "Bidon", cost: 500 },
  { id: 6, name: "Domates", stock: 200, unit: "Kg", cost: 20 },
  { id: 7, name: "Salatalık", stock: 150, unit: "Kg", cost: 15 },
  { id: 8, name: "Ekmek", stock: 300, unit: "Adet", cost: 5 },
  { id: 9, name: "Su 0.5lt", stock: 500, unit: "Adet", cost: 3 },
  { id: 10, name: "Kola 1lt", stock: 120, unit: "Adet", cost: 15 }
];

export const DepoProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [deliveries, setDeliveries] = useState([]); // {id, productId, qty, cost, expiry, date}
  const [shipments, setShipments] = useState([]);   // {id, productId, qty, toRestaurant, date}

  return (
    <DepoContext.Provider value={{ products, setProducts, deliveries, setDeliveries, shipments, setShipments }}>
      {children}
    </DepoContext.Provider>
  );
};

export const useDepo = () => useContext(DepoContext);
