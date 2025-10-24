// pages/depo/sevk.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useRouter } from "next/router";

export default function SevkEt() {
  const router = useRouter();
  const { products, shipProducts } = useDepo();
  // items to ship: array of {id, qty}
  const [items, setItems] = useState([{ id: "", qty: 0 }]);
  const [toRestaurant, setToRestaurant] = useState("Restaurant 1");

  function addRow() { setItems((s) => [...s, { id: "", qty: 0 }]); }
  function updateRow(idx, patch) { setItems((s) => s.map((r, i) => (i === idx ? { ...r, ...patch } : r))); }
  function removeRow(idx) { setItems((s) => s.filter((_, i) => i !== idx)); }

  function handleSubmit(e) {
    e?.preventDefault();
    const nonZero = items.filter((it) => it.id && it.qty > 0);
    if (!nonZero.length) return alert("En az bir ürün ekleyin");
    shipProducts({ items: nonZero, toRestaurant });
    alert("Sevk edildi. İrsaliye oluşturuluyor...");
    // basit irsaliye: pencereye yazdır
    window.print();
    router.push("/depo");
  }

  return (
    <div>
      <h1>Sevk Et</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <select value={toRestaurant} onChange={(e) => setToRestaurant(e.target.value)}>
            <option>Restaurant 1</option>
            <option>Restaurant 2</option>
          </select>
          <button type="button" onClick={addRow}>➕ Ürün Ekle</button>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {items.map((row, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8 }}>
              <input placeholder="Ürün ID" value={row.id} onChange={(e) => updateRow(idx, { id: e.target.value })} />
              <input type="number" placeholder="Miktar" value={row.qty} onChange={(e) => updateRow(idx, { qty: Number(e.target.value) })} />
              <button type="button" onClick={() => removeRow(idx)}>❌</button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" style={{ padding: 8, background: "#ff8c00", color: "#fff", border: "none", borderRadius: 6 }}>Sevk Et ve Yazdır</button>
        </div>
      </form>
    </div>
  );
}
