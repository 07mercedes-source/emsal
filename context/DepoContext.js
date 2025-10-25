import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext();

export function DepoProvider({ children }) {
  const [urunler, setUrunler] = useState([]);
  const [filtre, setFiltre] = useState("Tümü");

  useEffect(() => {
    const kayitli = localStorage.getItem("emsal_depo");
    if (kayitli) setUrunler(JSON.parse(kayitli));
    else {
      const ornek = [
        { id: uuidv4(), kategori: "Et", ad: "Dana Bonfile", stok: 40, birim: "kg" },
        { id: uuidv4(), kategori: "İçecek", ad: "Kola 330ml", stok: 120, birim: "adet" },
        { id: uuidv4(), kategori: "Kuru Gıda", ad: "Pirinç", stok: 90, birim: "kg" },
        { id: uuidv4(), kategori: "Alkol", ad: "Kırmızı Şarap", stok: 25, birim: "şişe" }
      ];
      setUrunler(ornek);
      localStorage.setItem("emsal_depo", JSON.stringify(ornek));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("emsal_depo", JSON.stringify(urunler));
  }, [urunler]);

  const urunEkle = (urun) =>
    setUrunler((p) => [...p, { id: uuidv4(), ...urun }]);
  const urunSil = (id) => setUrunler((p) => p.filter((u) => u.id !== id));
  const urunDuzenle = (id, degisiklik) =>
    setUrunler((p) => p.map((u) => (u.id === id ? { ...u, ...degisiklik } : u)));

  const filtrelenmis =
    filtre === "Tümü" ? urunler : urunler.filter((u) => u.kategori === filtre);

  return (
    <DepoContext.Provider
      value={{
        urunler,
        filtre,
        setFiltre,
        filtrelenmis,
        urunEkle,
        urunSil,
        urunDuzenle
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
