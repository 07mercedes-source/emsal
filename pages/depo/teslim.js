// pages/depo/teslim.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function TeslimPage(){
  const router = useRouter();
  // Basit demo: id->name eşleştirme (gerçek uygulamada depo datasource kullanılacak)
  const demoMap = { "1":"Ürün 1", "2":"Ürün 2", "3":"Ürün 3" };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [cost, setCost] = useState("");

  const lookup = (val) => {
    setId(val);
    setName(demoMap[val] || "");
  };

  const submit = (e) => {
    e.preventDefault();
    alert(`Teslim alındı: ${name || id} x${qty} (maliyet ${cost})`);
    // burada depo state güncellenir
    router.push("/depo");
  };

  return (
    <div>
      <div className="top-row">
        <h2>📦 Ürün Teslim Alma</h2>
      </div>

      <form onSubmit={submit} style={{maxWidth:720}}>
        <div style={{display:"grid", gridTemplateColumns:"150px 1fr", gap:10, alignItems:"center", marginBottom:10}}>
          <label>Ürün ID</label>
          <input value={id} onChange={e=>lookup(e.target.value)} className="input-cell" />
          <label>Ürün Adı</label>
          <input value={name} readOnly className="input-cell" />
          <label>Adet</label>
          <input type="number" value={qty} onChange={e=>setQty(e.target.value)} className="input-cell" />
          <label>Maliyet (€)</label>
          <input value={cost} onChange={e=>setCost(e.target.value)} className="input-cell" />
        </div>

        <div style={{display:"flex", gap:8}}>
          <button className="btn btn-green" type="submit">📥 Teslim Al</button>
          <button className="btn" type="button" onClick={()=>window.history.back()}>Geri</button>
        </div>
      </form>
    </div>
  );
}
