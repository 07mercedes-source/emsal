// context/DepoContext.js
import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const DepoContext = createContext(null);

export function DepoProvider({ children }) {
  const [urunler, setUrunler] = useState([
    { id: nanoid(), ad: "Kırmızı Şarap", kategori: "alkol", miktar: 24, birim: "şişe", maliyet: 12.5, skt: "2026-12-31" },
    { id: nanoid(), ad: "Dana Eti", kategori: "et", miktar: 12, birim: "kg", maliyet: 8.0, skt: "2025-11-10" },
    { id: nanoid(), ad: "Kola", kategori: "içecek", miktar: 60, birim: "kutu", maliyet: 0.9, skt: "2027-01-01" },
    { id: nanoid(), ad: "Pirinç", kategori: "kuru gıda", miktar: 45, birim: "kg", maliyet: 1.2, skt: "2028-01-01" },
    { id: nanoid(), ad: "Bira (500ml)", kategori: "alkol", miktar: 120, birim: "şişe", maliyet: 1.3, skt: "2026-06-01" },
    { id: nanoid(), ad: "Tuz", kategori: "kuru gıda", miktar: 30, birim: "kg", maliyet: 0.5, skt: "2030-01-01" },
    { id: nanoid(), ad: "Zeytin", kategori: "kuru gıda", miktar: 20, birim: "kavanoz", maliyet: 3.0, skt: "2026-03-03" },
    { id: nanoid(), ad: "Meyve Suyu", kategori: "içecek", miktar: 80, birim: "kutu", maliyet: 0.8, skt: "2026-05-05" },
    { id: nanoid(), ad: "Tavuk Göğsü", kategori: "et", miktar: 22, birim: "kg", maliyet: 5.5, skt: "2025-09-10" },
    { id: nanoid(), ad: "Ekmek", kategori: "kuru gıda", miktar: 200, birim: "adet", maliyet: 0.4, skt: "2025-07-01" }
  ]);

  const addUrun = (payload) => {
    setUrunler((s) => [...s, { id: nanoid(), ...payload }]);
  };

  const updateUrun = (id, payload) => {
    setUrunler((s) => s.map((u) => (u.id === id ? { ...u, ...payload } : u)));
  };

  const removeUrun = (id) => {
    setUrunler((s) => s.filter((u) => u.id !== id));
  };

  // sevk/teslim history (basit)
  const [history, setHistory] = useState([]);

  const pushHistory = (entry) => {
    setHistory((s) => [{ id: nanoid(), ...entry }, ...s]);
  };

  return (
    <DepoContext.Provider value={{ urunler, addUrun, updateUrun, removeUrun, history, pushHistory }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
