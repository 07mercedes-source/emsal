// pages/depo/cikis.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoCikis() {
  const { products, shipProduct } = useDepo();
  const [idOrSku, setIdOrSku] = useState("");
  const [qty, setQty] = useState(1);
  const [restaurant, setRestaurant] = useState("Restaurant 1");

  const prod = products.find((p) => p.sku === idOrSku || p.id === idOrSku);

  const doShip = () => {
    if (!prod) return alert("Ürün bulunamadı");
    shipProduct({ id: prod.id, qty });
    // Basit sevk irsaliyesi
    const irsaliye = `Sevk İrsaliyesi\nÜrün: ${prod.name}\nMiktar: ${qty}\nRestoran: ${restaurant}\nTarih: ${new Date().toLocaleString()}`;
    const w = window.open("", "_blank");
    w.document.write(`<pre>${irsaliye}</pre>`);
    w.print();
    w.close();
  };

  return (
    <div>
      <h2>Ürün Sevk Et</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Ürün ID veya SKU" value={idOrSku} onChange={(e) => setIdOrSku(e.target.value)} />
        <input type="number" min={1} value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: 100 }} />
        <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
          <option>Restaurant 1</option>
          <option>Restaurant 2</option>
        </select>
        <button onClick={doShip}>Sevk Et & Yazdır</button>
      </div>
      {prod && <div style={{ marginTop: 12 }}>Bulunan Ürün: <b>{prod.name}</b> — Mevcut stok: {prod.stock}</div>}
    </div>
  );
}
