// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RestaurantContext = createContext(null);

const initial = {
  r1: [
    { id: uuidv4(), date: "2025-10-01", type: "gelir", description: "Günlük Ciro", amount: 20000 },
    { id: uuidv4(), date: "2025-10-01", type: "gider", description: "İçecek Gideri", amount: 100 },
  ],
  r2: [
    { id: uuidv4(), date: "2025-10-01", type: "gelir", description: "Günlük Ciro", amount: 8000 },
  ],
};

export function RestaurantProvider({ children }) {
  const [restaurant1, setRestaurant1] = useState([]);
  const [restaurant2, setRestaurant2] = useState([]);

  useEffect(() => {
    try {
      const r1 = localStorage.getItem("emsal_r1");
      const r2 = localStorage.getItem("emsal_r2");
      if (r1) setRestaurant1(JSON.parse(r1));
      else setRestaurant1(initial.r1);
      if (r2) setRestaurant2(JSON.parse(r2));
      else setRestaurant2(initial.r2);
    } catch (e) {
      setRestaurant1(initial.r1);
      setRestaurant2(initial.r2);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emsal_r1", JSON.stringify(restaurant1));
      localStorage.setItem("emsal_r2", JSON.stringify(restaurant2));
    } catch (e) {}
  }, [restaurant1, restaurant2]);

  const addEntry = (which, entry) => {
    const it = { id: uuidv4(), ...entry };
    if (which === 1) setRestaurant1((s) => [it, ...s]);
    else setRestaurant2((s) => [it, ...s]);
  };

  const getForMonth = (which, month, year) => {
    const arr = which === 1 ? restaurant1 : restaurant2;
    return arr.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === Number(month) && d.getFullYear() === Number(year);
    });
  };

  return <RestaurantContext.Provider value={{ restaurant1, restaurant2, addEntry, getForMonth }}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => useContext(RestaurantContext);
