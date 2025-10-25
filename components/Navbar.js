// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const { t, setLang, lang } = useLanguage() || { t: (x) => x, setLang: () => {}, lang: "tr" };
  const [time, setTime] = useState(new Date());

  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);

  const navBtn = {
    background: "#0f172a", color: "#fff", border: "none", padding: "8px 12px", margin: "0 6px", borderRadius: 8, cursor: "pointer", fontWeight: 600
  };

  const actionBtn = { padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 };

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: "#0b1220", color: "#fff", position: "sticky", top: 0, zIndex: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => router.push("/")}>
        <img src="/logo.png" alt="EMSAL" style={{ height: 72, background: "#fff", borderRadius: 8, padding: 6 }} />
        <div style={{ fontWeight: 800, color: "#cfe0ff", fontSize: 20 }}>EMSAL GmbH</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Link href="/"><button style={navBtn}>{t("home")}</button></Link>
        <Link href="/depo"><button style={navBtn}>{t("depo")}</button></Link>
        <Link href="/ik"><button style={navBtn}>{t("ik")}</button></Link>
        <button style={navBtn} onClick={() => router.push("/restaurant/1")}>Restaurant 1</button>
        <button style={navBtn} onClick={() => router.push("/restaurant/2")}>Restaurant 2</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "#9fb2ff", fontWeight: 600 }}>{user ? `${user.name} • ${user.role}` : ""}</div>
        <div style={{ color: "#cfd8ff", fontSize: 13 }}>{time.toLocaleString("de-DE", { hour12: false })}</div>

        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ ...actionBtn, background: lang === "tr" ? "#0ea5e9" : "transparent" }} onClick={() => setLang("tr")}>🇹🇷</button>
          <button style={{ ...actionBtn, background: lang === "en" ? "#0ea5e9" : "transparent" }} onClick={() => setLang("en")}>🇬🇧</button>
          <button style={{ ...actionBtn, background: lang === "de" ? "#0ea5e9" : "transparent" }} onClick={() => setLang("de")}>🇩🇪</button>
        </div>

        {user ? <button style={{ ...actionBtn, background: "#ef4444", color: "#fff" }} onClick={() => { logout(); router.push("/login"); }}>{t("logout")}</button> :
          <Link href="/login"><button style={{ ...actionBtn, background: "#10b981", color: "#fff" }}>{t("login")}</button></Link>
        }
      </div>
    </nav>
  );
}
