// pages/ik/avans.js
import { useState } from "react";

export default function Avans() {
  const [form, setForm] = useState({ sicil: "", ad: "", from: "", to: "", miktar: 0, msg: "" });

  const submit = (e) => {
    e.preventDefault();
    // burada form server API'ye post edilebilir (/api/sendMail)
    alert("Avans talebi gönderildi (simüle).");
    setForm({ sicil: "", ad: "", from: "", to: "", miktar: 0, msg: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Avans Talebi</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <input value={form.sicil} onChange={(e)=>setForm({...form, sicil:e.target.value})} placeholder="Sicil" className="w-full p-2 border rounded mb-2" />
        <input value={form.ad} onChange={(e)=>setForm({...form, ad:e.target.value})} placeholder="Ad Soyad" className="w-full p-2 border rounded mb-2" />
        <input value={form.miktar} onChange={(e)=>setForm({...form, miktar:Number(e.target.value)})} placeholder="Miktar (€)" type="number" className="w-full p-2 border rounded mb-2" />
        <textarea value={form.msg} onChange={(e)=>setForm({...form, msg:e.target.value})} placeholder="Açıklama" className="w-full p-2 border rounded mb-2" />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Gönder</button>
      </form>
    </div>
  );
}
