// pages/depo/rapor.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoRapor() {
  const { products } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // demo: burada gerçek sevk/teslim tarihleri olmadığından, sadece ürün listesi export olayı hazır
  const exportExcel = () => {
    alert("Excel export (demo). Gerçek export için xlsx entegre edilir.");
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Depo Raporları</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <button onClick={exportExcel}>Excel</button>
        </div>
        <table className="table">
          <thead><tr><th>ID</th><th>Ürün Adı</th><th>Stok</th><th>Maliyet</th></tr></thead>
          <tbody>{products.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.stock}</td><td>€{p.cost}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
