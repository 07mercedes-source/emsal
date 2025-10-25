// context/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  tr: { home: "Anasayfa", depo: "Depo", ik: "İnsan Kaynakları", login: "Giriş", logout: "Çıkış", restaurant: "Restaurant", products: "Ürün Listesi", personnel: "Personel Listesi", add: "Ekle", remove: "Sil", edit: "Düzenle", reports: "Raporlar", deliver: "Teslim Al", ship: "Sevk Et" },
  en: { home: "Home", depo: "Warehouse", ik: "HR", login: "Login", logout: "Logout", restaurant: "Restaurant", products: "Products", personnel: "Personnel", add: "Add", remove: "Remove", edit: "Edit", reports: "Reports", deliver: "Receive", ship: "Ship" },
  de: { home: "Startseite", depo: "Lager", ik: "Personal", login: "Anmelden", logout: "Abmelden", restaurant: "Restaurant", products: "Produkte", personnel: "Personal", add: "Hinzufügen", remove: "Löschen", edit: "Bearbeiten", reports: "Berichte", deliver: "Annehmen", ship: "Versenden" },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    try {
      const l = localStorage.getItem("emsal_lang");
      if (l) setLang(l);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("emsal_lang", lang);
    } catch (e) {}
  }, [lang]);

  const t = (key) => {
    const v = translations[lang] && translations[lang][key];
    if (!v) return key;
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
