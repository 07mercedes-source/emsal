import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const DepoContext = createContext();

export function DepoProvider({ children }) {
  const [urunler, setUrunler] = useState([
    { id: nanoid(), ad: "Kırmızı Şarap", kategori: "alkol", miktar: 24 },
    { id: nanoid(), ad: "Dana Eti", kategori: "et", miktar: 12 },
    { id: nanoid(), ad: "Kola", kategori: "içecek", miktar: 60 },
    { id: nanoid(), ad: "Pirinç", kategori: "kuru gıda", miktar: 45 },
  ]);

  const addUrun = (ad, kategori, miktar) => {
    setUrunler([...urunler, { id: nanoid(), ad, kategori, miktar }]);
  };

  const removeUrun = (id) => {
    setUrunler(urunler.filter((u) => u.id !== id));
  };

  const updateUrun = (id, yeni) => {
    setUrunler(urunler.map((u) => (u.id === id ? { ...u, ...yeni } : u)));
  };

  return (
    <DepoContext.Provider value={{ urunler, addUrun, removeUrun, updateUrun }}>
      {children}
    </DepoContext.Provider>
  );
}

export const useDepo = () => useContext(DepoContext);
