// pages/restaurant/2.js
import { useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";

export default function Rest2() {
  const { r2, addEntry, getMonthTotal } = useRestaurant();
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState(0);

  const onAdd = () => { addEntry(2, { date, type, amount: Number(amount) }); alert("Eklendi"); };

  const today = new Date();
  const y = today.getFullYear(), m = today.getMonth()+1;
  const total = getMonthTotal(2, y, m);

  return (
    <div className="card">
      <h2>Restaurant 2</h2>
      <div style={{ marginBottom:8 }}>Aktif ay toplam ciro: € {total.toLocaleString()}</div>

      <div style={{ display:"flex", gap:8, marginBottom:8 }}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 border rounded" />
        <select value={type} onChange={e=>setType(e.target.value)} className="p-2 border rounded">
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="p-2 border rounded" placeholder="Tutar" />
        <button className="btn btn-primary" onClick={onAdd}>Ekle</button>
      </div>

      <table className="table">
        <thead><tr><th>Tarih</th><th>Tip</th><th>Tutar</th></tr></thead>
        <tbody>
          {r2.map((e,i)=> <tr key={i}><td>{new Date(e.date).toLocaleDateString()}</td><td>{e.type}</td><td>€ {Number(e.amount).toLocaleString()}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
