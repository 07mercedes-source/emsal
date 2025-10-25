// pages/restaurant/[id].js
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRestaurantData } from "../../context/RestaurantContext";

export default function RestaurantPage() {
  const router = useRouter();
  const { id } = router.query;
  const { getEntries, addEntry } = useRestaurantData();
  const entries = getEntries(id || "1");

  const [date, setDate] = useState("");
  const [type, setType] = useState("revenue");
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");

  const [month, setMonth] = useState("");

  useEffect(() => {
    const now = new Date();
    setMonth(now.toISOString().slice(0,7));
  }, []);

  const filtered = useMemo(() => {
    if (!month) return entries;
    return entries.filter(e => e.date.startsWith(month));
  }, [entries, month]);

  const totals = useMemo(() => {
    const rev = filtered.filter(e=>e.type==="revenue").reduce((s,e)=>s+e.amount,0);
    const exp = filtered.filter(e=>e.type==="expense").reduce((s,e)=>s+e.amount,0);
    return { rev, exp, net: rev - exp };
  }, [filtered]);

  const submit = (e) => {
    e.preventDefault();
    addEntry(id, { date: date || new Date().toISOString().slice(0,10), type, amount: Number(amount), desc });
    setAmount(0); setDesc(""); setDate("");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Restaurant {id}</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="text-sm">Toplam Gelir: €{totals.rev.toLocaleString('de-DE')}</div>
            <div className="text-sm">Toplam Gider: €{totals.exp.toLocaleString('de-DE')}</div>
            <div className="text-sm font-medium">Net: €{totals.net.toLocaleString('de-DE')}</div>
          </div>

          <div>
            <label className="block text-sm">Ay (YYYY-MM)</label>
            <input value={month} onChange={(e)=>setMonth(e.target.value)} placeholder="2026-01" className="p-2 border rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
          <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="p-2 border rounded" />
          <select value={type} onChange={(e)=>setType(e.target.value)} className="p-2 border rounded">
            <option value="revenue">Gelir</option>
            <option value="expense">Gider</option>
          </select>
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Tutar" type="number" className="p-2 border rounded" />
          <input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Açıklama" className="p-2 border rounded" />
          <div className="md:col-span-4">
            <button className="px-3 py-2 bg-green-600 text-white rounded">Ekle</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Hareketler</h3>
        <div className="space-y-2">
          {filtered.map(e => (
            <div key={e.id} className="flex justify-between border-b py-2">
              <div>{e.date} • {e.desc}</div>
              <div>{e.type === "revenue" ? "€" + e.amount.toLocaleString('de-DE') : "-€" + e.amount.toLocaleString('de-DE')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
