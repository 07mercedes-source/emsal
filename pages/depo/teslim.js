// pages/depo/teslim.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoTeslim(){
  const { products, adjustStock } = useDepo();
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!productId) return alert("Ürün seçin");
    adjustStock(productId, Number(qty));
    alert("Teslim alındı ve stok güncellendi.");
    setProductId(""); setQty(0);
  };

  return (
    <div>
      <h2 className="h1">Teslim Alma</h2>
      <form onSubmit={onSubmit} className="card">
        <label className="small-muted">Ürün</label>
        <select value={productId} onChange={e=>setProductId(e.target.value)} style={{width:"100%",padding:8,borderRadius:6}}>
          <option value="">-- Seçiniz --</option>
          {products.map(p=> <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>)}
        </select>

        <label className="small-muted">Adet / Miktar</label>
        <input type="number" value={qty} onChange={e=>setQty(e.target.value)} style={{width:"100%",padding:8,borderRadius:6}} />

        <div style={{marginTop:8}}>
          <button className="button" type="submit">Stok Güncelle</button>
        </div>
      </form>
    </div>
  );
}
