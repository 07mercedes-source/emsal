// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  // store as {id: '1'|'2', entries: [{date, type: 'income'|'expense', description, amount}] }
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem("emsal_restaurant");
      return raw ? JSON.parse(raw) : {
        "1": { entries: [] },
        "2": { entries: [] },
      };
    } catch (e) {
      return { "1": { entries: [] }, "2": { entries: [] } };
    }
  });

  useEffect(() => { try { localStorage.setItem("emsal_restaurant", JSON.stringify(data)); } catch (e) {} }, [data]);

  function addEntry(restaurantId, entry) {
    setData((d) => ({ ...d, [restaurantId]: { entries: [entry, ...(d[restaurantId]?.entries || [])] } }));
  }

  function getMonthTotals(restaurantId, year, month) {
    const entries = data[restaurantId]?.entries || [];
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    let income = 0, expense = 0;
    entries.forEach((e) => {
      const d = new Date(e.date);
      if (d >= start && d <= end) {
        if (e.type === "income") income += Number(e.amount);
        else expense += Number(e.amount);
      }
    });
    return { income, expense, net: income - expense };
  }

  return <RestaurantContext.Provider value={{ data, addEntry, getMonthTotals }}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => useContext(RestaurantContext);
