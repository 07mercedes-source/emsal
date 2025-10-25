// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const IKContext = createContext(null);

const samplePersonnel = Array.from({ length: 20 }).map((_, i) => ({
  id: uuidv4(),
  sicil: 1000 + i,
  name: `Personel ${i + 1}`,
  phone: `+49 30 0000${i + 10}`,
  address: `Berlin, Straße ${i + 1}`,
  restaurant: i % 2 === 0 ? "Restaurant 1" : "Restaurant 2",
  role: i % 3 === 0 ? "Şef" : "Garson",
  grossSalary: (2000 + i * 50).toFixed(2),
  steuerklasse: (i % 2) + 1,
}));

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("emsal_personnel");
      if (saved) setPersonnel(JSON.parse(saved));
      else setPersonnel(samplePersonnel);
    } catch (e) {
      setPersonnel(samplePersonnel);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emsal_personnel", JSON.stringify(personnel));
    } catch (e) {}
  }, [personnel]);

  const addPerson = (p) => {
    const newP = { id: uuidv4(), ...p };
    setPersonnel((s) => [newP, ...s]);
  };

  const updatePerson = (id, data) => setPersonnel((s) => s.map((it) => (it.id === id ? { ...it, ...data } : it)));
  const removePerson = (id) => setPersonnel((s) => s.filter((it) => it.id !== id));

  return <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson }}>{children}</IKContext.Provider>;
}

export const useIK = () => useContext(IKContext);
