// pages/index.js
import { useRouter } from "next/router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    // if not logged in, redirect to login
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{t("home")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded shadow hover:bg-slate-50 cursor-pointer" onClick={() => router.push('/depo')}>
          <h3 className="font-semibold">Depo</h3>
          <p className="text-sm">Stok ve sevk süreçleri</p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:bg-slate-50 cursor-pointer" onClick={() => router.push('/ik')}>
          <h3 className="font-semibold">İnsan Kaynakları</h3>
          <p className="text-sm">Personel, izin ve avans</p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:bg-slate-50 cursor-pointer" onClick={() => router.push('/restaurant/1')}>
          <h3 className="font-semibold">Restaurant 1 / 2</h3>
          <p className="text-sm">Ciro ve gider yönetimi</p>
        </div>
      </div>
    </div>
  );
}
