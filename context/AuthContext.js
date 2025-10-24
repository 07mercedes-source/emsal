// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// demo users
const demoUsers = [
  { username: "admin", password: "12345", name: "Admin Kullanıcı", role: "admin" },
  { username: "muhasebe", password: "12345", name: "Muhasebe", role: "muhasebe" },
  { username: "personel", password: "12345", name: "Personel", role: "personel" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    const found = demoUsers.find((d) => d.username === username && d.password === password);
    if (found) {
      setUser(found);
      return { ok: true };
    }
    return { ok: false, msg: "Kullanıcı adı veya parola hatalı" };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
