// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t, setLang, lang } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const navBtn = {
    background: "#071036",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    margin: "0 6px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600
  };

  return (
    <nav style={{ background: "var(--nav)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={()=>router.push("/")}>
            <img src="/logo.png" alt="logo" style={{ height: 56, borderRadius:8, background:"#fff", padding:6 }} />
            <div style={{ marginLeft:8, color:"#cfe0ff", fontWeight:800 }}>EMSAL GmbH</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/"><button style={navBtn}>{t("home")}</button></Link>
          <Link href="/depo"><button style={navBtn}>{t("depo")}</button></Link>
          <Link href="/ik"><button style={navBtn}>{t("ik")}</button></Link>
          <button style={navBtn} onClick={()=>router.push("/restaurant/1")}>Restaurant 1</button>
          <button style={navBtn} onClick={()=>router.push("/restaurant/2")}>Restaurant 2</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ color:"#9fb2ff", fontWeight:600 }}>{user ? `${user.name} • ${user.role}` : ""}</div>
          <div style={{ color:"#cfd8ff", fontSize:13 }}>{time.toLocaleString("de-DE",{hour12:false})}</div>

          <div>
            <button className="flag-btn" onClick={()=>setLang("tr")} style={{background:lang==="tr"?"#0ea5e9":"transparent"}}>🇹🇷</button>
            <button className="flag-btn" onClick={()=>setLang("en")} style={{background:lang==="en"?"#0ea5e9":"transparent"}}>🇬🇧</button>
            <button className="flag-btn" onClick={()=>setLang("de")} style={{background:lang==="de"?"#0ea5e9":"transparent"}}>🇩🇪</button>
          </div>

          {user?(
            <button className="button" style={{background:"#ef4444"}} onClick={()=>{logout(); router.push("/login")}}>{t("logout")}</button>
          ):(
            <Link href="/login"><button className="button">{t("login")}</button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
