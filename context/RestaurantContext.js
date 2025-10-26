// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const [r1, setR1] = useState(()=> JSON.parse(localStorage.getItem("emsal_r1")||"[]"));
  const [r2, setR2] = useState(()=> JSON.parse(localStorage.getItem("emsal_r2")||"[]"));

  useEffect(()=> localStorage.setItem("emsal_r1", JSON.stringify(r1)), [r1]);
  useEffect(()=> localStorage.setItem("emsal_r2", JSON.stringify(r2)), [r2]);

  const addEntry = (restaurantId, entry) => {
    if (restaurantId===1) setR1(prev=>[...prev, entry]);
    else setR2(prev=>[...prev, entry]);
  };

  const getMonthTotal = (restaurantId, year, month) => {
    const list = restaurantId===1 ? r1 : r2;
    return list.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear()===year && (d.getMonth()+1)===month;
    }).reduce((s,e)=> s + Number(e.amount || 0), 0);
  };

  return <RestaurantContext.Provider value={{ r1, r2, addEntry, getMonthTotal }}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => useContext(RestaurantContext);
