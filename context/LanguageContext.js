// context/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  tr: {
    home: "Anasayfa",
    depo: "Depo",
    ik: "İnsan Kaynakları",
    login: "Giriş",
    logout: "Çıkış",
    restaurant: "Restoran",
    products: "Ürünler",
    personnel: "Personel",
    add: "Ekle",
    remove: "Sil",
    edit: "Düzenle",
    delivery: "Teslim Alma",
    shipment: "Sevk",
    reports: "Raporlar",
    welcome: "Hoşgeldiniz",
  },
  en: {
    home: "Home",
    depo: "Warehouse",
    ik: "Human Resources",
    login: "Login",
    logout: "Logout",
    restaurant: "Restaurant",
    products: "Products",
    personnel: "Personnel",
    add: "Add",
    remove: "Remove",
    edit: "Edit",
    delivery: "Receiving",
    shipment: "Shipment",
    reports: "Reports",
    welcome: "Welcome",
  },
  de: {
    home: "Startseite",
    depo: "Lager",
    ik: "Personal",
    login: "Anmelden",
    logout: "Abmelden",
    restaurant: "Restaurant",
    products: "Produkte",
    personnel: "Personal",
    add: "Hinzufügen",
    remove: "Löschen",
    edit: "Bearbeiten",
    delivery: "Wareneingang",
    shipment: "Versand",
    reports: "Berichte",
    welcome: "Willkommen",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("emsal_lang");
      if (saved) setLang(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("emsal_lang", lang); } catch (e) {}
  }, [lang]);

  const t = (key) => {
    const v = translations[lang] && translations[lang][key];
    if (!v) return key;
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
