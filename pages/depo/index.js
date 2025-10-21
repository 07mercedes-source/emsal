// pages/depo/index.js
import React from "react";
import { useDepo } from "../../context/DepoContext";
import { useLanguage } from "../../context/LanguageContext";

export default function DepoPage() {
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const { t } = useLanguage();

  const handleAdd = () => {
    addProduct({ name: "", stock: 0, unit: "adet", cost: "0.00", expiry: "" });
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{t("products")}</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={handleAdd} style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8 }}>➕ Yeni Ürün Ekle</button>
        <div>
          {/* Btns: teslim/sevk - açılması için başka sayfalara yönlendir veya modal ekle */}
          <button style={{ padding: "8px 12px", marginRight: 8, background: "#10b981", color: "#fff", border: "none", borderRadius: 8 }}>📥 Teslim Alma</button>
          <button style={{ padding: "8px 12px", background: "#fb923c", color: "#fff", border: "none", borderRadius: 8 }}>🚚 Sevk Et</button>
        </div>
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f1f5f9" }}>
            <tr>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Ürün Adı</th>
              <th style={{ padding: 12 }}>Stok</th>
              <th style={{ padding: 12 }}>Birim</th>
              <th style={{ padding: 12 }}>Maliyet (€)</th>
              <th style={{ padding: 12 }}>Son Kullanma</th>
              <th style={{ padding: 12 }}>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{p.id}</td>
                <td style={{ padding: 10 }}><input value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input type="number" value={p.stock} onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })} style={{ width: 90 }} /></td>
                <td style={{ padding: 10 }}><input value={p.unit} onChange={(e) => updateProduct(p.id, { unit: e.target.value })} style={{ width: 80 }} /></td>
                <td style={{ padding: 10 }}><input value={p.cost} onChange={(e) => updateProduct(p.id, { cost: e.target.value })} style={{ width: 90 }} /></td>
                <td style={{ padding: 10 }}><input type="date" value={p.expiry || ""} onChange={(e) => updateProduct(p.id, { expiry: e.target.value })} /></td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => removeProduct(p.id)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6 }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
