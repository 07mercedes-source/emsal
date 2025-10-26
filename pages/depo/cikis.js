// pages/depo/cikis.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoCikis(){
  const { products, adjustStock } = useDepo();
  const [items, setItems] = useState([{productId:"", qty:0}]);
  const [restaurant, setRestaurant] = useState("Restaurant 1");

  const addRow = ()=> setItems(prev=>[...prev,{productId:"",qty:0}]);
  const updateRow = (i, field, val)=> setItems(prev => prev.map((r,idx)=> idx===i? {...r,[field]:val}:r ));
  const removeRow = (i)=> setItems(prev => prev.filter((_,idx)=>idx!==i));

  const sevk = () => {
    // update stocks
    for(const it of items){
      if(it.productId && Number(it.qty)){
        adjustStock(it.productId, -Math.abs(Number(it.qty)));
      }
    }
    // print simple irsaliye
    const content = `Sevk İrsaliyesi\nRestaurant: ${restaurant}\n\n${items.map(it=> {
      const p = products.find(x=>x.id===it.productId);
      return `${p? p.name: '—'} - ${it.qty} ${p? p.unit:''}`;
    }).join("\n")}`;
    const w = window.open("", "_blank");
    w.document.write("<pre>"+content+"</pre>");
    w.print();
    w.close();
    alert("Sevk tamamlandı, irsaliye yazdırıldı.");
    setItems([{productId:"", qty:0}]);
  };

  return (
    <div>
      <h2 className="h1">Sevk Et</h2>
      <div className="card">
        <label className="small-muted">Hangi restoranta</label>
        <select value={restaurant} onChange={e=>setRestaurant(e.target.value)} style={{width:"100%",padding:8,borderRadius:6}}>
          <option>Restaurant 1</option><option>Restaurant 2</option>
        </select>

        {items.map((it,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginTop:8}}>
            <select value={it.productId} onChange={e=>updateRow(i,"productId", e.target.value)} style={{flex:1}}>
              <option value="">-- Ürün seç --</option>
              {products.map(p=> <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>)}
            </select>
            <input type="number" value={it.qty} onChange={e=>updateRow(i,"qty", e.target.value)} style={{width:90}} />
            <button className="button ghost" onClick={()=>removeRow(i)}>Sil</button>
          </div>
        ))}

        <div style={{marginTop:8, display:"flex", gap:8}}>
          <button className="button" onClick={addRow}>➕ Ürün Ekle</button>
          <button className="button" onClick={sevk}>🚚 Sevk Et & Yazdır</button>
        </div>
      </div>
    </div>
  );
}
