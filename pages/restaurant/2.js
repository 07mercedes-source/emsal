// pages/restaurant/2.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Restaurant2() {
  const { user, isReady } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([
      { id: 1, date: "2026-01-02", description: "Ciro Rest2", amount: 8000, type: "gelir" },
    ]);
  }, []);

  if (!isReady) return <div>Yükleniyor...</div>;
  if (!user) return <div>Lütfen giriş yapın</div>;

  const total = rows.reduce((s, r) => r.type === "gelir" ? s + Number(r.amount) : s - Number(r.amount), 0);

  return (
    <div>
      <h2 style={{ fontWeight: 800 }}>Restaurant 2</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Toplam Net Ciro: €{total.toLocaleString()}</strong>
      </div>
      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: 10 }}>Tarih</th>
              <th style={{ padding: 10 }}>Açıklama</th>
              <th style={{ padding: 10 }}>Tutar (€)</th>
              <th style={{ padding: 10 }}>Tip</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{r.date}</td>
                <td style={{ padding: 10 }}>{r.description}</td>
                <td style={{ padding: 10 }}>{Number(r.amount).toLocaleString("de-DE")}</td>
                <td style={{ padding: 10 }}>{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
