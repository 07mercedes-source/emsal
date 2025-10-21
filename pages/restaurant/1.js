// pages/restaurant/1.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Restaurant1() {
  const { user, isReady } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // örnek günlük satırlar
    setRows([
      { id: 1, date: "2026-01-01", description: "Ciro 1", amount: 20000, type: "gelir" },
      { id: 2, date: "2026-01-01", description: "İçecek gideri", amount: 100, type: "gider" },
    ]);
  }, []);

  if (!isReady) return <div>Yükleniyor...</div>;
  if (!user) return <div>Lütfen giriş yapın</div>;

  const total = rows.reduce((s, r) => r.type === "gelir" ? s + Number(r.amount) : s - Number(r.amount), 0);

  return (
    <div>
      <h2 style={{ fontWeight: 800 }}>Restaurant 1</h2>
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
