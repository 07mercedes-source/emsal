// pages/index.js
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{t("home")}</h1>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Link href="/depo"><button style={bigBtn}>{t("depo")}</button></Link>
        <Link href="/ik"><button style={bigBtn}>{t("ik")}</button></Link>
        <Link href="/restaurant/1"><button style={bigBtn}>Restaurant 1</button></Link>
        <Link href="/restaurant/2"><button style={bigBtn}>Restaurant 2</button></Link>
      </div>
      <p style={{ marginTop: 20 }}>Hoşgeldiniz{user ? `, ${user.name}` : ""}.</p>
    </div>
  );
}

const bigBtn = { padding: "20px 30px", fontSize: 18, borderRadius: 12, border: "none", background: "#0f172a", color: "#fff", cursor: "pointer" };
