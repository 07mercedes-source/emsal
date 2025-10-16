// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar(){
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t, setLang } = useLanguage();

  const [time, setTime] = useState("");

  useEffect(()=> {
    const update = () => setTime(new Date().toLocaleString("de-DE", { hour12:false }));
    update();
    const i = setInterval(update, 1000);
    return ()=> clearInterval(i);
  },[]);

  return (
    <nav className="navbar">
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div style={{display:"flex", alignItems:"center", gap:10, cursor:"pointer"}} onClick={()=>router.push("/")}>
          <img src="/logo.png" alt="logo" style={{height:48, background:"#fff", padding:4, borderRadius:6}} />
          <div style={{fontWeight:700}}>EMSAL GmbH</div>
        </div>
      </div>

      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        <Link href="/" className="nav-link">🏠 {t("home")}</Link>
        <Link href="/depo" className="nav-link">📦 {t("depo")}</Link>
        <Link href="/ik" className="nav-link">👥 {t("ik")}</Link>
        <Link href="/restaurant/1" className="nav-link">🍽 Restaurant 1</Link>
        <Link href="/restaurant/2" className="nav-link">🍽 Restaurant 2</Link>
      </div>

      <div style={{display:"flex", alignItems:"center", gap:8}}>
        <div style={{color:"#9fb2ff", fontWeight:600}}>{user ? `${user.name} • ${user.role}` : ""}</div>
        <div style={{color:"#cfd8ff", fontSize:13}}>{time}</div>

        <button className="btn" style={{background:"transparent", border:"1px solid rgba(255,255,255,0.06)", color:"#fff", padding:"6px 8px", borderRadius:8}} onClick={()=>setLang("tr")}>🇹🇷</button>
        <button className="btn" style={{background:"transparent", border:"1px solid rgba(255,255,255,0.06)", color:"#fff", padding:"6px 8px", borderRadius:8}} onClick={()=>setLang("en")}>🇬🇧</button>
        <button className="btn" style={{background:"transparent", border:"1px solid rgba(255,255,255,0.06)", color:"#fff", padding:"6px 8px", borderRadius:8}} onClick={()=>setLang("de")}>🇩🇪</button>

        {user ? (
          <button className="btn btn-red" onClick={()=>{ logout(); router.push("/login"); }}>🔒 Çıkış</button>
        ) : (
          <Link href="/login" className="btn btn-green">🔐 {t("login")}</Link>
        )}
      </div>
    </nav>
  );
}
