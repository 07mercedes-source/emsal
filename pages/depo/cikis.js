// pages/depo/cikis.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function CikisPage(){
  const router = useRouter();
  const [rows, setRows] = useState([{ id:"1", name:"Ürün 1", qty:1 }]);

  const change = (i, field, value)=> {
    setRows(rows.map((r,idx)=> idx===i ? {...r,[field]:value}:r));
  };
  const addRow = ()=> setRows([...rows, { id:"", name:"", qty:1 }]);
  const remove = (i)=> setRows(rows.filter((_,idx)=>idx!==i));

  const submit = ()=> {
    // gerçekte sevk işlemi yapılır (stok düşme vb.)
    alert("Sevk oluşturuldu. (demo)");
    router.push("/depo");
  };

  return (
    <div>
      <div className="top-row">
        <h2>🚚 Sevk Et</h2>
        <div>
          <button className="btn" onClick={addRow} style={{background:"#2563eb", color:"#fff"}}>➕ Satır Ekle</button>
        </div>
      </div>

      <div className="table-card">
        <table className="table">
          <thead><tr><th>Ürün ID</th><th>Ürün Adı</th><th>Adet</th><th>Aksiyon</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td><input className="input-cell" value={r.id} onChange={e=>change(i,'id',e.target.value)} /></td>
                <td><input className="input-cell" value={r.name} onChange={e=>change(i,'name',e.target.value)} /></td>
                <td><input className="input-cell" type="number" value={r.qty} onChange={e=>change(i,'qty',e.target.value)} /></td>
                <td><button className="btn" style={{background:"#ef4444", color:"#fff"}} onClick={()=>remove(i)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{marginTop:12, display:"flex", gap:8}}>
          <button className="btn btn-green" onClick={submit}>✅ Sevk Et ve Yazdır</button>
        </div>
      </div>
    </div>
  );
}
