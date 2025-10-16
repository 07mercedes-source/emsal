import { useEffect, useState } from "react";

export default function DepoRapor() {
  const [history, setHistory] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const h = localStorage.getItem("emsal_history");
    setHistory(h ? JSON.parse(h) : []);
  }, []);

  const filtered = history.filter((r) => {
    if (!from && !to) return true;
    const d = new Date(r.date.split(" ")[0].split(".").reverse().join("-"));
    if (from && d < new Date(from)) return false;
    if (to && d > new Date(to)) return false;
    return true;
  });

  const exportExcel = async () => {
    const XLSX = (await import("xlsx")).default;
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapor");
    XLSX.writeFile(wb, "DepoRapor.xlsx");
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    doc.text("Depo Raporu", 14, 20);
    const body = filtered.map(r => [r.date, r.type || "", r.id || "", r.name || "", r.quantity || "", r.target || ""]);
    autoTable(doc, { head: [["Tarih", "Tip", "ID", "Ürün", "Miktar", "Hedef"]], body, startY: 28 });
    doc.save("DepoRapor.pdf");
  };

  return (
    <div>
      <h2>Depo Raporlama</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={input} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={input} />
        <button onClick={exportExcel}>Excel</button>
        <button onClick={exportPDF} style={{ background: "#15803d" }}>PDF</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 10 }}>
        <table style={{ width: "100%" }}>
          <thead><tr><th style={th}>Tarih</th><th style={th}>Tip</th><th style={th}>ID</th><th style={th}>Ürün</th><th style={th}>Miktar</th><th style={th}>Hedef</th></tr></thead>
          <tbody>
            {filtered.map((r,i) => <tr key={i}><td style={td}>{r.date}</td><td style={td}>{r.type}</td><td style={td}>{r.id}</td><td style={td}>{r.name}</td><td style={td}>{r.quantity}</td><td style={td}>{r.target || "-"}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const input = { padding: 8, borderRadius: 8, border: "1px solid #eef2f7" };
const th = { textAlign: "left", padding: 8, borderBottom: "1px solid #eef2f7" };
const td = { padding: 8, borderBottom: "1px solid #f3f6f9" };
