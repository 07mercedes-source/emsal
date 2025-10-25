// pages/depo/index.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useLanguage } from "../../context/LanguageContext";

export default function DepoPage() {
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [newRow, setNewRow] = useState({ sku: "", name: "", category: "", unit: "", qty: 0, cost: 0 });

  const categories = ["Tümü", ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p =>
    (category === "Tümü" || p.category === category) &&
    (filter === "" || p.name.toLowerCase().includes(filter.toLowerCase()) || p.sku.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleAdd = () => {
    if (!newRow.name) return alert("Ürün adı gerekli");
    addProduct(newRow);
    setNewRow({ sku: "", name: "", category: "", unit: "", qty: 0, cost: 0 });
  };

  return (
    <div>
      <h2>{t("products")}</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <input placeholder="Ara..." value={filter} onChange={e=>setFilter(e.target.value)} />
          <select value={category} onChange={e=>setCategory(e.target.value)} style={{ marginLeft: 8 }}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <button onClick={()=>window.location.href="/depo/teslim"}>📦 {t("teslim_al")}</button>
          <button onClick={()=>window.location.href="/depo/cikis"} style={{ marginLeft: 8 }}>🚚 {t("sevk")}</button>
          <button onClick={()=>window.location.href="/depo/rapor"} style={{ marginLeft: 8 }}>📄 {t("rapor")}</button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Yeni Ürün Ekle (satır düzeni)</strong>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input placeholder="SKU" value={newRow.sku} onChange={e=>setNewRow({...newRow, sku:e.target.value})} />
          <input placeholder="Ürün Adı" value={newRow.name} onChange={e=>setNewRow({...newRow, name:e.target.value})} />
          <input placeholder="Kategori" value={newRow.category} onChange={e=>setNewRow({...newRow, category:e.target.value})} />
          <input placeholder="Birim" value={newRow.unit} onChange={e=>setNewRow({...newRow, unit:e.target.value})} />
          <input placeholder="Miktar" type="number" value={newRow.qty} onChange={e=>setNewRow({...newRow, qty:Number(e.target.value)})} />
          <input placeholder="Maliyet (€)" type="number" value={newRow.cost} onChange={e=>setNewRow({...newRow, cost:Number(e.target.value)})} />
          <button onClick={handleAdd}>➕ Yeni Ürün Ekle</button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eef4ff" }}>
            <th>SKU</th><th>Ürün</th><th>Kategori</th><th>Birim</th><th>Miktar</th><th>Maliyet (€)</th><th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.unit}</td>
              <td>{p.qty}</td>
              <td>{Number(p.cost).toFixed(2)}</td>
              <td>
                <button onClick={()=>{ const n = prompt("Yeni miktar", p.qty); if (n!=null) updateProduct(p.id, { qty: Number(n) });}}>Düzenle</button>
                <button onClick={()=>{ if(confirm("Silinsin mi?")) removeProduct(p.id); }} style={{ marginLeft: 8 }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
