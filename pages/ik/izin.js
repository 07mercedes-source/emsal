// pages/ik/izin.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function Izin(){
  const { submitIzin } = useIK();
  const [sicil, setSicil] = useState("");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmit = (e) => {
    e?.preventDefault();
    submitIzin({ sicil, name, from, to, desc });
    alert("İzin talebi gönderildi (demo).");
  };

  return (
    <div className="card">
      <h2>Yıllık İzin Talebi</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Sicil no" value={sicil} onChange={e=>setSicil(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <input placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <div style={{ display:"flex", gap:8 }}>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 border rounded w-full mb-2" />
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 border rounded w-full mb-2" />
        </div>
        <textarea placeholder="Açıklama" value={desc} onChange={e=>setDesc(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <button className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
}
