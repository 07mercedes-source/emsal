// context/RestaurantContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RestaurantContext = createContext(null);

const sample1 = [
  { id: uuidv4(), date: "2026-01-01", type:"income", amount:20000, desc:"Günlük ciro" },
  { id: uuidv4(), date: "2026-01-01", type:"expense", amount:100, desc:"İçecek gideri" }
];
const sample2 = [
  { id: uuidv4(), date: "2026-01-01", type:"income", amount:15000, desc:"Günlük ciro" }
];

export function RestaurantProvider({ children }){
  const [restaurant1, setRestaurant1] = useState(sample1);
  const [restaurant2, setRestaurant2] = useState(sample2);

  useEffect(()=>{ try{ const s1 = localStorage.getItem("emsal_r1"); if(s1) setRestaurant1(JSON.parse(s1)); const s2 = localStorage.getItem("emsal_r2"); if(s2) setRestaurant2(JSON.parse(s2)); }catch(e){} },[]);
  useEffect(()=>{ try{ localStorage.setItem("emsal_r1", JSON.stringify(restaurant1)); localStorage.setItem("emsal_r2", JSON.stringify(restaurant2)); }catch(e){} },[restaurant1,restaurant2]);

  const addEntry = (which, entry) => {
    const e = { id: uuidv4(), ...entry };
    if(which===1) setRestaurant1(prev => [e, ...prev]);
    else setRestaurant2(prev => [e, ...prev]);
  };

  const getEntries = (which) => which===1? restaurant1 : restaurant2;

  return <RestaurantContext.Provider value={{ restaurant1, restaurant2, addEntry, getEntries }}>{children}</RestaurantContext.Provider>;
}

export const useRestaurant = () => useContext(RestaurantContext);
