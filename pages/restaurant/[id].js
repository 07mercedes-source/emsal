// pages/restaurant/[id].js
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query; // '1' veya '2'
  const { movements, addMovement, removeMovement } = useRestaurant();

  // seçili ay/yıl state
  const now = new Date();
  const [selYear, setSelYear] = useState(now.getFullYear());
  const [selMonth, setSelMonth] = useState(now.getMonth() + 1);

  const monthKey = (y, m) => `${y}-${String(m).padStart(2, "0")}`;

  // filtre: seçili ay
  const filtered = useMemo(() => {
    if (!id) return [];
    const mk = monthKey(selYear, selMonth);
    return (movements || []).filter(m => String(m.restaurant) === String(id) && m.date.startsWith(mk));
  }, [movements, id, selYear, selMonth]);

  const totals = useMemo(() => {
    const sum = filtered.reduce((s, it) => it.type === "gelir" ? s + Number(it.amount) : s - Number(it.amount), 0);
    const gelir = filtered.filter(x => x.type === "gelir").reduce((s, x) => s + Number(x.amount), 0);
    const gider = filtered.filter(x => x.type === "gider").reduce((s, x) => s + Number(x.amount), 0);
    return { net: sum, gelir, gider };
  }, [filtered]);

  const handleAdd = (type) => {
    const today = new Date();
    const item = {
      date: today.toISOString().slice(0, 10),
      description: type === "gelir" ? "Gelir" : "Gider",
      amount: type === "gelir" ? 0 : 0,
      type,
      restaurant: String(id),
    };
    addMovement(item);
  };

  return (
    <div>
      <h2 style={{ fontWeight: 800 }}>Restaurant {id}</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0" }}>
        <div>
          <label>Ay:</label>
          <select value={selMonth} onChange={(e) => setSelMonth(Number(e.target.value))} style={{ marginLeft: 8 }}>
            {Array.from({ length: 12 }).map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
          </select>
        </div>

        <div>
          <label>Yıl:</label>
          <select value={selYear} onChange={(e) => setSelYear(Number(e.target.value))} style={{ marginLeft: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => <option key={i} value={2023 + i}>{2023 + i}</option>)}
          </select>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => handleAdd("gelir")} style={{ background: "#10b981", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>➕ Gelir Ekle</button>
          <button onClick={() => handleAdd("gider")} style={{ background: "#fb923c", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>➖ Gider Ekle</button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Toplam Gelir: €{Number(totals.gelir).toLocaleString("de-DE")}</strong> &nbsp;
        <strong>Toplam Gider: €{Number(totals.gider).toLocaleString("de-DE")}</strong> &nbsp;
        <strong>Net: €{Number(totals.net).toLocaleString("de-DE")}</strong>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: 10 }}>Tarih</th>
              <th style={{ padding: 10 }}>Açıklama</th>
              <th style={{ padding: 10 }}>Tutar (€)</th>
              <th style={{ padding: 10 }}>Tip</th>
              <th style={{ padding: 10 }}>Sil</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{r.date}</td>
                <td style={{ padding: 10 }}>{r.description}</td>
                <td style={{ padding: 10 }}>{Number(r.amount).toLocaleString("de-DE")}</td>
                <td style={{ padding: 10 }}>{r.type}</td>
                <td style={{ padding: 10 }}><button onClick={() => removeMovement(r.id)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6 }}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
