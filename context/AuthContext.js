// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// demo user list (server side would be real DB)
const demoUsers = [
  { username: "admin", password: "12345", name: "Admin Kullanıcı", role: "Yönetici" },
  { username: "muhasebe", password: "12345", name: "Muhasebe", role: "Muhasebe" },
  { username: "personel", password: "12345", name: "Personel", role: "Personel" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // restore session if set
    try {
      const s = localStorage.getItem("emsal_user");
      if (s) setUser(JSON.parse(s));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("emsal_user", JSON.stringify(user));
      else localStorage.removeItem("emsal_user");
    } catch (e) {}
  }, [user]);

  const login = (username, password) => {
    // Validate (demo). DO NOT show these credentials in UI.
    const u = demoUsers.find((d) => d.username === username && d.password === password);
    if (!u) return { ok: false, msg: "Kullanıcı adı veya parola yanlış." };
    setUser({ name: u.name, username: u.username, role: u.role });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
