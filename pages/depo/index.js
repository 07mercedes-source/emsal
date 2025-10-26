// pages/depo/index.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import Link from "next/link";

export default function DepoPage() {
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const [filter, setFilter] = useState("");
  const [newRow, setNewRow] = useState({ category:"", name:"", unit:"", stock:0, cost:0 });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase())
  );

  const onAdd = () => {
    if (!newRow.name) return alert("Ürün adı girin");
    addProduct(newRow);
    setNewRow({ category:"", name:"", unit:"", stock:0, cost:0 });
  };

  return (
    <div className="card">
      <h2 style={{marginBottom:8}}>Depo — Ürün Listesi</h2>

      <div style={{ display:"flex", gap:10, marginBottom:12 }}>
        <input placeholder="Ürün veya kategori ara..." value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 border rounded" />
        <Link href="/depo/teslim"><button className="btn">📦 Teslim Alma</button></Link>
        <Link href="/depo/sevk"><button className="btn">🚚 Sevk Et</button></Link>
        <Link href="/depo/rapor"><button className="btn">📊 Raporlar</button></Link>
      </div>

      <table className="table">
        <thead><tr><th>Kategori</th><th>Ürün</th><th>Birim</th><th>Stok</th><th>Maliyet</th><th>İşlem</th></tr></thead>
        <tbody>
          {filtered.map(p=>(
            <tr key={p.id}>
              <td className="table-td">{p.category}</td>
              <td className="table-td">{p.name}</td>
              <td className="table-td">{p.unit}</td>
              <td className="table-td">{p.stock}</td>
              <td className="table-td">€ {Number(p.cost).toFixed(2)}</td>
              <td className="table-td">
                <button onClick={()=> {
                  const newName = prompt("Yeni isim", p.name);
                  if (newName) updateProduct(p.id, { name: newName });
                }} className="btn btn-ghost">Düzenle</button>
                <button onClick={()=> removeProduct(p.id)} className="btn" style={{ background:"#ef4444", color:"#fff", marginLeft:8 }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", gap:8 }}>
        <input placeholder="Kategori" value={newRow.category} onChange={e=>setNewRow({...newRow, category:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Ürün adı" value={newRow.name} onChange={e=>setNewRow({...newRow, name:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Birim" value={newRow.unit} onChange={e=>setNewRow({...newRow, unit:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Stok" type="number" value={newRow.stock} onChange={e=>setNewRow({...newRow, stock:e.target.value})} className="p-2 border rounded" />
        <div>
          <input placeholder="Maliyet" type="number" value={newRow.cost} onChange={e=>setNewRow({...newRow, cost:e.target.value})} className="p-2 border rounded" />
          <button onClick={onAdd} className="btn btn-primary" style={{ marginLeft:8 }}>➕ Yeni Ürün Ekle</button>
        </div>
      </div>
    </div>
  );
}
