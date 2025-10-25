// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RestaurantContext = createContext(null);

const SAMPLE = {
  r1: [
    { id: uuidv4(), date: "2026-01-01", type: "income", description: "Günlük ciro", amount: 20000 },
    { id: uuidv4(), date: "2026-01-01", type: "expense", description: "İçecek gideri", amount: 100 }
  ],
  r2: []
};

export function RestaurantProvider({ children }) {
  const [restaurant1, setR1] = useState([]);
  const [restaurant2, setR2] = useState([]);

  useEffect(() => {
    const r1 = JSON.parse(localStorage.getItem("emsal_r1") || "null");
    const r2 = JSON.parse(localStorage.getItem("emsal_r2") || "null");
    setR1(r1 || SAMPLE.r1);
    setR2(r2 || SAMPLE.r2);
  }, []);

  useEffect(() => { localStorage.setItem("emsal_r1", JSON.stringify(restaurant1)); }, [restaurant1]);
  useEffect(() => { localStorage.setItem("emsal_r2", JSON.stringify(restaurant2)); }, [restaurant2]);

  const addRecord = (restaurantId, record) => {
    const rec = { ...record, id: uuidv4() };
    if (restaurantId === "1") setR1(prev => [rec, ...prev]);
    else setR2(prev => [rec, ...prev]);
  };

  const getByMonth = (restaurantId, month, year) => {
    const arr = (restaurantId === "1") ? restaurant1 : restaurant2;
    return arr.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() + 1 === Number(month) && d.getFullYear() === Number(year);
    });
  };

  const totalsByMonth = (restaurantId, month, year) => {
    const items = getByMonth(restaurantId, month, year);
    const income = items.filter(i => i.type === "income").reduce((s, it) => s + Number(it.amount || 0), 0);
    const expense = items.filter(i => i.type === "expense").reduce((s, it) => s + Number(it.amount || 0), 0);
    return { income, expense, net: income - expense };
  };

  return (
    <RestaurantContext.Provider value={{ restaurant1, restaurant2, addRecord, getByMonth, totalsByMonth }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurant = () => useContext(RestaurantContext);
