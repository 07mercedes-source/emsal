// pages/restaurant1.js
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";

const KEY = "emsal_rest1_v1";

export default function Restaurant1() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const s = localStorage.getItem(KEY);
    if (s) setRows(JSON.parse(s));
    else {
      const init = [{ id: 1, date: "2026-01-01", desc: "Restaurant ciro", amount: 20000 }, { id: 2, date: "2026-01-01", desc: "İçecek gideri", amount: 100 }];
      setRows(init); localStorage.setItem(KEY, JSON.stringify(init));
    }
  }, []);

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(rows)), [rows]);

  const isAdmin = user && user.role === "admin";
  const add = () => {
    const date = prompt("Tarih (YYYY-MM-DD):", new Date().toISOString().slice(0, 10));
    const desc = prompt("Açıklama:", "Ciro");
    const amount = Number(prompt("Tutar:")) || 0;
    setRows(prev => [...prev, { id: prev.length ? Math.max(...prev.map(r => r.id)) + 1 : 1, date, desc, amount }]);
  };
  const remove = (id) => { if (!confirm("Silinsin mi?")) return; setRows(prev => prev.filter(r => r.id !== id)); };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2>Restaurant 1</h2>
      <div style={{ marginBottom: 12 }}>{isAdmin && <button onClick={add}>Satır Ekle</button>}</div>
      <div style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
        <table style={{ width: "100%" }}>
          <thead><tr><th style={th}>Tarih</th><th style={th}>Açıklama</th><th style={th}>Tutar (€)</th>{isAdmin && <th style={th}>İşlem</th>}</tr></thead>
          <tbody>{rows.map(r => <tr key={r.id}><td style={td}>{r.date}</td><td style={td}>{r.desc}</td><td style={td}>{r.amount}</td>{isAdmin && <td style={td}><button onClick={() => remove(r.id)} style={{ background: "#ef4444" }}>Sil</button></td>}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: 8, borderBottom: "1px solid #eef2f7" };
const td = { padding: 8, borderBottom: "1px solid #f3f6f9" };
