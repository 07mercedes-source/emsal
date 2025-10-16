// components/LanguageProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const dict = {
  tr: {
    home: "Anasayfa",
    depo: "Depo",
    ik: "İnsan Kaynakları",
    restaurant: "Restaurant",
    login: "Giriş",
    logout: "Çıkış",
    products: "Ürünler",
    deliveries: "Teslim Alma",
    shipments: "Sevk",
    reports: "Raporlar",
    yeniUrun: "Yeni Ürün Ekle",
    teslimAl: "Ürün Teslim Al",
    sevkEt: "Ürün Sevk Et",
    excelRapor: "Excel (CSV) Raporu",
  },
  en: {
    home: "Home",
    depo: "Warehouse",
    ik: "Human Resources",
    restaurant: "Restaurant",
    login: "Login",
    logout: "Logout",
    products: "Products",
    deliveries: "Deliveries",
    shipments: "Shipments",
    reports: "Reports",
    yeniUrun: "Add New Product",
    teslimAl: "Receive Product",
    sevkEt: "Ship Product",
    excelRapor: "Excel (CSV) Report",
  },
  de: {
    home: "Startseite",
    depo: "Lager",
    ik: "Personal",
    restaurant: "Restaurant",
    login: "Anmelden",
    logout: "Abmelden",
    products: "Produkte",
    deliveries: "Wareneingang",
    shipments: "Versand",
    reports: "Berichte",
    yeniUrun: "Neues Produkt",
    teslimAl: "Wareneingang",
    sevkEt: "Versenden",
    excelRapor: "Excel (CSV) Bericht",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const raw = localStorage.getItem("emsal_lang");
    if (raw) setLang(raw);
  }, []);

  useEffect(() => {
    localStorage.setItem("emsal_lang", lang);
  }, [lang]);

  const t = (k) => (dict[lang] && dict[lang][k]) || k;
  return <LanguageContext.Provider value={{ t, lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
