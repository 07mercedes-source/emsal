// context/IKContext.js
import { createContext, useContext, useEffect, useState } from "react";

const IKContext = createContext(null);
const KEY = "emsal_ik_personnel_v1";

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPersonnel(JSON.parse(raw));
      else {
        // 20 örnek personel
        const demo = Array.from({ length: 20 }, (_, i) => ({
          id: 100 + i + 1,
          name: `Personel ${i + 1}`,
          registry: 1000 + i + 1,
          address: `Adres ${i + 1}`,
          phone: `+49 170 000 ${100 + i}`,
          restaurant: i % 2 === 0 ? "Restaurant 1" : "Restaurant 2",
          position: i % 3 === 0 ? "Garson" : i % 3 === 1 ? "Aşçı" : "Kasiyer",
          salary: 2500 + i * 50,
          steuerklasse: "1",
          hireDate: "2024-01-01",
          leaveDate: "",
        }));
        setPersonnel(demo);
        localStorage.setItem(KEY, JSON.stringify(demo));
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(personnel)); } catch (e) {}
  }, [personnel]);

  const addPerson = (p) => {
    const newId = personnel.length ? Math.max(...personnel.map(x => x.id)) + 1 : 101;
    const item = { id: newId, ...p };
    setPersonnel([item, ...personnel]);
    return item;
  };

  const updatePerson = (id, patch) => setPersonnel(personnel.map(p => p.id === id ? { ...p, ...patch } : p));
  const removePerson = (id) => setPersonnel(personnel.filter(p => p.id !== id));

  return (
    <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson }}>
      {children}
    </IKContext.Provider>
  );
}

export function useIK() {
  const ctx = useContext(IKContext);
  if (!ctx) return { personnel: [], addPerson: () => {}, updatePerson: () => {}, removePerson: () => {} };
  return ctx;
}
