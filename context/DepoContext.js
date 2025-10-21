import { createContext, useContext, useState } from "react";

const DepoContext = createContext(null);

export function DepoProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Un", stock: 25, unit: "kg" },
    { id: 2, name: "Yağ", stock: 10, unit: "lt" },
  ]);

  return (
    <DepoContext.Provider value={{ products, setProducts }}>
      {children}
    </DepoContext.Provider>
  );
}

export function useDepo() {
  const context = useContext(DepoContext);
  if (!context) return { products: [], setProducts: () => {} };
  return context;
}
