// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("emsal_user") || "null"); } catch(e){ return null; }
  });

  useEffect(()=> { localStorage.setItem("emsal_user", JSON.stringify(user)); }, [user]);

  const login = ({ username, password }) => {
    // demo: admin /12345  or personel / 11111
    if (username === "admin" && password === "12345") {
      const u = { name: "Admin", role: "admin", username };
      setUser(u); return { ok:true, user:u };
    }
    if (username === "personel" && password === "11111") {
      const u = { name: "Personel", role: "personel", username };
      setUser(u); return { ok:true, user:u };
    }
    return { ok:false, msg:"Hatalı kullanıcı" };
  };

  const logout = ()=> setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
