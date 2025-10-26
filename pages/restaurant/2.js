// pages/restaurant/2.js
import { useRestaurant } from "../../context/RestaurantContext";
import { useState } from "react";

export default function R2(){
  const { restaurant2, addEntry } = useRestaurant();
  const [entry, setEntry] = useState({date:"", type:"income", amount:0, desc:""});

  const add = ()=>{
    if(!entry.date) return alert("Tarih giriniz");
    addEntry(2, entry);
    setEntry({date:"", type:"income", amount:0, desc:""});
  };

  const totalIncome = restaurant2.filter(r=>r.type==="income").reduce((s,x)=>s+Number(x.amount||0),0);
  const totalExpense = restaurant2.filter(r=>r.type==="expense").reduce((s,x)=>s+Number(x.amount||0),0);

  return (
    <div>
      <h2 className="h1">Restaurant 2</h2>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input type="date" value={entry.date} onChange={e=>setEntry({...entry,date:e.target.value})} />
        <select value={entry.type} onChange={e=>setEntry({...entry,type:e.target.value})}><option value="income">Gelir</option><option value="expense">Gider</option></select>
        <input type="number" value={entry.amount} onChange={e=>setEntry({...entry,amount:e.target.value})} placeholder="Tutar" />
        <input value={entry.desc} onChange={e=>setEntry({...entry,desc:e.target.value})} placeholder="Açıklama" />
        <button className="button" onClick={add}>Ekle</button>
      </div>

      <div className="card">
        <div className="small-muted">Toplam Gelir: {totalIncome} € — Toplam Gider: {totalExpense} € — Net: {totalIncome-totalExpense} €</div>
        <table className="table" style={{marginTop:8}}>
          <thead><tr><th>Tarih</th><th>Tip</th><th>Tutar</th><th>Açıklama</th></tr></thead>
          <tbody>
            {restaurant2.map(r=>(
              <tr key={r.id}><td>{r.date}</td><td>{r.type}</td><td>{r.amount}</td><td>{r.desc}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
