// pages/depo/rapor.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoRapor(){
  const { products } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const exportCSV = () => {
    // Basit: filtreleme demo amaçlı (ürünler localde tarih tutmadığından tüm ürünleri veriyoruz)
    const rows = [["id","name","category","unit","qty","cost","price"]];
    products.forEach(p=>rows.push([p.id,p.name,p.category,p.unit,p.qty,p.cost,p.price]));
    const csv = rows.map(r=>r.map(v=>`"${(v||"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "depo_rapor.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="h1">Depo Raporlar</h2>
      <div className="card">
        <label className="small-muted">Başlangıç</label>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <label className="small-muted">Bitiş</label>
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <div style={{marginTop:8}}>
          <button className="button" onClick={exportCSV}>📥 Excel (CSV) olarak indir</button>
        </div>
      </div>
    </div>
  );
}
