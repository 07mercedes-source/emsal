// context/DepoContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

export function DepoProvider({ children }) {
  const [urunler, setUrunler] = useState([]);
  const [filtre, setFiltre] = useState("Tümü");

  // initial load = SSR-safe (useEffect runs only on client)
  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_depo");
      if (s) {
        setUrunler(JSON.parse(s));
        return;
      }
    } catch (e) {
      // ignore
    }

    // örnek veriler (ilk defa)
    const ornek = [
      { id: uuidv4(), kategori: "Et", ad: "Dana Bonfile", stok: 40, birim: "kg", maliyet: 25.0 },
      { id: uuidv4(), kategori: "İçecek", ad: "Kola 330ml", stok: 120, birim: "adet", maliyet: 0.8 },
      { id: uuidv4(), kategori: "Kuru Gıda", ad: "Pirinç 5kg", stok: 90, birim: "paket", maliyet: 10.0 },
      { id: uuidv4(), kategori: "Alkol", ad: "Kırmızı Şarap", stok: 25, birim: "şişe", maliyet: 12.5 },
      { id: uuidv4(), kategori: "İçecek", ad: "Mineral Su 500ml", stok: 200, birim: "adet", maliyet: 0.5 },
      { id: uuidv4(), kategori: "Kuru Gıda", ad: "Un 10kg", stok: 15, birim: "çuval", maliyet: 18.0 },
      { id: uuidv4(), kategori: "Et", ad: "Tavuk Göğsü", stok: 60, birim: "kg", maliyet: 6.0 },
      { id: uuidv4(), kategori: "İçecek", ad: "Bira 500ml", stok: 75, birim: "şişe", maliyet: 1.5 },
      { id: uuidv4(), kategori: "Kuru Gıda", ad: "Şeker 5kg", stok: 40, birim: "paket", maliyet: 6.5 },
      { id: uuidv4(), kategori: "Alkol", ad: "Beyaz Şarap", stok: 18, birim: "şişe", maliyet: 11.0 }
    ];

    setUrunler(ornek);
    try {
      localStorage.setItem("emsal_depo", JSON.stringify(ornek));
    } catch (e) {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("emsal_depo", JSON.stringify(urunler));
    } catch (e) {}
  }, [urunler]);

  const urunEkle = (urun) => {
    const yeni = { id: uuidv4(), ...urun };
    setUrunler((p) => [...p, yeni]);
    return yeni;
  };

  const urunSil = (id) => setUrunler((p) => p.filter((u) => u.id !== id));

  const urunDuzenle = (id, deg) =>
    setUrunler((p) => p.map((u) => (u.id === id ? { ...u, ...deg } : u)));

  const stokGuncelle = (id, delta) =>
    setUrunler((p) => p.map((u) => (u.id === id ? { ...u, stok: Number(u.stok) + Number(delta) } : u)));

  const filtrelenmis = filtre === "Tümü" ? urunler : urunler.filter((u) => u.kategori === filtre);

  return (
    <DepoContext.Provider
      value={{
        urunler,
        filtre,
        setFiltre,
        filtrelenmis,
        urunEkle,
        urunSil,
        urunDuzenle,
        stokGuncelle
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => {
  const c = useContext(DepoContext);
  if (!c) throw new Error("useDepo must be used within DepoProvider");
  return c;
};
