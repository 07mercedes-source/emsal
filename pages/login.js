// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginPage() {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  if (user) {
    router.push("/");
    return null;
  }

  const handle = (e) => {
    e.preventDefault();
    const res = login(username.trim(), password.trim());
    if (!res.ok) setErr(res.msg);
    else router.push("/");
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <div className="card">
        <h2>EMSAL Giriş</h2>
        <form onSubmit={handle}>
          <div style={{ marginBottom: 8 }}>
            <label>Kullanıcı Adı</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8 }} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Şifre</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
          </div>
          {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button className="big-btn" type="submit">Giriş</button>
            <div style={{ alignSelf: "center", color: "#666" }}>
              Demo: admin/muhasebe/personel - şifre 12345
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
