import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

export function DepoProvider({ children }) {
  const [urunler, setUrunler] = useState([]);
  const [filtre, setFiltre] = useState("Tümü");

  // ilk örnek ürünleri yükle
  useEffect(() => {
    const saved = localStorage.getItem("emsal_depo");
    if (saved) {
      setUrunler(JSON.parse(saved));
    } else {
      const ornekUrunler = [
        { id: uuidv4(), kategori: "Et", ad: "Dana Bonfile", stok: 45, birim: "kg" },
        { id: uuidv4(), kategori: "İçecek", ad: "Kola 330ml", stok: 120, birim: "adet" },
        { id: uuidv4(), kategori: "Kuru Gıda", ad: "Pirinç", stok: 85, birim: "kg" },
        { id: uuidv4(), kategori: "Alkol", ad: "Şarap (Kırmızı)", stok: 30, birim: "şişe" }
      ];
      setUrunler(ornekUrunler);
      localStorage.setItem("emsal_depo", JSON.stringify(ornekUrunler));
    }
  }, []);

  // her değişimde kaydet
  useEffect(() => {
    localStorage.setItem("emsal_depo", JSON.stringify(urunler));
  }, [urunler]);

  const urunEkle = (yeni) => {
    const yeniUrun = { id: uuidv4(), ...yeni };
    setUrunler((prev) => [...prev, yeniUrun]);
  };

  const urunSil = (id) => {
    setUrunler((prev) => prev.filter((u) => u.id !== id));
  };

  const urunDuzenle = (id, yeniBilgiler) => {
    setUrunler((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...yeniBilgiler } : u))
    );
  };

  const filtrelenmisUrunler =
    filtre === "Tümü" ? urunler : urunler.filter((u) => u.kategori === filtre);

  return (
    <DepoContext.Provider
      value={{
        urunler,
        filtrelenmisUrunler,
        urunEkle,
        urunSil,
        urunDuzenle,
        filtre,
        setFiltre
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
