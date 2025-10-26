// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const IKContext = createContext(null);

const samplePersonnel = Array.from({length:20}).map((_,i)=>({
  id: uuidv4(),
  sicil: 1000+i,
  name: `Personel ${i+1}`,
  address: `Adres ${i+1}`,
  phone: `+49 30 1234 ${100+i}`,
  restaurant: i%2===0 ? "Restaurant 1" : "Restaurant 2",
  position: i%3===0 ? "Şef" : "Garson",
  gross: (1500 + i*10),
  steuer: "1"
}));

export function IKProvider({ children }){
  const [personnel, setPersonnel] = useState(samplePersonnel);

  useEffect(()=>{ try{ const s = localStorage.getItem("emsal_personnel"); if(s) setPersonnel(JSON.parse(s)); }catch(e){} },[]);
  useEffect(()=>{ try{ localStorage.setItem("emsal_personnel", JSON.stringify(personnel)); }catch(e){} },[personnel]);

  const add = (p) => setPersonnel(prev => [ { id: uuidv4(), ...p }, ...prev ]);
  const update = (id, data) => setPersonnel(prev => prev.map(x => x.id===id ? {...x,...data} : x));
  const remove = (id) => setPersonnel(prev => prev.filter(x=>x.id!==id));

  return <IKContext.Provider value={{ personnel, add, update, remove }}>{children}</IKContext.Provider>;
}

export const useIK = () => useContext(IKContext);
