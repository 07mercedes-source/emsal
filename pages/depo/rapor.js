// pages/depo/rapor.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoRapor() {
  const { products } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Demo: sadece ürün listesi filtrelenmiş csv
  const exportCSV = () => {
    const rows = [
      ["Kategori","Ürün","Birim","Stok","Maliyet"],
      ...products.map(p=> [p.category,p.name,p.unit,p.stock,p.cost])
    ];
    const csv = rows.map(r=> r.map(c=> `"${(""+c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "depo_rapor.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2>Depo Raporları</h2>
      <div style={{ display:"flex", gap:8 }}>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 border rounded" />
        <button className="btn" onClick={exportCSV}>Excel (CSV) indir</button>
      </div>
    </div>
  );
}
