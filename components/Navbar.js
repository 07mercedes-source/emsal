// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const auth = useAuth();
  const { user, logout } = auth || { user: null, logout: () => {} };
  const langCtx = useLanguage();
  const { t = (k) => k, setLang = () => {}, lang = "tr" } = langCtx || {};

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const navBtnStyle = { padding: "8px 10px", borderRadius: 8, background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontWeight: 600 };

  return (
    <nav style={{ background: "var(--primary)", color: "#fff", padding: "12px 20px", position: "sticky", top: 0, zIndex: 1000 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="logo" style={{ height: 56, background: "#fff", padding: 6, borderRadius:8 }} />
          <div style={{ fontWeight: 800, fontSize: 18 }}>EMSAL GmbH</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/dashboard"> <button style={navBtnStyle}>{t("home") || "Anasayfa"}</button> </Link>
          <Link href="/depo"><button style={navBtnStyle}>{t("depo") || "Depo"}</button></Link>
          <Link href="/ik"><button style={navBtnStyle}>{t("ik") || "İnsan Kaynakları"}</button></Link>
          <Link href="/restaurant/1"><button style={navBtnStyle}>Restaurant 1</button></Link>
          <Link href="/restaurant/2"><button style={navBtnStyle}>Restaurant 2</button></Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ color: "#cfe0ff", fontWeight: 600 }}>{user ? `${user.name} • ${user.role || "Personel"}` : (router.isReady ? "" : "Yükleniyor...")}</div>
          <div style={{ color:"#cfe0ff", fontSize:13 }}>{time.toLocaleString("de-DE", { hour12: false })}</div>

          <div style={{ display:"flex", gap:6 }}>
            <button onClick={() => setLang("tr")} style={{ ...navBtnStyle, background: lang==="tr" ? "rgba(255,255,255,0.08)" : "transparent" }}>🇹🇷</button>
            <button onClick={() => setLang("en")} style={{ ...navBtnStyle, background: lang==="en" ? "rgba(255,255,255,0.08)" : "transparent" }}>🇬🇧</button>
            <button onClick={() => setLang("de")} style={{ ...navBtnStyle, background: lang==="de" ? "rgba(255,255,255,0.08)" : "transparent" }}>🇩🇪</button>
          </div>

          {user ? (
            <button className="btn" style={{ background:"#ef4444", color:"#fff"}} onClick={() => { logout(); router.push("/login"); }}>
              {t("logout") || "Çıkış"}
            </button>
          ) : (
            <Link href="/login"><button className="btn btn-primary"> {t("login") || "Giriş"} </button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
