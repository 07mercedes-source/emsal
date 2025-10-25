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
    restaurant: "Restaurant",
    products: "Ürün Listesi",
    personnel: "Personel Listesi",
    add: "Ekle",
    remove: "Sil",
    edit: "Düzenle",
    delivery: "Teslim Alma",
    shipment: "Sevk Et",
    reports: "Raporlar",
    revenue: "Gelir",
    expense: "Gider",
    net: "Net",
    filter: "Filtre",
    all: "Tümü",
    category: "Kategori",
    search: "Ara"
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
    delivery: "Delivery",
    shipment: "Shipment",
    reports: "Reports",
    revenue: "Revenue",
    expense: "Expense",
    net: "Net",
    filter: "Filter",
    all: "All",
    category: "Category",
    search: "Search"
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
    delivery: "Einlagerung",
    shipment: "Versand",
    reports: "Berichte",
    revenue: "Einnahmen",
    expense: "Ausgaben",
    net: "Netto",
    filter: "Filter",
    all: "Alles",
    category: "Kategorie",
    search: "Suche"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_lang");
      if (s) setLang(s);
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
