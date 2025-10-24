// pages/ik/avans.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function AvansPage() {
  const { submitAvans } = useIK();
  const [form, setForm] = useState({ id: "", name: "", amount: "", note: "" });

  function send() {
    if (!form.id || !form.amount) return alert("Sicil ve tutar gerekli");
    const payload = { ...form, date: new Date().toISOString() };
    submitAvans(payload);
    alert("Avans talebi gönderildi (kaydedildi).");
    setForm({ id: "", name: "", amount: "", note: "" });
  }

  return (
    <div>
      <h1>Avans Talebi</h1>
      <div style={{ display: "grid", gap: 8, width: 420 }}>
        <input placeholder="Sicil No" value={form.id} onChange={(e) => setForm(s => ({ ...s, id: e.target.value }))} />
        <input placeholder="Ad Soyad" value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))} />
        <input placeholder="Tutar (€)" type="number" value={form.amount} onChange={(e) => setForm(s => ({ ...s, amount: e.target.value }))} />
        <textarea placeholder="Açıklama" value={form.note} onChange={(e) => setForm(s => ({ ...s, note: e.target.value }))} />
        <button onClick={send} style={{ padding: 8, background: "#0b1220", color: "#fff" }}>Gönder</button>
      </div>
    </div>
  );
}
