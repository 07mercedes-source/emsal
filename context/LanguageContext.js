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
  },
  en: {
    home: "Home",
    depo: "Warehouse",
    ik: "HR",
    login: "Login",
    logout: "Logout",
    restaurant: "Restaurant",
    products: "Products",
    personnel: "Personnel",
    add: "Add",
    remove: "Delete",
    edit: "Edit",
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
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(() => {
    const saved = localStorage.getItem("emsal_lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("emsal_lang", lang);
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
