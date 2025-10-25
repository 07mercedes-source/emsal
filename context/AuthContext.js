// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const demoUsers = {
  admin: { username: "admin", name: "Admin User", role: "Yönetici" },
  muhasebe: { username: "muhasebe", name: "Muhasebe User", role: "Muhasebe" },
  personel: { username: "personel", name: "Personel User", role: "Personel" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("emsal_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("emsal_user", JSON.stringify(user));
      else localStorage.removeItem("emsal_user");
    } catch (e) {}
  }, [user]);

  const login = (username, password) => {
    // DEMO: şifre kontrolü basit: hepsinin parolası "12345" (sunumda sen değiştir)
    // Ancak LOGIN sayfasında demo login bilgilerini göstermeyeceğiz.
    const u = demoUsers[username];
    if (!u) return { ok: false, msg: "Kullanıcı bulunamadı" };
    if (password !== "12345") return { ok: false, msg: "Şifre hatalı" };
    setUser(u);
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
