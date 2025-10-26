// pages/ik/avans.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function Avans(){
  const { submitAvans } = useIK();
  const [sicil, setSicil] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmit = (e) => {
    e?.preventDefault();
    submitAvans({ sicil, name, amount, desc });
    alert("Avans talebi gönderildi (demo).");
  };

  return (
    <div className="card">
      <h2>Avans Talebi</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Sicil no" value={sicil} onChange={e=>setSicil(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <input placeholder="Ad Soyad" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <input placeholder="Miktar" value={amount} onChange={e=>setAmount(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <textarea placeholder="Açıklama" value={desc} onChange={e=>setDesc(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <button className="btn btn-primary">Gönder</button>
      </form>
    </div>
  );
}
