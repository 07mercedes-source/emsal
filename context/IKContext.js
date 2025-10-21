import { createContext, useContext, useState } from "react";

const IKContext = createContext(null);

export function IKProvider({ children }) {
  const [personnel, setPersonnel] = useState([
    { id: 1, name: "Ali Yılmaz", title: "Garson", salary: 2500, hireDate: "2022-04-10" },
    { id: 2, name: "Ayşe Demir", title: "Aşçı", salary: 3200, hireDate: "2021-12-01" },
  ]);

  return (
    <IKContext.Provider value={{ personnel, setPersonnel }}>
      {children}
    </IKContext.Provider>
  );
}

export function useIK() {
  const context = useContext(IKContext);
  if (!context) return { personnel: [], setPersonnel: () => {} };
  return context;
}
