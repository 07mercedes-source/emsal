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

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const navBtn = "bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition font-semibold";
  const actionBtn = "px-3 py-2 rounded-md font-semibold border border-slate-400 hover:bg-slate-100 transition";

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
        <img src="/logo.png" alt="EMSAL" className="h-12 bg-white rounded-lg p-1" />
        <span className="font-extrabold text-xl text-sky-300">EMSAL GmbH</span>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/"><button className={navBtn}>{t("home")}</button></Link>
        <Link href="/depo"><button className={navBtn}>{t("depo")}</button></Link>
        <Link href="/ik"><button className={navBtn}>{t("ik")}</button></Link>
        <button className={navBtn} onClick={() => router.push("/restaurant/1")}>Restaurant 1</button>
        <button className={navBtn} onClick={() => router.push("/restaurant/2")}>Restaurant 2</button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sky-200 font-semibold">
          {user ? `${user.name} • ${user.role || "Personel"}` : ""}
        </span>
        <span className="text-sm text-slate-400">{time.toLocaleString("de-DE", { hour12: false })}</span>

        <div className="flex gap-1">
          <button className={`${actionBtn} ${lang === "tr" ? "bg-sky-500 text-white" : ""}`} onClick={() => setLang("tr")}>🇹🇷</button>
          <button className={`${actionBtn} ${lang === "en" ? "bg-sky-500 text-white" : ""}`} onClick={() => setLang("en")}>🇬🇧</button>
          <button className={`${actionBtn} ${lang === "de" ? "bg-sky-500 text-white" : ""}`} onClick={() => setLang("de")}>🇩🇪</button>
        </div>

        {user ? (
          <button onClick={() => { logout(); router.push("/login"); }} className="bg-red-600 px-3 py-2 rounded-md text-white hover:bg-red-700">
            {t("logout")}
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-emerald-600 px-3 py-2 rounded-md text-white hover:bg-emerald-700">
              {t("login")}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
