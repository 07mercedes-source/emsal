// pages/depo/index.js
import { useState } from "react";
import Link from "next/link";

const SAMPLE = Array.from({length:10}).map((_,i)=>({
  id: i+1,
  name: `Ürün ${i+1}`,
  stock: Math.floor(Math.random()*50)+1,
  unit: "adet",
  cost: (5 + i).toFixed(2),
  expiry: `2026-0${(i%9)+1}-15`
}));

export default function DepoPage(){
  const [products, setProducts] = useState(SAMPLE);

  const addRow = () => {
    const newId = products.length ? Math.max(...products.map(p=>p.id))+1 : 1;
    setProducts([{ id:newId, name:"", stock:0, unit:"adet", cost:"0.00", expiry:"" }, ...products]);
  };
  const change = (id, field, value) => setProducts(products.map(p=>p.id===id?{...p, [field]: value}:p));
  const remove = id => { if(confirm("Silinsin mi?")) setProducts(products.filter(p=>p.id!==id)); };

  return (
    <div>
      <div className="top-row">
        <h2>📦 Depo - Ürün Listesi</h2>
        <div style={{display:"flex", gap:8}}>
          <button className="btn" style={{background:"#2563eb", color:"#fff"}} onClick={addRow}>➕ Yeni Ürün Ekle</button>
          <Link href="/depo/teslim" className="btn" style={{background:"#4CAF50", color:"#fff"}}>📦 Teslim Alma</Link>
          <Link href="/depo/cikis" className="btn" style={{background:"#FF9800", color:"#fff"}}>🚚 Sevk Et</Link>
          <Link href="/depo/rapor" className="btn" style={{background:"#6b7280", color:"#fff"}}>📄 Raporlar</Link>
        </div>
      </div>

      <div className="table-card" style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>ID</th><th>Ürün Adı</th><th>Stok</th><th>Birim</th><th>Maliyet (€)</th><th>SKT</th><th>Aksiyon</th></tr></thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><input className="input-cell" value={p.name} onChange={e=>change(p.id,"name",e.target.value)} /></td>
                <td><input className="input-cell" type="number" value={p.stock} onChange={e=>change(p.id,"stock",e.target.value)} /></td>
                <td><input className="input-cell" value={p.unit} onChange={e=>change(p.id,"unit",e.target.value)} /></td>
                <td><input className="input-cell" value={p.cost} onChange={e=>change(p.id,"cost",e.target.value)} /></td>
                <td><input className="input-cell" type="date" value={p.expiry} onChange={e=>change(p.id,"expiry",e.target.value)} /></td>
                <td><button className="btn" style={{background:"#ef4444", color:"#fff"}} onClick={()=>remove(p.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
