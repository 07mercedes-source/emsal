// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const IKContext = createContext(null);

const SAMPLE_PERSONNEL = Array.from({ length: 20 }).map((_, i) => ({
  id: uuidv4(),
  sicil: 1000 + i,
  name: `Çalışan ${i+1}`,
  phone: "000-000-0000",
  address: `Adres ${i+1}`,
  restaurant: i % 2 === 0 ? "Restaurant 1" : "Restaurant 2",
  position: i % 3 === 0 ? "Şef" : "Garson",
  gross: (2000 + i * 10),
  steuer: "1",
  startDate: "2024-01-01",
  endDate: ""
}));

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    const s = localStorage.getItem("emsal_personnel");
    if (s) setPersonnel(JSON.parse(s)); else setPersonnel(SAMPLE_PERSONNEL);
  }, []);

  useEffect(() => { localStorage.setItem("emsal_personnel", JSON.stringify(personnel)); }, [personnel]);

  const addPerson = (p) => setPersonnel(prev => [{ id: uuidv4(), ...p }, ...prev]);
  const updatePerson = (id, data) => setPersonnel(prev => prev.map(x => x.id === id ? { ...x, ...data } : x));
  const removePerson = (id) => setPersonnel(prev => prev.filter(x => x.id !== id));

  // send request (vacation/advance) via API
  const sendRequestMail = async (payload) => {
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "07mercedes@gmail.com",
          subject: payload.subject || "İK Talebi",
          text: payload.text || JSON.stringify(payload)
        })
      });
      return await res.json();
    } catch (e) { return { ok: false, error: e.message }; }
  };

  return (
    <IKContext.Provider value={{ personnel, addPerson, updatePerson, removePerson, sendRequestMail }}>
      {children}
    </IKContext.Provider>
  );
}

export const useIK = () => useContext(IKContext);
