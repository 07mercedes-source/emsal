// pages/restaurant/[id].js
import { useRouter } from "next/router";
import { useRestaurant } from "../../context/RestaurantContext";
import { useState } from "react";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, addEntry, getMonthTotals } = useRestaurant();
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()+1);

  if (!router.isReady) return <div>Yükleniyor...</div>;

  function add() {
    if (!amount) return alert("Tutar girin");
    addEntry(id, { date: date + "T00:00:00", type, description: desc, amount: Number(amount) });
    setAmount(""); setDesc("");
  }

  const totals = getMonthTotals(id, year, month);

  const entries = (data[id]?.entries || []).filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === Number(year) && (d.getMonth()+1) === Number(month);
  });

  return (
    <div>
      <h1>Restaurant {id}</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input type="month" value={`${year}-${String(month).padStart(2,"0")}`} onChange={(e) => { const [y,m] = e.target.value.split("-"); setYear(Number(y)); setMonth(Number(m)); }} />
        <div style={{ fontWeight: 700 }}>Toplam Gelir: €{totals.income.toFixed(2)}</div>
        <div style={{ fontWeight: 700 }}>Toplam Gider: €{totals.expense.toFixed(2)}</div>
        <div style={{ fontWeight: 800 }}>Net: €{totals.net.toFixed(2)}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr 120px", gap: 8, marginBottom: 12 }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
        <input placeholder="Açıklama" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input placeholder="Tutar (€)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={add} style={{ padding: 8, background: "#0b1220", color: "#fff" }}>Ekle</button>
      </div>

      <div>
        <h3>Bu aya ait hareketler</h3>
        <div style={{ borderTop: "1px solid #eee" }}>
          {entries.map((e, i) => (
            <div key={i} style={{ padding: 6, borderBottom: "1px solid #f5f7fb" }}>
              <div>{new Date(e.date).toLocaleDateString()} • {e.type} • €{e.amount} • {e.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
