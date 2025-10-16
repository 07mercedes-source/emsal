import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LeaveForm() {
  const router = useRouter();
  const [form, setForm] = useState({ sicil: "", name: "", from: "", to: "", note: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `İzin Talebi:\nSicil: ${form.sicil}\nAd Soyad: ${form.name}\nTarih: ${form.from} - ${form.to}\nAçıklama: ${form.note}`;
    const mailto = `mailto:07mercedes@gmail.com?subject=İzin Talebi&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div style={{ maxWidth: 700, background: "#fff", padding: 16, borderRadius: 10 }}>
      <h2>Yıllık İzin Talebi</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Sicil No" value={form.sicil} onChange={e => setForm({...form, sicil: e.target.value})} style={input} />
        <input placeholder="Ad Soyad" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={input} />
        <label>Başlangıç: <input type="date" value={form.from} onChange={e => setForm({...form, from: e.target.value})} style={input} /></label>
        <label>Bitiş: <input type="date" value={form.to} onChange={e => setForm({...form, to: e.target.value})} style={input} /></label>
        <textarea placeholder="Açıklama" value={form.note} onChange={e => setForm({...form, note: e.target.value})} style={{...input, height: 120}} />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Gönder (E-posta)</button>
          <button type="button" style={{ marginLeft: 8 }} onClick={() => router.back()}>Geri</button>
        </div>
      </form>
    </div>
  );
}

const input = { display: "block", width: "100%", padding: 8, marginTop: 8, borderRadius: 8, border: "1px solid #eef2f7" };
