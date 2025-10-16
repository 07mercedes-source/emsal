// context/RestaurantContext.js
import React, { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();

const sampleR1 = [
  { id: 1, type: "gelir", amount: 12000, date: "2025-10-01", note: "Günlük ciro" },
  { id: 2, type: "gider", amount: 100, date: "2025-10-01", note: "İçecek" },
];
const sampleR2 = [
  { id: 1, type: "gelir", amount: 8000, date: "2025-10-02", note: "Günlük ciro" }
];

export function RestaurantProvider({ children }){
  const [restaurant1, setRestaurant1] = useState(sampleR1);
  const [restaurant2, setRestaurant2] = useState(sampleR2);

  function addTransaction(restaurantId, tx){
    const item = { id: Date.now(), ...tx };
    if (String(restaurantId) === "1") setRestaurant1(prev => [...prev, item]);
    else setRestaurant2(prev => [...prev, item]);
  }

  return <RestaurantContext.Provider value={{ restaurant1, restaurant2, setRestaurant1, setRestaurant2, addTransaction }}>
    {children}
  </RestaurantContext.Provider>;
}

export function useRestaurantData(){
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error("useRestaurantData must be used inside RestaurantProvider");
  return ctx;
}
