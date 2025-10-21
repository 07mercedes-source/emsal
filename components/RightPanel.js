// components/RightPanel.js
import React, { useEffect, useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { movements } = useRestaurant();
  const [today, setToday] = useState(new Date());
  const [r1Total, setR1Total] = useState(0);
  const [r2Total, setR2Total] = useState(0);

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    // Aktif ay için toplayalım (bugünün ayı)
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const currentMonth = `${yyyy}-${mm}`;

    const r1 = movements.filter(m => m.restaurant === "1" && m.date.startsWith(currentMonth));
    const r2 = movements.filter(m => m.restaurant === "2" && m.date.startsWith(currentMonth));

    const sum = arr => arr.reduce((s, it) => it.type === "gelir" ? s + Number(it.amount) : s - Number(it.amount), 0);
    setR1Total(sum(r1));
    setR2Total(sum(r2));
  }, [movements, today]);

  return (
    <aside style={{
      position: "fixed",
      right: 0,
      top: 72, // navbar yüksekliğine göre ayarlandı
      width: 280,
      height: "calc(100vh - 72px)",
      background: "#ffffff",
      borderLeft: "1px solid #e6e6e6",
      padding: 16,
      overflowY: "auto",
      zIndex: 1000,
    }}>
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>📊 Anlık Durum</div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>🌤️ Berlin Hava Durumu</div>
        <div style={{ fontSize: 14 }}>18°C, Açık</div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>📅 Bugün</div>
        <div>{today.toLocaleDateString("de-DE")}</div>
      </div>

      <div>
        <div style={{ fontWeight: 700 }}>📈 Aylık Ciro (Aktif Ay)</div>
        <div>Restaurant 1: €{Number(r1Total).toLocaleString("de-DE")}</div>
        <div>Restaurant 2: €{Number(r2Total).toLocaleString("de-DE")}</div>
        <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>Not: Aktif ayı sayfadan değiştirebilirsiniz.</div>
      </div>
    </aside>
  );
}
