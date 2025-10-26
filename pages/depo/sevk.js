// pages/depo/sevk.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function Sevk() {
  const { products, shipProducts } = useDepo();
  const [lines, setLines] = useState([{ id:"", qty:1 }]);
  const [restaurant, setRestaurant] = useState("Restaurant 1");

  const onAddLine = ()=> setLines(prev=>[...prev, { id:"", qty:1 }]);
  const onChangeLine = (idx, key, val) => setLines(prev => prev.map((l,i)=> i===idx ? {...l, [key]: val} : l));

  const onSevk = () => {
    // Validate
    const items = lines.filter(l=> l.id).map(l=> ({ id:l.id, qty:Number(l.qty)}));
    if (items.length===0) return alert("En az 1 ürün girin");
    shipProducts(items);
    // Create simple irsaliye view then print
    const html = `
      <h2>Sevk İrsaliyesi</h2>
      <div>To: ${restaurant}</div>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
        <tr><th>Ürün</th><th>Adet</th></tr>
        ${items.map(it=>{
          const p = products.find(x=>x.id===it.id);
          return `<tr><td>${p? p.name : it.id}</td><td>${it.qty}</td></tr>`;
        }).join("")}
      </table>
    `;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
    shipProducts(items);
    alert("Sevk tamamlandı");
  };

  return (
    <div className="card">
      <h2>Sevk Et</h2>
      {lines.map((l, idx)=>(
        <div key={idx} style={{ display:"flex", gap:8, marginBottom:8 }}>
          <input placeholder="Ürün ID" value={l.id} onChange={e=>onChangeLine(idx,"id", e.target.value)} className="p-2 border rounded" />
          <input type="number" placeholder="Adet" value={l.qty} onChange={e=>onChangeLine(idx,"qty", e.target.value)} className="p-2 border rounded" style={{ width:100 }} />
          <div style={{ alignSelf:"center", color:"#6b7280" }}>{ products.find(p=>p.id===l.id)?.name || "" }</div>
        </div>
      ))}
      <button className="btn" onClick={onAddLine}>➕ Satır Ekle</button>
      <div style={{ marginTop:12 }}>
        <label>Hangi restorana?</label>
        <select value={restaurant} onChange={e=>setRestaurant(e.target.value)} className="p-2 border rounded" style={{ marginLeft:8 }}>
          <option>Restaurant 1</option>
          <option>Restaurant 2</option>
        </select>
      </div>
      <div style={{ marginTop:12 }}>
        <button className="btn btn-primary" onClick={onSevk}>Sevk Et ve Yazdır</button>
      </div>
    </div>
  );
}
