// context/IKContext.js
import React, { createContext, useContext, useState } from "react";

const IKContext = createContext();

const SAMPLE_PERSONNEL = Array.from({ length: 20 }).map((_, i) => {
  const id = 100 + i;
  return {
    id,
    name: ["Ahmet Yılmaz","Ayşe Demir","Mehmet Kaya","Zeynep Koç","Ali Uçar"][i%5] + ` ${i+1}`,
    title: ["Garson","Aşçı","Kasiyer","Temizlik","Müdür"][i%5],
    salary: 2000 + (i%5)*200,
    hireDate: `2023-${String((i%12)+1).padStart(2,"0")}-01`
  };
});

export function IKProvider({ children }){
  const [personnel, setPersonnel] = useState(SAMPLE_PERSONNEL);
  return <IKContext.Provider value={{ personnel, setPersonnel }}>{children}</IKContext.Provider>;
}

export function useIK(){
  const ctx = useContext(IKContext);
  if (!ctx) throw new Error("useIK must be used inside IKProvider");
  return ctx;
}
