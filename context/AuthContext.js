// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const demoUsers = [
  { username: "admin", password: "12345", name: "Admin Kullanıcı", role: "Yönetici" },
  { username: "muhasebe", password: "12345", name: "Muhasebe Kullanıcı", role: "Muhasebe" },
  { username: "personel", password: "12345", name: "Personel Kullanıcı", role: "Personel" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("emsal_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  function login(username, password) {
    // gerçek projede API ile doğrula. burada demo:
    const u = demoUsers.find((x) => x.username === username && x.password === password);
    if (!u) return false;
    const minimal = { username: u.username, name: u.name, role: u.role };
    setUser(minimal);
    try { localStorage.setItem("emsal_user", JSON.stringify(minimal)); } catch (e) {}
    return true;
  }

  function logout() {
    setUser(null);
    try { localStorage.removeItem("emsal_user"); } catch (e) {}
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
