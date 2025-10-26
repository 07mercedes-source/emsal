// 📁 pages/restaurant/[id].js
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth() || {};
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    // örnek menü yüklemesi
    setMenu([
      { name: "Izgara Tavuk", price: "12.90€" },
      { name: "Köri Soslu Tavuk", price: "13.50€" },
      { name: "Et Döner", price: "14.20€" },
      { name: "Sebze Menü", price: "10.80€" },
    ]);
    setLoading(false);
  }, [router.isReady]);

  if (loading) return <p className="text-center text-gray-400 mt-10">Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">Restaurant {id}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item, i) => (
          <div key={i} className="bg-white p-4 shadow-md rounded-xl border border-slate-200">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-slate-600">{item.price}</p>
          </div>
        ))}
      </div>
      <footer className="text-center mt-8 text-sm text-slate-500">
        © {new Date().getFullYear()} EMSAL GmbH. All rights reserved.
      </footer>
    </div>
  );
}
