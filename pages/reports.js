// /pages/reports.js
import { useEffect, useState } from "react";

function exportCSV(rows, filename = "rapor.csv") {
  if (!rows.length) return alert("Rapor için veri yok.");
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(",")].concat(rows.map(r => keys.map(k => `"${(r[k]||"").toString().replace(/"/g,'""')}"`).join(","))).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("emsal_history") || "[]"));
  }, []);

  const filterType = (t) => history.filter(h => !t || h.type === t);

  return (
    <div style={{ padding: 24 }}>
      <div className="card">
        <h3>Raporlar</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button className="btn" onClick={() => exportCSV(history, "history_all.csv")}>Tüm Raporu CSV indir</button>
          <button className="btn secondary" onClick={() => exportCSV(filterType("Giriş"), "history_in.csv")}>Girişler CSV</button>
          <button className="btn secondary" onClick={() => exportCSV(filterType("Çıkış"), "history_out.csv")}>Çıkışlar CSV</button>
        </div>

        <table className="table">
          <thead><tr><th>Tür</th><th>Ürün ID</th><th>Miktar</th><th>Hedef</th><th>Tarih</th><th>İrsaliye</th></tr></thead>
          <tbody>
            {history.length === 0 ? <tr><td colSpan="6" style={{ padding: 12 }}>Kayıt yok.</td></tr> :
              history.map((h,i) => (
                <tr key={i}><td>{h.type}</td><td>{h.id}</td><td>{h.qty}</td><td>{h.target||"-"}</td><td>{h.date}</td><td>{h.invoice||"-"}</td></tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
