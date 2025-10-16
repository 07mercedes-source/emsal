// pages/restaurant/index.js

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

const restaurants = [
    { id: 1, name: "Restaurant 1", icon: '🍴', description: "Günlük ciro ve finansal hareket takibi." },
    { id: 2, name: "Restaurant 2", icon: '🍽️', description: "Günlük ciro ve finansal hareket takibi." },
];

export default function RestaurantSelectionPage() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {t("restaurant")} Modülü
            </h1>
            <p className="text-gray-500 mb-8">Lütfen işlem yapmak istediğiniz restoranı seçin.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants.map((r) => (
                    <Link 
                        key={r.id} 
                        href={`/restaurant/${r.id}`} 
                        className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] border border-gray-100"
                    >
                        <div className="text-5xl mb-4">{r.icon}</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{r.name}</h2>
                        <p className="text-gray-500">{r.description}</p>
                    </Link>
                ))}
            </div>
            
            <div className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded">
                Not: Seçim yapıldıktan sonra, tüm işlemler (gelir/gider ve raporlama) dinamik sayfa yapısı (<code>/restaurant/[id].js</code>) üzerinden yönetilir.
            </div>
        </div>
    );
}