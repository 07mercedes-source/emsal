// pages/login.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handle = async (e) => {
    e?.preventDefault();
    const res = login(username.trim(), password.trim());
    if (!res.ok) setErr(res.msg);
    else router.push("/");
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Giriş</h2>
      <form onSubmit={handle}>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Kullanıcı adı" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Şifre" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <button type="submit">Giriş</button>
      </form>
      <p style={{ marginTop: 12, color: "#666" }}>Not: Demo kullanıcıları arka planda hazır; ekrandan gösterilmiyor.</p>
    </div>
  );
}
