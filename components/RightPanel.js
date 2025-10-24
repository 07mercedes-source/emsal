// components/RightPanel.js
import React from "react";
import { useRestaurant } from "../context/RestaurantContext";

export default function RightPanel() {
  const { entries } = useRestaurant();

  // calculate monthly totals for restaurant1 and restaurant2 for current month
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const calc = (rid) => {
    const list = entries.filter((e) => e.restaurant === rid);
    const monthly = list.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
    const gelir = monthly.filter((m) => m.type === "gelir").reduce((s, x) => s + Number(x.amount || 0), 0);
    const gider = monthly.filter((m) => m.type === "gider").reduce((s, x) => s + Number(x.amount || 0), 0);
    return { gelir, gider, net: gelir - gider };
  };

  const r1 = calc(1);
  const r2 = calc(2);

  return (
    <aside className="right-panel card">
      <h4>🌤️ Berlin Hava Durumu</h4>
      <div>18°C, Açık</div>

      <hr style={{ margin: "10px 0" }} />

      <h4>📅 Aylık Takvim</h4>
      <div style={{ fontSize: 13 }}>{now.toLocaleString("tr-TR", { month: "long", year: "numeric" })}</div>
      <div style={{ marginTop: 8, fontSize: 13 }}>Bugün: {now.toLocaleDateString("de-DE")}</div>

      <hr style={{ margin: "10px 0" }} />

      <h4>📊 Restaurant Ciro</h4>
      <div style={{ fontWeight: 700 }}>R1 Toplam: €{r1.gelir.toLocaleString()}</div>
      <div style={{ fontWeight: 700 }}>R1 Gider: €{r1.gider.toLocaleString()}</div>
      <div style={{ marginBottom: 8 }}>Net: €{r1.net.toLocaleString()}</div>

      <div style={{ fontWeight: 700, marginTop: 8 }}>R2 Toplam: €{r2.gelir.toLocaleString()}</div>
      <div style={{ fontWeight: 700 }}>R2 Gider: €{r2.gider.toLocaleString()}</div>
      <div>Net: €{r2.net.toLocaleString()}</div>
    </aside>
  );
}
