// pages/ik/izin.js
import { useState } from "react";

export default function Izin() {
  const [form, setForm] = useState({ sicil: "", ad: "", from: "", to: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    alert("İzin talebi gönderildi (simüle).");
    setForm({ sicil: "", ad: "", from: "", to: "", msg: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Yıllık İzin Talebi</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <input value={form.sicil} onChange={(e)=>setForm({...form, sicil:e.target.value})} placeholder="Sicil" className="w-full p-2 border rounded mb-2" />
        <input value={form.ad} onChange={(e)=>setForm({...form, ad:e.target.value})} placeholder="Ad Soyad" className="w-full p-2 border rounded mb-2" />
        <div className="flex gap-2 mb-2">
          <input type="date" value={form.from} onChange={(e)=>setForm({...form, from:e.target.value})} className="p-2 border rounded flex-1" />
          <input type="date" value={form.to} onChange={(e)=>setForm({...form, to:e.target.value})} className="p-2 border rounded flex-1" />
        </div>
        <textarea value={form.msg} onChange={(e)=>setForm({...form, msg:e.target.value})} placeholder="Açıklama" className="w-full p-2 border rounded mb-2" />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Gönder</button>
      </form>
    </div>
  );
}
