// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const demoUsers = {
  admin: { name: "Admin Kullanıcı", role: "Yönetici", username: "admin", password: "12345" },
  muhasebe: { name: "Muhasebe Kullanıcı", role: "Muhasebe", username: "muhasebe", password: "12345" },
  personel: { name: "Personel Kullanıcı", role: "Personel", username: "personel", password: "12345" }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    try{
      const s = localStorage.getItem("emsal_user");
      if(s) setUser(JSON.parse(s));
    }catch(e){}
  },[]);

  useEffect(()=>{
    try{ localStorage.setItem("emsal_user", JSON.stringify(user || {})); }catch(e){}
  },[user]);

  const login = (username, password) => {
    // Basit demo auth (sadece demo amaçlı). Sunumda production için gerçek auth koy.
    const found = Object.values(demoUsers).find(u => u.username===username && u.password===password);
    if(found){ setUser(found); return { ok:true }; }
    return { ok:false, msg:"Kullanıcı adı veya şifre hatalı" };
  };

  const logout = () => { setUser(null); localStorage.removeItem("emsal_user"); };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
