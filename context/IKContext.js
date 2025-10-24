// context/IKContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const IKContext = createContext(null);

// örnek 20 personel
const samplePersonnel = Array.from({ length: 20 }, (_, i) => {
  const idx = i + 1;
  return {
    id: `E-${1000 + idx}`,
    name: `Çalışan ${idx}`,
    phone: `+49 30 5555${(100 + idx).toString().slice(-3)}`,
    address: `Berlin, Straße ${idx}`,
    restaurant: idx % 2 === 0 ? "Restaurant 2" : "Restaurant 1",
    position: idx % 3 === 0 ? "Şef" : "Garson",
    grossSalary: (2000 + idx * 50).toFixed(2),
    steuerClass: idx % 2 === 0 ? "1" : "3",
  };
});

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState(() => {
    try {
      const raw = localStorage.getItem("emsal_personnel");
      return raw ? JSON.parse(raw) : samplePersonnel;
    } catch (e) {
      return samplePersonnel;
    }
  });

  const [forms, setForms] = useState(() => {
    try {
      const raw = localStorage.getItem("emsal_ik_forms");
      return raw ? JSON.parse(raw) : { izin: [], avans: [] };
    } catch (e) {
      return { izin: [], avans: [] };
    }
  });

  useEffect(() => { try { localStorage.setItem("emsal_personnel", JSON.stringify(personnel)); } catch (e) {} }, [personnel]);
  useEffect(() => { try { localStorage.setItem("emsal_ik_forms", JSON.stringify(forms)); } catch (e) {} }, [forms]);

  function addPersonnel(p) {
    setPersonnel((s) => [p, ...s]);
  }
  function updatePersonnel(id, patch) {
    setPersonnel((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function removePersonnel(id) {
    setPersonnel((s) => s.filter((x) => x.id !== id));
  }

  function submitIzin(form) {
    setForms((s) => ({ ...s, izin: [form, ...s.izin] }));
    // burada e-posta gönderimi server ile yapılmalı; frontend sadece kaydeder.
  }
  function submitAvans(form) {
    setForms((s) => ({ ...s, avans: [form, ...s.avans] }));
  }

  return (
    <IKContext.Provider value={{ personnel, addPersonnel, updatePersonnel, removePersonnel, forms, submitIzin, submitAvans }}>
      {children}
    </IKContext.Provider>
  );
}

export const useIK = () => useContext(IKContext);
