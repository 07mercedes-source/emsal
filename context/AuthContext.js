// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("emsal_user");
        if (s) setUser(JSON.parse(s));
      }
    } catch (e) {}
  }, []);

  const login = (username, role = "personel") => {
    const u = { name: username, role };
    setUser(u);
    try { localStorage.setItem("emsal_user", JSON.stringify(u)); } catch(e){}
    return { ok: true, user: u };
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("emsal_user"); } catch(e){}
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
