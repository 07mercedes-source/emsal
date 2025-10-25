// pages/index.js
import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth() || {};

  const box = { width: 240, height: 120, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, cursor: "pointer", boxShadow: "0 6px 18px rgba(12, 74, 180, 0.06)" };

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{t("home")}</h1>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link href="/depo"><div style={{ ...box, background: "#0b74ff", color: "#fff" }}>{t("depo")}</div></Link>
        <Link href="/ik"><div style={{ ...box, background: "#06b6d4", color: "#fff" }}>{t("ik")}</div></Link>
        <Link href="/restaurant/1"><div style={{ ...box, background: "#f97316", color: "#fff" }}>Restaurant 1</div></Link>
        <Link href="/restaurant/2"><div style={{ ...box, background: "#10b981", color: "#fff" }}>Restaurant 2</div></Link>
      </div>

      <div style={{ marginTop: 24 }}>
        {user ? <div>Hoşgeldiniz, {user.name}</div> : <div>Giriş yapın.</div>}
      </div>
    </div>
  );
}
