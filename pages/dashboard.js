// pages/dashboard.js
import { useLanguage } from "../context/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();
  return (
    <div className="card">
      <h1 style={{fontSize:22, marginBottom:8}}>{t("home") || "Anasayfa"}</h1>
      <p>Modüller: Depo, İnsan Kaynakları, Restaurantlar. Menüden seçin.</p>
    </div>
  );
}
