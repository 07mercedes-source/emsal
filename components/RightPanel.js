// components/RightPanel.js
import React from "react";
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { restaurant1, restaurant2 } = useRestaurant();

  const sum = (arr, type = "gelir") => arr.filter((r) => r.type === type).reduce((s, it) => s + Number(it.amount || 0), 0);

  const today = new Date();
  const month = today.toLocaleString("default", { month: "long", day: "2-digit" });

  const r1Current = restaurant1.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const r2Current = restaurant2.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });

  return (
    <aside style={{ width: 300, padding: 16, borderLeft: "1px solid #e6eef8", background: "#f8fbff", position: "sticky", top: 72, height: "calc(100vh - 72px)" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700 }}>🌤️ Berlin Hava Durumu</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>18°C, Açık</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700 }}>📅 Aylık Takvim</div>
        <div style={{ marginTop: 8 }}>{month} {today.getFullYear()}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700 }}>📊 Restaurant Ciro (Bu Ay)</div>
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Restaurant 1</div>
            <div>€ {sum(r1Current, "gelir").toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Restaurant 2</div>
            <div>€ {sum(r2Current, "gelir").toLocaleString()}</div>
          </div>
          <hr style={{ margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
            <div>Toplam</div>
            <div>€ {(sum(r1Current, "gelir") + sum(r2Current, "gelir")).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
