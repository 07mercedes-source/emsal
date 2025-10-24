// pages/depo/cikis.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function Cikis() {
  const { products, updateProduct } = useDepo();
  const [id, setId] = useState("");
  const [qty, setQty] = useState(0);
  const [toRest, setToRest] = useState(1);

  const find = products.find((p) => String(p.id) === String(id));
  const submit = () => {
    if (!find) return alert("Ürün bulunamadı");
    if (Number(find.stock) < Number(qty)) return alert("Yetersiz stok");
    updateProduct(find.id, { stock: Number(find.stock) - Number(qty) });
    alert(`Sevk tamamlandı → Restoran ${toRest}`);
    // burada sevk irsaliyesi oluşturma butonu / yazdırma eklenebilir
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Ürün Sevk Et</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Ürün ID" value={id} onChange={(e) => setId(e.target.value)} />
          <input placeholder="Adet" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
          <select value={toRest} onChange={(e) => setToRest(Number(e.target.value))}>
            <option value={1}>Restaurant 1</option>
            <option value={2}>Restaurant 2</option>
          </select>
          <button onClick={submit}>Sevk Et ve İrsaliye</button>
        </div>
        <div style={{ marginTop: 12 }}>{find ? <div>İsim: {find.name} — Stok: {find.stock}</div> : "Ürün bulunamadı"}</div>
      </div>
    </div>
  );
}
