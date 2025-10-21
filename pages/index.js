// pages/index.js
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { user, isReady } = useAuth();
  const { t } = useLanguage();

  const cardStyle = {
    background: "#fff",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(2,6,23,.06)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform .12s",
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 18 }}>{t("home")}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 16 }}>
        <Link href="/depo"><div style={cardStyle}><h3>Depo</h3><p>Stok, giriş-çıkış, raporlar</p></div></Link>
        <Link href="/ik"><div style={cardStyle}><h3>İnsan Kaynakları</h3><p>Personel, izin, avans</p></div></Link>
        <Link href="/restaurant/1"><div style={cardStyle}><h3>Restaurant 1</h3><p>Gelir gider girişleri</p></div></Link>
        <Link href="/restaurant/2"><div style={cardStyle}><h3>Restaurant 2</h3><p>Gelir gider girişleri</p></div></Link>
      </div>

      {!isReady ? <div>Yükleniyor...</div> : (user ? <div>Hoşgeldiniz {user.name}</div> : <div>Lütfen giriş yapınız.</div>)}
    </div>
  );
}
