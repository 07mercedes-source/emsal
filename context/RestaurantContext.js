// context/RestaurantContext.js
import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  // each restaurant has transactions { date, type: 'revenue'|'expense', amount, desc }
  const [restaurant1, setRestaurant1] = useState([
    { id: nanoid(), date: "2026-01-01", type: "revenue", amount: 20000, desc: "Günlük ciro" },
    { id: nanoid(), date: "2026-01-01", type: "expense", amount: 100, desc: "İçecek gideri" }
  ]);
  const [restaurant2, setRestaurant2] = useState([
    { id: nanoid(), date: "2026-01-02", type: "revenue", amount: 12000, desc: "Günlük ciro" }
  ]);

  const addEntry = (rid, entry) => {
    const e = { id: nanoid(), ...entry };
    if (rid === "1") setRestaurant1((s) => [e, ...s]);
    else setRestaurant2((s) => [e, ...s]);
  };

  const getEntries = (rid) => (rid === "1" ? restaurant1 : restaurant2);

  return (
    <RestaurantContext.Provider value={{ restaurant1, restaurant2, addEntry, getEntries }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurantData = () => useContext(RestaurantContext);
