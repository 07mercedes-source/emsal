// pages/depo/teslim.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function Teslim() {
  const { products, updateProduct } = useDepo();
  const [id, setId] = useState("");
  const [qty, setQty] = useState(0);

  const find = products.find((p) => String(p.id) === String(id));
  const submit = () => {
    if (!find) return alert("Ürün bulunamadı");
    updateProduct(find.id, { stock: Number(find.stock || 0) + Number(qty) });
    alert("Teslim alındı");
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Ürün Teslim Alma</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Ürün ID" value={id} onChange={(e) => setId(e.target.value)} />
          <input placeholder="Adet" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
          <button onClick={submit}>Kaydet</button>
        </div>
        <div style={{ marginTop: 12 }}>{find ? <div>İsim: {find.name} — Stok: {find.stock}</div> : "Ürün bulunamadı"}</div>
      </div>
    </div>
  );
}
