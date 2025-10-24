// pages/depo/index.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useAuth } from "../../context/AuthContext";

export default function DepoPage() {
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [newRow, setNewRow] = useState({ name: "", unit: "", stock: 0, cost: 0, expiry: "" });

  const saveNew = () => {
    if (!newRow.name) return alert("İsim girin");
    addProduct(newRow);
    setNewRow({ name: "", unit: "", stock: 0, cost: 0, expiry: "" });
  };

  const handleUpdate = (id, key, val) => updateProduct(id, { [key]: val });

  return (
    <div className="container">
      <div className="card">
        <h3>Ürün Listesi</h3>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button className="big-btn">Ürün Teslim Al</button>
          <button className="big-btn" style={{ background: "#ff8c00" }}>Sevk Et</button>
          <button className="big-btn" style={{ background: "#06b6d4" }}>Rapor</button>
        </div>

        <table className="table">
          <thead>
            <tr><th>ID</th><th>Ürün Adı</th><th>Birim</th><th>Stok</th><th>Maliyet (€)</th><th>SKT</th><th>İşlem</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><input style={{ width: 220 }} value={p.name} onChange={(e) => handleUpdate(p.id, "name", e.target.value)} /></td>
                <td><input style={{ width: 80 }} value={p.unit} onChange={(e) => handleUpdate(p.id, "unit", e.target.value)} /></td>
                <td><input style={{ width: 80 }} type="number" value={p.stock} onChange={(e) => handleUpdate(p.id, "stock", Number(e.target.value))} /></td>
                <td><input style={{ width: 90 }} type="number" value={p.cost} onChange={(e) => handleUpdate(p.id, "cost", Number(e.target.value))} /></td>
                <td><input style={{ width: 120 }} value={p.expiry} onChange={(e) => handleUpdate(p.id, "expiry", e.target.value)} /></td>
                <td>{isAdmin && <button onClick={() => removeProduct(p.id)}>Sil</button>}</td>
              </tr>
            ))}

            {isAdmin && (
              <tr>
                <td>—</td>
                <td><input style={{ width: 220 }} value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} /></td>
                <td><input style={{ width: 80 }} value={newRow.unit} onChange={(e) => setNewRow({ ...newRow, unit: e.target.value })} /></td>
                <td><input style={{ width: 80 }} type="number" value={newRow.stock} onChange={(e) => setNewRow({ ...newRow, stock: Number(e.target.value) })} /></td>
                <td><input style={{ width: 90 }} type="number" value={newRow.cost} onChange={(e) => setNewRow({ ...newRow, cost: Number(e.target.value) })} /></td>
                <td><input style={{ width: 120 }} value={newRow.expiry} onChange={(e) => setNewRow({ ...newRow, expiry: e.target.value })} /></td>
                <td><button onClick={saveNew}>Kaydet</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
