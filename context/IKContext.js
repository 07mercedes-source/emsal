// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const IKContext = createContext(null);

const samplePersonnel = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  sicil: 1000 + i,
  name: `Çalışan ${i + 1}`,
  phone: `+49 170 000 ${100 + i}`,
  address: `Berlin, Str ${i + 1}`,
  restaurant: i % 2 === 0 ? "Restaurant 1" : "Restaurant 2",
  position: i % 3 === 0 ? "Şef" : "Personel",
  grossSalary: Math.round(2500 + Math.random() * 2000),
  steuerKlasse: (i % 2) + 1,
}));

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_personnel");
      if (s) setPersonnel(JSON.parse(s));
      else setPersonnel(samplePersonnel);
    } catch (e) {
      setPersonnel(samplePersonnel);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("emsal_personnel", JSON.stringify(personnel)); } catch (e) {}
  }, [personnel]);

  const addPerson = (p) => {
    const id = personnel.length ? Math.max(...personnel.map((x) => x.id)) + 1 : 1;
    setPersonnel((s) => [...s, { ...p, id }]);
  };

  const updatePerson = (id, updates) => setPersonnel((s) => s.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const removePerson = (id) => setPersonnel((s) => s.filter((p) => p.id !== id));

  return <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson }}>{children}</IKContext.Provider>;
}

export const useIK = () => useContext(IKContext);
