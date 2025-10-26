import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
        <img src="/logo.png" alt="EMSAL" className="h-10 rounded bg-white p-1" />
        <span className="font-bold text-xl text-blue-200">EMSAL GmbH</span>
      </div>

      <div className="flex gap-3">
        <Link href="/" className="hover:text-blue-400">{t("home")}</Link>
        <Link href="/depo" className="hover:text-blue-400">{t("depo")}</Link>
        <Link href="/ik" className="hover:text-blue-400">{t("ik")}</Link>
        <Link href="/restaurant/1" className="hover:text-blue-400">Restaurant 1</Link>
        <Link href="/restaurant/2" className="hover:text-blue-400">Restaurant 2</Link>
      </div>

      <div className="flex gap-2 items-center">
        {["tr", "en", "de"].map((dil) => (
          <button
            key={dil}
            onClick={() => setLang(dil)}
            className={`p-1 border rounded ${lang === dil ? "bg-blue-600" : "bg-slate-700"}`}
          >
            {dil === "tr" ? "🇹🇷" : dil === "en" ? "🇬🇧" : "🇩🇪"}
          </button>
        ))}
      </div>
    </nav>
  );
}
