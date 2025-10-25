// context/IKContext.js
import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const IKContext = createContext(null);

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: nanoid(),
      sicil: `${1000 + i}`,
      ad: `Çalışan ${i + 1}`,
      telefon: `+49 30 5000${100 + i}`,
      adres: `Berlin, Almanya`,
      restaurant: i % 2 === 0 ? "Restaurant 1" : "Restaurant 2",
      gorev: i % 3 === 0 ? "Şef" : "Garson",
      maas: 3000 + (i * 50),
      steuerklasse: i % 2 === 0 ? "I" : "III",
      baslangic: `2024-0${(i%9)+1}-01`,
      ayrilis: ""
    }))
  );

  const addPerson = (p) => setPersonnel((s) => [{ id: nanoid(), ...p }, ...s]);
  const updatePerson = (id, p) => setPersonnel((s) => s.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const removePerson = (id) => setPersonnel((s) => s.filter((x) => x.id !== id));

  return <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson }}>{children}</IKContext.Provider>;
}

export const useIK = () => useContext(IKContext);
