// pages/login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    const res = login(username.trim(), password);
    if (!res.ok) {
      setErr(res.msg);
      return;
    }
    router.push("/");
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>{t("login")}</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input placeholder="Kullanıcı adı" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Parola" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={{ background: "#0b74ff", color: "#fff", padding: 10 }}>Giriş</button>
      </form>
      {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
      <div style={{ marginTop: 12, color: "#666" }}>
        Demo kullanıcılar: (sunum için) admin/muhasebe/personel — parolaları (sunum) 12345. (Bu bilgi **UI'da gösterilmez**.)
      </div>
    </div>
  );
}
