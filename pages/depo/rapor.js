// pages/depo/rapor.js
import { useEffect, useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoRapor() {
  const { urunler } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Bu demo sürümünde, depo değişikliklerine göre örnek rapor çıkar (gerçek log sistemi yok).
  const handleExcel = async () => {
    const XLSX = (await import("xlsx")).default;
    const data = urunler.map(u => ({ ID: u.id, Ad: u.ad, Kategori: u.kategori, Stok: u.stok, Birim: u.birim, Maliyet: u.maliyet }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Depo");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const { saveAs } = await import("file-saver");
    const blob = new Blob([buf], { type: "application/octet-stream" });
    saveAs(blob, `depo-rapor-${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const handlePdf = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    doc.text("Depo Raporu", 14, 16);
    const rows = urunler.map(u => [u.id.slice(0,8), u.ad, u.kategori, u.stok, u.birim, Number(u.maliyet).toFixed(2)]);
    autoTable(doc, { head: [["ID","Ad","Kategori","Stok","Birim","Maliyet"]], body: rows, startY: 22 });
    doc.save(`depo-rapor-${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Depo Raporları</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Başlangıç</label>
        <input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} />
        <label style={{ marginLeft: 8 }}>Bitiş</label>
        <input type="date" value={to} onChange={(e)=>setTo(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleExcel} style={btn}>📥 Excel İndir</button>
        <button onClick={handlePdf} style={btn}>📄 PDF İndir</button>
      </div>
    </div>
  );
}

const btn = { padding: "8px 12px", background:"#0ea5e9", color:"#fff", border:"none", borderRadius:6 };
