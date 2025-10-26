import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext();

export const DepoProvider = ({ children }) => {
  const [urunler, setUrunler] = useState([
    { id: uuidv4(), ad: "Kırmızı Et", kategori: "Et", miktar: 20, birim: "kg" },
    { id: uuidv4(), ad: "Şarap", kategori: "Alkol", miktar: 30, birim: "lt" },
    { id: uuidv4(), ad: "Un", kategori: "Kuru Gıda", miktar: 100, birim: "kg" },
    { id: uuidv4(), ad: "Kola", kategori: "İçecek", miktar: 50, birim: "adet" },
  ]);

  const kategoriler = ["Tümü", "Et", "Alkol", "İçecek", "Kuru Gıda"];

  const urunEkle = (urun) => setUrunler([...urunler, { id: uuidv4(), ...urun }]);
  const urunSil = (id) => setUrunler(urunler.filter((u) => u.id !== id));
  const urunGuncelle = (id, yeni) =>
    setUrunler(urunler.map((u) => (u.id === id ? { ...u, ...yeni } : u)));

  return (
    <DepoContext.Provider
      value={{ urunler, setUrunler, urunEkle, urunSil, urunGuncelle, kategoriler }}
    >
      {children}
    </DepoContext.Provider>
  );
};

export const useDepo = () => useContext(DepoContext);
