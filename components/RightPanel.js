// components/RightPanel.js
import React from "react";
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { data, getMonthTotals } = useRestaurant();
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const r1 = getMonthTotals("1", year, month);
  const r2 = getMonthTotals("2", year, month);

  return (
    <aside style={{ width: 260, padding: 16, borderLeft: "1px solid #e6eef8", background: "#f8fbff", position: "sticky", top: 72, height: "calc(100vh - 140px)" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>🌤️ Berlin Hava Durumu</div>
      <div style={{ fontSize: 14, marginBottom: 16 }}>18°C, Hafif Güneşli</div>

      <div style={{ fontWeight: 700, marginBottom: 8 }}>📅 {now.toLocaleString("tr-TR", { month: "long", year: "numeric" })}</div>
      <div style={{ marginBottom: 16 }}>{now.getDate()} • Bugün</div>

      <div style={{ fontWeight: 700, marginBottom: 8 }}>📊 Aylık Ciro</div>
      <div style={{ fontSize: 14 }}>
        <div>Restaurant 1: €{(r1?.income || 0).toFixed(2)}</div>
        <div>Restaurant 2: €{(r2?.income || 0).toFixed(2)}</div>
        <div style={{ fontWeight: 700, marginTop: 8 }}>Toplam: €{((r1?.income || 0) + (r2?.income || 0)).toFixed(2)}</div>
      </div>
    </aside>
  );
}
