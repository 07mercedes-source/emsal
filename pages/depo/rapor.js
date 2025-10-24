// pages/depo/rapor.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

function downloadCSV(filename, rows) {
  const csv = rows.map(r => Object.values(r).map(v => `"${(v ?? "").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export default function Rapor() {
  const { getHistoryBetween, history } = useDepo();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleExport() {
    const rows = getHistoryBetween(start, end).map(h => ({
      date: h.date,
      type: h.type,
      details: JSON.stringify(h.items || h),
    }));
    downloadCSV("depo_rapor.csv", [["date","type","details"], ...rows.map(r => [r.date, r.type, r.details])]);
    alert("CSV indirildi");
  }

  return (
    <div>
      <h1>Depo Raporları</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        <button onClick={handleExport}>CSV İndir</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Son Hareketler</h3>
        <ul>
          {history.slice(0, 50).map((h, i) => <li key={i}>{h.date} • {h.type} • {JSON.stringify(h.items || h)}</li>)}
        </ul>
      </div>
    </div>
  );
}
