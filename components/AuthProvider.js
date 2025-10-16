// components/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("emsal_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (username, password) => {
    if (!username || !password) return { ok: false, msg: "Eksik" };
    if (password !== "1234") return { ok: false, msg: "Şifre demo: 1234" };

    let role = "personel";
    if (username === "admin") role = "admin";
    if (username === "muhasebe") role = "muhasebe";

    const u = { username, name: username === "admin" ? "EMSAL Yönetici" : username, role };
    localStorage.setItem("emsal_user", JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("emsal_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
