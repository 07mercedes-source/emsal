// pages/depo/index.js
import { useEffect, useMemo, useState } from "react";
import { useDepo } from "../context/DepoContext";

export default function DepoPage(){
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(()=>["All", ...Array.from(new Set(products.map(p=>p.category)))], [products]);

  const filtered = products.filter(p=>{
    if(category!=="All" && p.category!==category) return false;
    if(!filter) return true;
    return p.name.toLowerCase().includes(filter.toLowerCase());
  });

  // yeni satır inline ekleme:
  const [newRow, setNewRow] = useState({ name:"", category:"", unit:"adet", qty:0, cost:0, price:0 });

  const addNew = () => {
    if(!newRow.name) return alert("Ürün adı giriniz");
    addProduct(newRow);
    setNewRow({ name:"", category:"", unit:"adet", qty:0, cost:0, price:0 });
  };

  const exportCSV = () => {
    const rows = [["id","name","category","unit","qty","cost","price"]];
    products.forEach(p=>rows.push([p.id,p.name,p.category,p.unit,p.qty,p.cost,p.price]));
    const csv = rows.map(r=>r.map(v=>`"${(v||"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "depo.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="h1">Depo</h2>

      <div style={{display:"flex", gap:12, marginBottom:12}}>
        <input placeholder="Ara..." value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:8,borderRadius:8,border:"1px solid #e6eef7"}} />
        <select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:8,borderRadius:8}}>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="button" onClick={exportCSV}>📥 CSV olarak al</button>
      </div>

      <div className="card" style={{overflowX:"auto"}}>
        <table className="table">
          <thead>
            <tr>
              <th>Ürün adı</th><th>Kategori</th><th>Birim</th><th>Stok</th><th>Maliyet (€)</th><th>Fiyat (€)</th><th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.unit}</td>
                <td>{p.qty}</td>
                <td>{p.cost}</td>
                <td>{p.price}</td>
                <td>
                  <button className="button ghost" onClick={()=>{ const n = prompt("Yeni adet:", p.qty); if(n!==null) updateProduct(p.id,{qty:Number(n)}); }}>Düzenle</button>
                  <button className="button" style={{marginLeft:8}} onClick={()=>removeProduct(p.id)}>Sil</button>
                </td>
              </tr>
            ))}
            <tr>
              <td><input value={newRow.name} onChange={e=>setNewRow({...newRow, name:e.target.value})} placeholder="Ürün adı" /></td>
              <td><input value={newRow.category} onChange={e=>setNewRow({...newRow, category:e.target.value})} placeholder="Kategori" /></td>
              <td><input value={newRow.unit} onChange={e=>setNewRow({...newRow, unit:e.target.value})} /></td>
              <td><input type="number" value={newRow.qty} onChange={e=>setNewRow({...newRow, qty:Number(e.target.value)})} /></td>
              <td><input type="number" value={newRow.cost} onChange={e=>setNewRow({...newRow, cost:Number(e.target.value)})} /></td>
              <td><input type="number" value={newRow.price} onChange={e=>setNewRow({...newRow, price:Number(e.target.value)})} /></td>
              <td><button className="button" onClick={addNew}>➕ Yeni Ürün Ekle</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{marginTop:12, display:"flex", gap:8}}>
        <button className="button" onClick={()=>window.location.href="/depo/teslim"}>📦 Teslim Alma</button>
        <button className="button" onClick={()=>window.location.href="/depo/cikis"}>🚚 Sevk Et</button>
        <button className="button" onClick={()=>window.location.href="/depo/rapor"}>📄 Raporlar</button>
      </div>
    </div>
  );
}
