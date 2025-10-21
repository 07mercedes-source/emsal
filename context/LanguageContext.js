// context/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const defaultLang = {
  lang: "tr",
  setLang: () => {},
  t: (k) => k,
};

const LanguageContext = createContext(defaultLang);

const translations = {
  tr: {
    home: "Anasayfa",
    depo: "Depo",
    ik: "İnsan Kaynakları",
    login: "Giriş",
    logout: "Çıkış",
    restaurant: "Restaurant",
    products: "Ürün Listesi",
  },
  en: {
    home: "Home",
    depo: "Warehouse",
    ik: "HR",
    login: "Login",
    logout: "Logout",
    restaurant: "Restaurant",
    products: "Products",
  },
  de: {
    home: "Startseite",
    depo: "Lager",
    ik: "Personal",
    login: "Anmelden",
    logout: "Abmelden",
    restaurant: "Restaurant",
    products: "Produkte",
  },
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
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
