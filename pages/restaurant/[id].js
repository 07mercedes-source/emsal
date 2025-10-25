// pages/restaurant/[id].js
import { useRouter } from "next/router";
import { useRestaurant } from "../../context/RestaurantContext";
import { useState } from "react";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query; // "1" veya "2"
  const { getByMonth, addRecord, totalsByMonth } = useRestaurant();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()+1);
  const [year, setYear] = useState(today.getFullYear());
  const [form, setForm] = useState({ date: today.toISOString().slice(0,10), type: "income", description: "", amount: 0 });

  const records = getByMonth(id || "1", month, year);
  const totals = totalsByMonth(id || "1", month, year);

  const handleAdd = () => {
    if (!form.description) return alert("Açıklama girin");
    addRecord(id, form);
    setForm({ date: today.toISOString().slice(0,10), type: "income", description: "", amount: 0 });
  };

  return (
    <div>
      <h2>Restaurant {id}</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Ay: <input type="number" min="1" max="12" value={month} onChange={e=>setMonth(Number(e.target.value))} /></label>
        <label style={{ marginLeft: 8 }}>Yıl: <input type="number" value={year} onChange={e=>setYear(Number(e.target.value))} /></label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div>Toplam Gelir: €{totals.income}</div>
        <div>Toplam Gider: €{totals.expense}</div>
        <div>Net: €{totals.net}</div>
      </div>

      <div style={{ border: "1px solid #eee", padding: 8, marginBottom: 12 }}>
        <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
        <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
        <input placeholder="Açıklama" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input type="number" placeholder="Tutar (€)" value={form.amount} onChange={e=>setForm({...form, amount:Number(e.target.value)})} />
        <button onClick={handleAdd}>Ekle</button>
      </div>

      <table style={{ width: "100%" }}>
        <thead><tr><th>Tarih</th><th>Tip</th><th>Açıklama</th><th>Tutar (€)</th></tr></thead>
        <tbody>{records.map(r=><tr key={r.id}><td>{r.date}</td><td>{r.type}</td><td>{r.description}</td><td>{r.amount}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
