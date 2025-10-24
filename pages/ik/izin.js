// pages/ik/izin.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function IzinPage() {
  const { submitIzin } = useIK();
  const [form, setForm] = useState({ id: "", name: "", from: "", to: "", note: "" });

  function send() {
    if (!form.id || !form.from || !form.to) return alert("Gerekli alanlar eksik");
    submitIzin({ ...form, date: new Date().toISOString() });
    alert("İzin talebi gönderildi.");
    setForm({ id: "", name: "", from: "", to: "", note: "" });
  }

  return (
    <div>
      <h1>Yıllık İzin Talebi</h1>
      <div style={{ display: "grid", gap: 8, width: 420 }}>
        <input placeholder="Sicil No" value={form.id} onChange={(e) => setForm(s => ({ ...s, id: e.target.value }))} />
        <input placeholder="Ad Soyad" value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))} />
        <label>Başlangıç</label>
        <input type="date" value={form.from} onChange={(e) => setForm(s => ({ ...s, from: e.target.value }))} />
        <label>Bitiş</label>
        <input type="date" value={form.to} onChange={(e) => setForm(s => ({ ...s, to: e.target.value }))} />
        <textarea placeholder="Açıklama" value={form.note} onChange={(e) => setForm(s => ({ ...s, note: e.target.value }))} />
        <button onClick={send} style={{ padding: 8, background: "#0b1220", color: "#fff" }}>Gönder</button>
      </div>
    </div>
  );
}
