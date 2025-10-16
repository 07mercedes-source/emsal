// pages/index.js
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Home(){
  const { t } = useLanguage();
  return (
    <div>
      <h1 style={{fontSize:28, fontWeight:800, marginBottom:8}}>Hoşgeldiniz</h1>
      <p style={{color:"#4b5563", marginBottom:18}}>EMSAL GmbH yönetim paneline hoşgeldiniz.</p>

      <div className="home-grid">
        <Link href="/depo" className="module-card">
          <div className="module-title">📦 Depo</div>
          <div className="module-desc">Stok, teslim alma, sevk ve raporlar</div>
        </Link>

        <Link href="/ik" className="module-card">
          <div className="module-title">👥 İnsan Kaynakları</div>
          <div className="module-desc">Personel listesi, izin & avans talepleri</div>
        </Link>

        <Link href="/restaurant/1" className="module-card">
          <div className="module-title">🍽 Restaurant 1</div>
          <div className="module-desc">Günlük gelir/gider, aylık rapor</div>
        </Link>

        <Link href="/restaurant/2" className="module-card">
          <div className="module-title">🍽 Restaurant 2</div>
          <div className="module-desc">Günlük gelir/gider, aylık rapor</div>
        </Link>
      </div>
    </div>
  );
}
