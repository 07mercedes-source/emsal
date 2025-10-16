// pages/restaurant/[id].js
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { useRestaurantData } from "../../context/RestaurantContext";

export default function RestaurantPage(){
  const router = useRouter();
  const { id } = router.query; // "1" or "2"
  const { restaurant1, restaurant2, addTransaction } = useRestaurantData();
  const list = id === "2" ? restaurant2 : restaurant1;

  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth()+1).padStart(2,"0"));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [type, setType] = useState("gelir");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const filtered = useMemo(()=> {
    return (list || []).filter(tx => {
      if (!tx.date) return false;
      const d = new Date(tx.date);
      return String(d.getMonth()+1).padStart(2,"0") === month && String(d.getFullYear()) === year;
    });
  }, [list, month, year]);

  const totals = useMemo(()=> {
    return filtered.reduce((acc, tx) => {
      if (tx.type === "gelir") acc.gelir += Number(tx.amount||0);
      else acc.gider += Number(tx.amount||0);
      return acc;
    }, {gelir:0,gider:0});
  }, [filtered]);

  const submit = () => {
    if (!amount) return alert("Tutar girin");
    addTransaction(id, { type, amount: Number(amount), date: new Date().toISOString().slice(0,10), note });
    setAmount(""); setNote("");
    alert("Kayıt eklendi");
  };

  return (
    <div>
      <div className="top-row">
        <h2>🍽 Restaurant {id}</h2>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <select value={month} onChange={e=>setMonth(e.target.value)} style={{padding:8,borderRadius:8}}>
            {Array.from({length:12}).map((_,i)=> {
              const m = String(i+1).padStart(2,"0");
              return <option key={m} value={m}>{m}</option>;
            })}
          </select>
          <select value={year} onChange={e=>setYear(e.target.value)} style={{padding:8,borderRadius:8}}>
            {Array.from({length:5}).map((_,i)=> <option key={2025-i}>{2025-i}</option>)}
          </select>
        </div>
      </div>

      <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:12}}>
        <select value={type} onChange={e=>setType(e.target.value)} style={{padding:8,borderRadius:8}}>
          <option value="gelir">Gelir</option>
          <option value="gider">Gider</option>
        </select>
        <input placeholder="Tutar (€)" value={amount} onChange={e=>setAmount(e.target.value)} style={{padding:8,borderRadius:8}} />
        <input placeholder="Açıklama" value={note} onChange={e=>setNote(e.target.value)} style={{padding:8,borderRadius:8}} />
        <button className="btn" style={{background:"#10b981", color:"#fff"}} onClick={submit}>➕ Ekle</button>
      </div>

      <div className="table-card">
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
          <div>Toplam Gelir: {new Intl.NumberFormat('de-DE').format(totals.gelir)} €</div>
          <div>Toplam Gider: {new Intl.NumberFormat('de-DE').format(totals.gider)} €</div>
          <div>Net: {new Intl.NumberFormat('de-DE').format(totals.gelir - totals.gider)} €</div>
        </div>

        <table className="table">
          <thead><tr><th>Tarih</th><th>Tip</th><th>Açıklama</th><th>Tutar (€)</th></tr></thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.note}</td>
                <td>{new Intl.NumberFormat('de-DE').format(tx.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
