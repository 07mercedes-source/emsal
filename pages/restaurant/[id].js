// pages/restaurant/[id].js
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";
import { useAuth } from "../../context/AuthContext";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const rid = Number(id || 1);
  const { entries, addEntry, getByRestaurantAndMonth } = useRestaurant();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [monthYear, setMonthYear] = useState({ month: (new Date()).getMonth() + 1, year: (new Date()).getFullYear() });
  const [newRow, setNewRow] = useState({ date: new Date().toISOString().slice(0,10), type: "gelir", description: "", amount: 0 });

  useEffect(() => {
    if (id) {
      // adjust nothing; just reactive
    }
  }, [id]);

  const list = getByRestaurantAndMonth(rid, monthYear.month, monthYear.year);
  const totals = list.reduce((acc, e) => {
    if (e.type === "gelir") acc.gelir += Number(e.amount || 0);
    else acc.gider += Number(e.amount || 0);
    return acc;
  }, { gelir: 0, gider: 0 });
  totals.net = totals.gelir - totals.gider;

  const add = () => {
    addEntry({ restaurant: rid, date: newRow.date, type: newRow.type, description: newRow.description, amount: Number(newRow.amount) });
    setNewRow({ ...newRow, description: "", amount: 0 });
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Restaurant {rid}</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <label>Ay</label>
          <input type="number" value={monthYear.month} onChange={(e) => setMonthYear({...monthYear, month: Number(e.target.value)})} min={1} max={12}/>
          <label>Yıl</label>
          <input type="number" value={monthYear.year} onChange={(e) => setMonthYear({...monthYear, year: Number(e.target.value)})} min={2000}/>
          <div style={{ marginLeft: "auto", fontWeight: 700 }}>
            Gelir: €{totals.gelir.toLocaleString()} — Gider: €{totals.gider.toLocaleString()} — Net: €{totals.net.toLocaleString()}
          </div>
        </div>

        <table className="table">
          <thead><tr><th>Tarih</th><th>Açıklama</th><th>Tür</th><th> Tutar (€)</th></tr></thead>
          <tbody>{list.map(r => <tr key={r.id}><td>{r.date}</td><td>{r.description}</td><td>{r.type}</td><td>{r.amount}</td></tr>)}</tbody>
        </table>

        {isAdmin && (
          <div style={{ marginTop: 12 }}>
            <h4>Yeni Kayıt Ekle</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="date" value={newRow.date} onChange={(e)=>setNewRow({...newRow,date:e.target.value})}/>
              <select value={newRow.type} onChange={(e)=>setNewRow({...newRow,type:e.target.value})}><option value="gelir">Gelir</option><option value="gider">Gider</option></select>
              <input placeholder="Açıklama" value={newRow.description} onChange={(e)=>setNewRow({...newRow,description:e.target.value})}/>
              <input type="number" placeholder="Tutar" value={newRow.amount} onChange={(e)=>setNewRow({...newRow,amount:Number(e.target.value)})}/>
              <button onClick={add}>Ekle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
