// pages/index.js
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="container">
      <h1 className="h1">Hoşgeldiniz</h1>
      <p className="small-muted">EMSAL yönetim paneline giriş yapın</p>

      <div style={{display:"flex", gap:16, marginTop:20}}>
        <Link href="/depo"><button className="card" style={{minWidth:220, cursor:"pointer"}}>{t("depo")}</button></Link>
        <Link href="/ik"><button className="card" style={{minWidth:220}}>{t("ik")}</button></Link>
        <Link href="/restaurant/1"><button className="card" style={{minWidth:220}}>Restaurant 1</button></Link>
        <Link href="/restaurant/2"><button className="card" style={{minWidth:220}}>Restaurant 2</button></Link>
      </div>

      {!user && <div style={{marginTop:20}} className="small-muted">Lütfen giriş yapınız.</div>}
    </div>
  );
}
