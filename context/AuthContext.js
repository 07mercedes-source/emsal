// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USERS = [
  { username: "admin", password: "12345", name: "Admin Kullanıcı", role: "Yönetici" },
  { username: "muhasebe", password: "12345", name: "Muhasebe Kullanıcı", role: "Muhasebe" },
  { username: "personel", password: "12345", name: "Personel Kullanıcı", role: "Personel" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("emsal_user");
      if (s) setUser(JSON.parse(s));
    } catch {}
  }, []);

  const login = (username, password) => {
    const u = DEMO_USERS.find((x) => x.username === username && x.password === password);
    if (!u) return { ok: false, msg: "Kullanıcı veya şifre hatalı" };
    const payload = { username: u.username, name: u.name, role: u.role };
    setUser(payload);
    localStorage.setItem("emsal_user", JSON.stringify(payload));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("emsal_user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
