// pages/ik/advance.js
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Advance() {
  const router = useRouter();
  const [form, setForm] = useState({ sicil:"", name:"", amount:"", note:"" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send-mail", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ subject:"Avans Talebi", body: form }) });
      if (!res.ok) throw new Error("mail api yok");
      alert("Form gönderildi.");
    } catch (err) {
      console.log("Avans Talebi:", form);
      alert("Sunucu mail fonksiyonu yok. Form konsola yazıldı.");
    } finally { setLoading(false); router.push("/ik"); }
  };

  return (
    <div style={{ background:"#fff", padding:16, borderRadius:10 }}>
      <h2>Avans Talebi</h2>
      <form onSubmit={submit}>
        <input placeholder="Sicil" value={form.sicil} onChange={e=>setForm(s=>({...s, sicil:e.target.value}))} className="cell-input" />
        <input placeholder="Ad Soyad" value={form.name} onChange={e=>setForm(s=>({...s, name:e.target.value}))} className="cell-input" />
        <input placeholder="Tutar (€)" value={form.amount} onChange={e=>setForm(s=>({...s, amount:e.target.value}))} className="cell-input" />
        <textarea placeholder="Açıklama" value={form.note} onChange={e=>setForm(s=>({...s, note:e.target.value}))} className="cell-input" style={{ height:120 }} />
        <div style={{ marginTop:8 }}><button className="primary" type="submit" disabled={loading}>{loading ? "Gönderiliyor..." : "Gönder"}</button></div>
      </form>
    </div>
  );
}
