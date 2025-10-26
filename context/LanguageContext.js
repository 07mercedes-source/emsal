// context/LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  tr: { home: "Anasayfa", depo: "Depo", ik: "İnsan Kaynakları", login:"Giriş", logout:"Çıkış", products:"Ürünler" },
  en: { home: "Home", depo:"Warehouse", ik:"Human Resources", login:"Login", logout:"Logout", products:"Products" },
  de: { home: "Startseite", depo:"Lager", ik:"Personal", login:"Anmelden", logout:"Abmelden", products:"Produkte" }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("tr");

  useEffect(()=>{
    try{ const s = localStorage.getItem("emsal_lang"); if(s) setLang(s); }catch(e){}
  },[]);

  useEffect(()=>{ try{ localStorage.setItem("emsal_lang", lang); }catch(e){} },[lang]);

  const t = (key) => {
    const v = translations[lang] && translations[lang][key];
    if(!v) return key;
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  };

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
