// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth() || {};
  const { t, setLang, lang } = useLanguage() || {};
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("de-DE", { hour12: false }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <nav className="w-full bg-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logo.png" alt="EMSAL" className="h-14 rounded-md bg-white p-1" />
          <div className="font-bold text-xl text-sky-100">EMSAL GmbH</div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/"><button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600">{t?.("home")}</button></Link>
          <Link href="/depo"><button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600">{t?.("depo")}</button></Link>
          <Link href="/ik"><button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600">{t?.("ik")}</button></Link>
          <button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600" onClick={() => router.push("/restaurant/1")}>Restaurant 1</button>
          <button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600" onClick={() => router.push("/restaurant/2")}>Restaurant 2</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sky-100 font-medium">{user ? `${user.name} • ${user.role}` : ""}</div>
          <div className="text-sm text-slate-200">{time}</div>

          <div className="flex gap-2">
            <button className={`px-2 py-1 rounded ${lang === "tr" ? "bg-sky-500" : "bg-transparent"}`} onClick={() => setLang("tr")}>🇹🇷</button>
            <button className={`px-2 py-1 rounded ${lang === "en" ? "bg-sky-500" : "bg-transparent"}`} onClick={() => setLang("en")}>🇬🇧</button>
            <button className={`px-2 py-1 rounded ${lang === "de" ? "bg-sky-500" : "bg-transparent"}`} onClick={() => setLang("de")}>🇩🇪</button>
          </div>

          {user ? (
            <button className="px-3 py-2 bg-red-500 rounded text-white" onClick={() => { logout(); router.push("/login"); }}>{t?.("logout")}</button>
          ) : (
            <Link href="/login"><button className="px-3 py-2 bg-emerald-500 rounded text-white">{t?.("login")}</button></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
