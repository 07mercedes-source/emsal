// components/RightPanel.js
import React from "react";
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { restaurant1, restaurant2, totalsByMonth } = useRestaurant();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const totals1 = totalsByMonth("1", month, year);
  const totals2 = totalsByMonth("2", month, year);

  return (
    <aside style={{ width: 280, padding: 16, borderLeft: "1px solid #e6eef8", background: "#f8fafc", position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>🌤️ Berlin Hava Durumu</div>
        <div>18°C, Açık</div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>📅 Takvim</div>
        <div style={{ marginTop: 8 }}>{today.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
      </div>

      <div>
        <div style={{ fontWeight: 700 }}>📊 Restaurant Ciro (Aktif Ay)</div>
        <div style={{ marginTop: 8 }}>
          <div>Restaurant 1: €{totals1?.income?.toLocaleString() || 0}</div>
          <div>Restaurant 2: €{totals2?.income?.toLocaleString() || 0}</div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>Toplam: €{((totals1?.income || 0) + (totals2?.income || 0)).toLocaleString()}</div>
        </div>
      </div>
    </aside>
  );
}
