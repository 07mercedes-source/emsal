// context/LanguageContext.js
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext(undefined);

const translations = {
  tr: { home: "Anasayfa", depo: "Depo", ik: "İnsan Kaynakları", login: "Giriş", logout: "Çıkış", depotitle: "Ürün Listesi" },
  en: { home: "Home", depo: "Warehouse", ik: "HR", login: "Login", logout: "Logout", depotitle: "Product list" },
  de: { home: "Startseite", depo: "Lager", ik: "Personal", login: "Anmelden", logout: "Abmelden", depotitle: "Produktliste" },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const t = (key) => (translations[lang] && translations[lang][key]) || key;
  return <LanguageContext.Provider value={{ t, lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(){
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
