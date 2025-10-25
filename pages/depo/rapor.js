// pages/depo/rapor.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function DepoRapor() {
  const { history, urunler } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filter = () => {
    if (!from || !to) return history;
    const f = new Date(from), t = new Date(to);
    return history.filter(h => {
      const d = new Date(h.date);
      return d >= f && d <= t;
    });
  };

  const downloadExcel = () => {
    const data = filter().map(h => {
      const p = urunler.find(u => u.id === h.productId) || {};
      return { date: h.date, action: h.action, product: p.ad || h.productId, qty: h.qty, toRestaurant: h.toRestaurant || "" };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapor");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), `depo-rapor-${from || "all"}-${to || "all"}.xlsx`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Depo Rapor</h2>
      <div className="bg-white p-4 rounded shadow max-w-lg">
        <div className="flex gap-2">
          <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} className="p-2 border rounded" />
          <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} className="p-2 border rounded" />
          <button onClick={downloadExcel} className="px-3 py-2 bg-blue-600 text-white rounded">Excel İndir</button>
        </div>
      </div>
    </div>
  );
}
