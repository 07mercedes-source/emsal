// pages/depo/rapor.js
import { useState } from "react";

export default function DepoRapor(){
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const generate = () => {
    alert(`Rapor oluştur: ${from} -> ${to} (demo). Gerçek uygulamada veri filtrelenir ve dosya indirilir.`);
  };

  return (
    <div>
      <div className="top-row">
        <h2>📄 Depo Raporları</h2>
      </div>

      <div style={{display:"flex", gap:8, alignItems:"center", marginBottom:12}}>
        <input type="date" className="input-cell" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="input-cell" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="btn" style={{background:"#2563eb", color:"#fff"}} onClick={generate}>📥 Excel / PDF Al</button>
      </div>

      <p style={{color:"#6b7280"}}>Bu demo sayfa: gerçek verileri sunucu / local state'den filtreleyip dışa aktarır.</p>
    </div>
  );
}
