// pages/depo/teslim.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoTeslim() {
  const { products, receiveProduct } = useDepo();
  const [idOrSku, setIdOrSku] = useState("");
  const [qty, setQty] = useState(1);
  const getBy = (v) => products.find((p) => p.sku === v || p.id === v);

  const prod = getBy(idOrSku);

  return (
    <div>
      <h2>Ürün Teslim Alma</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Ürün ID veya SKU girin" value={idOrSku} onChange={(e) => setIdOrSku(e.target.value)} />
        <input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: 100 }} />
        <button onClick={() => { if (!prod) return alert("Ürün bulunamadı"); receiveProduct({ id: prod.id, qty }); alert("Stok güncellendi"); }}>Teslim Al</button>
      </div>
      {prod && <div style={{ marginTop: 12 }}>Bulunan Ürün: <b>{prod.name}</b> — Şu an stok: {prod.stock}</div>}
    </div>
  );
}
