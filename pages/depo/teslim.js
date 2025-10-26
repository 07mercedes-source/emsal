// pages/depo/teslim.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function Teslim() {
  const { products, receiveProduct } = useDepo();
  const [id, setId] = useState("");
  const [qty, setQty] = useState(1);
  const [cost, setCost] = useState("");

  const found = products.find(p=> p.id === id);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (!found) return alert("Ürün bulunamadı (ID yanlış)");
    receiveProduct({ id, qty, cost: cost || found.cost });
    alert("Stok güncellendi");
  };

  return (
    <div className="card">
      <h2>Teslim Alma</h2>
      <form onSubmit={onSubmit}>
        <label>Ürün ID</label>
        <input value={id} onChange={e=>setId(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <div style={{ marginBottom:8 }}>{found ? `Ürün: ${found.name}` : "Ürün bulunamadı."}</div>
        <label>Adet</label>
        <input type="number" value={qty} onChange={e=>setQty(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <label>Maliyet (opsiyonel)</label>
        <input value={cost} onChange={e=>setCost(e.target.value)} className="p-2 border rounded w-full mb-2" />
        <button type="submit" className="btn btn-primary">Stok Güncelle</button>
      </form>
    </div>
  );
}
