// context/RestaurantContext.js
import { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);
const KEY = "emsal_restaurant_movements_v1";

/*
  restaurant data shape:
  { id, date (YYYY-MM-DD), description, amount, type: 'gelir'|'gider', restaurant: '1'|'2' }
*/

export function RestaurantProvider({ children }) {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setMovements(JSON.parse(raw));
      else {
        // örnek bazı hareketler
        const demo = [
          { id: 1, date: "2025-09-01", description: "Ciro", amount: 20000, type: "gelir", restaurant: "1" },
          { id: 2, date: "2025-09-01", description: "İçecek Gideri", amount: 100, type: "gider", restaurant: "1" },
          { id: 3, date: "2025-09-05", description: "Ciro", amount: 8000, type: "gelir", restaurant: "2" },
        ];
        setMovements(demo);
        localStorage.setItem(KEY, JSON.stringify(demo));
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(movements)); } catch (e) {}
  }, [movements]);

  const addMovement = (m) => {
    const newId = movements.length ? Math.max(...movements.map(x => x.id)) + 1 : 1;
    const item = { id: newId, ...m };
    setMovements([item, ...movements]);
    return item;
  };

  const removeMovement = (id) => setMovements(movements.filter(m => m.id !== id));
  const updateMovement = (id, patch) => setMovements(movements.map(m => m.id === id ? { ...m, ...patch } : m));

  return (
    <RestaurantContext.Provider value={{ movements, addMovement, removeMovement, updateMovement }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) return { movements: [], addMovement: () => {}, removeMovement: () => {}, updateMovement: () => {} };
  return ctx;
}
