// pages/restaurant/[id].js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRestaurant } from "../../context/RestaurantContext";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query; // "1" veya "2"
  const which = Number(id);
  const { addEntry, getForMonth } = useRestaurant();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  const rows = getForMonth(which, month, year);

  const totals = rows.reduce((acc, r) => {
    if (r.type === "gelir") acc.gelir += Number(r.amount || 0);
    else acc.gider += Number(r.amount || 0);
    return acc;
  }, { gelir: 0, gider: 0 });

  const [newRow, setNewRow] = useState({ date: new Date().toISOString().slice(0, 10), type: "gelir", description: "", amount: 0 });

  return (
    <div>
      <h2>Restaurant {which}</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <div style={{ marginLeft: "auto", fontWeight: 700 }}>
          Toplam Gelir: € {totals.gelir.toLocaleString()} — Gider: € {totals.gider.toLocaleString()} — Net: € {(totals.gelir - totals.gider).toLocaleString()}
        </div>
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input type="date" value={newRow.date} onChange={(e) => setNewRow((s) => ({ ...s, date: e.target.value }))} />
        <select value={newRow.type} onChange={(e) => setNewRow((s) => ({ ...s, type: e.target.value }))}>
          <option value="gelir">Gelir</option>
          <option value="gider">Gider</option>
        </select>
        <input placeholder="Açıklama" value={newRow.description} onChange={(e) => setNewRow((s) => ({ ...s, description: e.target.value }))} />
        <input type="number" placeholder="Tutar" value={newRow.amount} onChange={(e) => setNewRow((s) => ({ ...s, amount: e.target.value }))} />
        <button onClick={() => { addEntry(which, newRow); setNewRow({ date: new Date().toISOString().slice(0, 10), type: "gelir", description: "", amount: 0 }); }}>➕ Gelir/Gider Ekle</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <th style={{ padding: 8 }}>Tarih</th>
            <th>Açıklama</th>
            <th>Tür</th>
            <th>Tutar (€)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{ borderBottom: "1px solid #f5f7fb" }}>
              <td style={{ padding: 8 }}>{r.date}</td>
              <td>{r.description}</td>
              <td>{r.type}</td>
              <td>{Number(r.amount || 0).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
