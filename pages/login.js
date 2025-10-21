// pages/login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Basit demo: server yok; sadece örnek local login
    if (!username || !password) {
      setErr("Kullanıcı adı ve parola gerekli");
      return;
    }
    // Örnek role atama; gerçek kullanıcı yönetimi olunca değiştireceğiz.
    const role = username === "admin" ? "Yönetici" : username === "muhasebe" ? "Muhasebe" : "Personel";
    login({ name: username, role });
    router.push("/");
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 12 }}>Giriş</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Kullanıcı Adı</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Parola</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
        </div>

        {err && <div style={{ color: "red", marginBottom: 12 }}>{err}</div>}

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ padding: "8px 12px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8 }}>Giriş</button>
        </div>
      </form>
    </div>
  );
}
