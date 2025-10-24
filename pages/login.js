// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { user, login } = useAuth() || {};
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e?.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) setErr("Kullanıcı adı veya şifre hatalı");
    else router.push("/");
  }

  // eğer zaten girişli ise anasayfaya gönder
  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: 360, background: "#fff", padding: 24, borderRadius: 10 }}>
        <h2 style={{ marginBottom: 10 }}>EMSAL Panel Giriş</h2>
        <input placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input placeholder="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#0b1220", color: "#fff", border: "none", borderRadius: 6 }}>Giriş Yap</button>
      </form>
    </div>
  );
}
