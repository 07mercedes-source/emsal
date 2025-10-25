// pages/depo/cikis.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useRestaurantData } from "../../context/RestaurantContext";

export default function Sevk() {
  const { urunler, updateUrun, pushHistory } = useDepo();
  const { addEntry } = useRestaurantData();
  const [lines, setLines] = useState([{ id: "", qty: 0 }]);
  const [restaurant, setRestaurant] = useState("1");

  const setLine = (i, v) => {
    setLines((s) => s.map((l, idx) => idx === i ? { ...l, ...v } : l));
  };

  const addLine = () => setLines((s) => [...s, { id: "", qty: 0 }]);

  const removeLine = (i) => setLines((s) => s.filter((_, idx)=>idx!==i));

  const submit = (e) => {
    e.preventDefault();
    for (const l of lines) {
      if (!l.id) continue;
      const p = urunler.find(u => u.id.startsWith(l.id) || u.id === l.id);
      if (!p) { alert(`Ürün bulunamadı: ${l.id}`); return; }
      const newQty = p.miktar - Number(l.qty);
      if (newQty < 0) { alert(`Yetersiz stok: ${p.ad}`); return; }
      updateUrun(p.id, { miktar: newQty });
      pushHistory({ action: "sevk", productId: p.id, qty: Number(l.qty), date: new Date().toISOString().slice(0,10), toRestaurant: restaurant });
      // restaurant entry as revenue placeholder (you can refine)
      addEntry(restaurant, { date: new Date().toISOString().slice(0,10), type: "expense", amount: 0, desc: `Sevk: ${p.ad} x${l.qty}` });
    }
    alert("Sevk gerçekleştirildi. İrsaliye yazdır için tarayıcı yazdır kullanın.");
    setLines([{ id: "", qty: 0 }]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Sevk / Çıkış</h2>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="block mb-1">Hedef Restaurant</label>
          <select value={restaurant} onChange={(e)=>setRestaurant(e.target.value)} className="p-2 border rounded">
            <option value="1">Restaurant 1</option>
            <option value="2">Restaurant 2</option>
          </select>
        </div>

        {lines.map((l, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input value={l.id} onChange={(e)=>setLine(i, { id:e.target.value })} placeholder="Ürün ID (kısmi kabul edilir)" className="p-2 border rounded flex-1" />
            <input value={l.qty} onChange={(e)=>setLine(i, { qty: Number(e.target.value) })} placeholder="Adet" type="number" className="p-2 border rounded w-28" />
            <button type="button" onClick={()=>removeLine(i)} className="px-2 bg-red-500 text-white rounded">X</button>
          </div>
        ))}

        <div className="flex gap-2">
          <button type="button" onClick={addLine} className="px-3 py-2 bg-amber-500 rounded">Yeni Satır</button>
          <button className="px-3 py-2 bg-green-600 text-white rounded">Sevk Et</button>
        </div>
      </form>
    </div>
  );
}
