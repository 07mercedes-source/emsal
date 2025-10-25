// components/RightPanel.js
import React, { useEffect, useState } from "react";
import { useRestaurantData } from "../context/RestaurantContext";

export default function RightPanel() {
  const { restaurant1, restaurant2 } = useRestaurantData();
  const [berlinWeather] = useState({ temp: 18, text: "Açık" });
  const [month, setMonth] = useState("");
  const [r1Total, setR1Total] = useState(0);
  const [r2Total, setR2Total] = useState(0);

  useEffect(() => {
    const now = new Date();
    setMonth(now.toLocaleString("tr-TR", { month: "long", year: "numeric" }));
  }, []);

  useEffect(() => {
    // toplam geliri sadece client-side hesapla
    const sum = (arr) => arr.filter(a => a.type === "revenue").reduce((s, e) => s + (e.amount || 0), 0);
    setR1Total(sum(restaurant1 || []));
    setR2Total(sum(restaurant2 || []));
  }, [restaurant1, restaurant2]);

  return (
    <aside className="w-72 fixed right-0 top-16 h-[calc(100vh-88px)] p-4 bg-white border-l overflow-auto">
      <div className="mb-4">
        <h3 className="font-semibold">🌤️ Berlin Hava Durumu</h3>
        <div className="text-sm">{berlinWeather.temp}°C, {berlinWeather.text}</div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">📅 Aylık Takvim</h3>
        <div className="text-sm">{month}</div>
      </div>

      <div>
        <h3 className="font-semibold">📊 Restaurant Ciro (Bu Ay)</h3>
        <div className="mt-2 text-sm">Restaurant 1: €{r1Total.toLocaleString('de-DE')}</div>
        <div className="text-sm">Restaurant 2: €{r2Total.toLocaleString('de-DE')}</div>
        <div className="text-sm mt-2 font-medium">Toplam: €{(r1Total + r2Total).toLocaleString('de-DE')}</div>
      </div>
    </aside>
  );
}
