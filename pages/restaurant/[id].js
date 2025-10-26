import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth() || {};
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    setMenu([
      { name: "Izgara Tavuk", price: "12.90€" },
      { name: "Köri Soslu Tavuk", price: "13.50€" },
      { name: "Et Döner", price: "14.20€" },
      { name: "Sebze Menü", price: "10.80€" },
      { name: "Çorba", price: "4.50€" },
    ]);
  }, [router.isReady]);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Restaurant {id}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item, i) => (
          <div key={i} className="bg-white shadow-lg rounded-xl p-4 border border-slate-200 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-slate-600">{item.price}</p>
          </div>
        ))}
      </div>

      <footer className="text-center py-6 mt-10 text-sm text-gray-500 border-t border-slate-200">
        © {new Date().getFullYear()} EMSAL GmbH. All rights reserved.
      </footer>
    </div>
  );
}
