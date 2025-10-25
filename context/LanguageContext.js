// context/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
const LanguageContext = createContext(null);

const translations = {
  tr: {
    home: "Anasayfa", depo: "Depo", ik: "İnsan Kaynakları", login: "Giriş", logout: "Çıkış",
    restaurant: "Restoran", products: "Ürün Listesi", personnel: "Personel Listesi", add: "Ekle",
    remove: "Sil", edit: "Düzenle", teslim_al: "Teslim Alma", sevk: "Sevk Et", rapor: "Raporlar",
  },
  en: {
    home: "Home", depo: "Warehouse", ik: "Human Resources", login: "Login", logout: "Logout",
    restaurant: "Restaurant", products: "Products", personnel: "Personnel", add: "Add",
    remove: "Delete", edit: "Edit", teslim_al: "Receive", sevk: "Dispatch", rapor: "Reports",
  },
  de: {
    home: "Startseite", depo: "Lager", ik: "Personal", login: "Anmelden", logout: "Abmelden",
    restaurant: "Restaurant", products: "Produkte", personnel: "Personal", add: "Hinzufügen",
    remove: "Löschen", edit: "Bearbeiten", teslim_al: "Empfangen", sevk: "Versenden", rapor: "Berichte",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");
  useEffect(() => {
    try { const s = localStorage.getItem("emsal_lang"); if (s) setLang(s); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("emsal_lang", lang); } catch {} }, [lang]);

  const t = (key) => {
    const v = translations[lang] && translations[lang][key];
    if (!v) return key;
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
