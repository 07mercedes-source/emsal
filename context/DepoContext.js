import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DepoContext = createContext(null);

export const DepoProvider = ({ children }) => {
  const [urunler, setUrunler] = useState([
    { id: uuidv4(), ad: "Et Ürünü", kategori: "Et", miktar: 20, birim: "kg" },
    { id: uuidv4(), ad: "Alkol", kategori: "İçecek", miktar: 15, birim: "şişe" },
    { id: uuidv4(), ad: "Kuru Gıda", kategori: "Gıda", miktar: 100, birim: "kg" },
  ]);

  const urunEkle = (urun) => setUrunler([...urunler, { ...urun, id: uuidv4() }]);
  const urunSil = (id) => setUrunler(urunler.filter((u) => u.id !== id));
  const urunGuncelle = (id, yeni) =>
    setUrunler(urunler.map((u) => (u.id === id ? { ...u, ...yeni } : u)));

  return (
    <DepoContext.Provider value={{ urunler, urunEkle, urunSil, urunGuncelle }}>
      {children}
    </DepoContext.Provider>
  );
};

export const useDepo = () => useContext(DepoContext);
