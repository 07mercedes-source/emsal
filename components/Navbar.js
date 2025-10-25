import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth() || { user: null, logout: () => {} };
  const { t, setLang, lang } =
    useLanguage() || { t: (x) => x, setLang: () => {}, lang: "tr" };
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const navBtn = {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    margin: "0 4px",
    cursor: "pointer"
  };
  const smallBtn = { ...navBtn, padding: "4px 8px", fontSize: 14 };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0b1220",
        color: "#fff",
        padding: 12
      }}
    >
      <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
        <img src="/logo.png" style={{ height: 48, borderRadius: 6 }} />
      </div>
      <div>
        <Link href="/"><button style={navBtn}>{t("home")}</button></Link>
        <Link href="/depo"><button style={navBtn}>{t("depo")}</button></Link>
        <Link href="/ik"><button style={navBtn}>{t("ik")}</button></Link>
        <Link href="/restaurant/1"><button style={navBtn}>Restaurant 1</button></Link>
        <Link href="/restaurant/2"><button style={navBtn}>Restaurant 2</button></Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>{time.toLocaleString("de-DE", { hour12: false })}</span>
        <button style={smallBtn} onClick={() => setLang("tr")}>🇹🇷</button>
        <button style={smallBtn} onClick={() => setLang("en")}>🇬🇧</button>
        <button style={smallBtn} onClick={() => setLang("de")}>🇩🇪</button>
      </div>
    </nav>
  );
}
