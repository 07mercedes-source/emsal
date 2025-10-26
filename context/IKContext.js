// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const IKContext = createContext(null);

const SAMPLE_PERSONNEL = Array.from({length:20}).map((_,i)=>({
  id: uuidv4(),
  sicil: 1000+i,
  name: `Personel ${i+1}`,
  phone: `+49 30 0000${i}`,
  address: `Berlin - Bölge ${i+1}`,
  restaurant: i%2===0 ? "Restaurant 1" : "Restaurant 2",
  position: i%3===0 ? "Garson" : (i%3===1 ? "Aşçı" : "Kasiyer"),
  gross: 3000 + i*10
}));

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState(()=> {
    const s = localStorage.getItem("emsal_personnel");
    return s ? JSON.parse(s) : SAMPLE_PERSONNEL;
  });

  useEffect(()=> localStorage.setItem("emsal_personnel", JSON.stringify(personnel)), [personnel]);

  const addPerson = (p) => setPersonnel(prev=>[...prev,{ id:uuidv4(), ...p }]);
  const updatePerson = (id, changes) => setPersonnel(prev=> prev.map(p=> p.id===id ? {...p,...changes}:p));
  const removePerson = (id) => setPersonnel(prev=> prev.filter(p=> p.id!==id));

  // Avans/izin kayıtları basit storage (sadece demo)
  const [avans, setAvans] = useState(()=> JSON.parse(localStorage.getItem("emsal_avans") || "[]"));
  const [izins, setIzins] = useState(()=> JSON.parse(localStorage.getItem("emsal_izins") || "[]"));

  useEffect(()=> localStorage.setItem("emsal_avans", JSON.stringify(avans)), [avans]);
  useEffect(()=> localStorage.setItem("emsal_izins", JSON.stringify(izins)), [izins]);

  const submitAvans = (data) => setAvans(prev=>[...prev, {...data, id: uuidv4(), created: new Date().toISOString()}]);
  const submitIzin = (data) => setIzins(prev=>[...prev, {...data, id: uuidv4(), created: new Date().toISOString()}]);

  return <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson, avans, izins, submitAvans, submitIzin }}>{children}</IKContext.Provider>;
}

export const useIK = () => useContext(IKContext);
