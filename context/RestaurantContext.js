// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);

const sampleEntries = [
  // {id, restaurant:1/2, date: 'YYYY-MM-DD', type: 'gelir'|'gider', description, amount}
  { id: 1, restaurant: 1, date: "2025-10-01", type: "gelir", description: "Günlük ciro", amount: 12000 },
  { id: 2, restaurant: 1, date: "2025-10-01", type: "gider", description: "İçecek gideri", amount: 100 },
  { id: 3, restaurant: 2, date: "2025-10-02", type: "gelir", description: "Günlük ciro", amount: 8000 },
];

export function RestaurantProvider({ children }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_rest_entries");
      if (s) setEntries(JSON.parse(s));
      else setEntries(sampleEntries);
    } catch (e) {
      setEntries(sampleEntries);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("emsal_rest_entries", JSON.stringify(entries)); } catch (e) {}
  }, [entries]);

  const addEntry = (entry) => {
    const id = entries.length ? Math.max(...entries.map((x) => x.id)) + 1 : 1;
    setEntries((s) => [...s, { ...entry, id }]);
  };

  const getByRestaurantAndMonth = (restaurant, month, year) => {
    return entries.filter((e) => {
      const d = new Date(e.date);
      return e.restaurant === restaurant && d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  };

  return <RestaurantContext.Provider value={{ entries, addEntry, getByRestaurantAndMonth }}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => useContext(RestaurantContext);
