// pages/depo/index.js
import React, { useMemo, useState } from "react";
import { useDepo } from "../context/DepoContext";
import { useLanguage } from "../context/LanguageContext";

export default function DepoPage() {
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const { t } = useLanguage();
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (filter && !p.name.toLowerCase().includes(filter.toLowerCase()) && !p.sku.toLowerCase().includes(filter.toLowerCase())) return false;
      return true;
    });
  }, [products, filter, category]);

  // basit inline adding row (excel gibi: tek satır ekleme)
  const [newRow, setNewRow] = useState({ name: "", category: "kuru gıda", unit: "adet", stock: 0, cost: "", sell: "" });

  return (
    <div>
      <h2>Ürün Listesi</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Ara (isim veya SKU)" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Tümü</option>
          <option value="içecek">İçecek</option>
          <option value="kuru gıda">Kuru Gıda</option>
          <option value="alkol">Alkol</option>
          <option value="et">Et</option>
        </select>
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input style={{ flex: 1 }} placeholder="Ürün adı" value={newRow.name} onChange={(e) => setNewRow((s) => ({ ...s, name: e.target.value }))} />
        <input placeholder="Adet" value={newRow.stock} onChange={(e) => setNewRow((s) => ({ ...s, stock: e.target.value }))} />
        <select value={newRow.category} onChange={(e) => setNewRow((s) => ({ ...s, category: e.target.value }))}>
          <option value="kuru gıda">Kuru Gıda</option>
          <option value="içecek">İçecek</option>
          <option value="alkol">Alkol</option>
          <option value="et">Et</option>
        </select>
        <button onClick={() => { addProduct(newRow); setNewRow({ name: "", category: "kuru gıda", unit: "adet", stock: 0, cost: "", sell: "" }); }}>➕ Ürün Ekle</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
            <th style={{ padding: 8 }}>SKU</th>
            <th>Adı</th>
            <th>Kategori</th>
            <th>Stok</th>
            <th>Birim</th>
            <th>Maliyet (€)</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: 8 }}>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.unit}</td>
              <td>{Number(p.cost || 0).toFixed(2)}</td>
              <td>
                <button onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}>+1</button>
                <button onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}>-1</button>
                <button onClick={() => removeProduct(p.id)} style={{ marginLeft: 6 }}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
