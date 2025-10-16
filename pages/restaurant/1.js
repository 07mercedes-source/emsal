// pages/restaurant/1.js
import { useEffect, useState } from "react";
import { useRestaurantData } from "../../context/RestaurantContext";

export default function Restaurant1(){
  const { restaurant1, setRestaurant1 } = useRestaurantData();
  const [transactions, setTransactions] = useState([]);

  useEffect(()=> {
    const example = [
      { id: 1, type: "Gelir", desc: "Satış", amount: 2500, date: "2025-10-01" },
      { id: 2, type: "Gider", desc: "Gıda alımı", amount: 800, date: "2025-10-02" },
      { id: 3, type: "Gelir", desc: "Satış", amount: 2700, date: "2025-10-03" },
      { id: 4, type: "Gider", desc: "Personel", amount: 1200, date: "2025-10-03" },
    ];
    if((restaurant1||[]).length === 0){
      setTransactions(example);
      setRestaurant1(example);
    } else {
      setTransactions(restaurant1);
    }
  },[]);

  useEffect(()=> setRestaurant1(transactions), [transactions]);

  const add = (type) => {
    setTransactions([...transactions, { id: Date.now(), type, desc:"", amount:0, date: new Date().toISOString().slice(0,10) }]);
  };

  const change = (id, field, val) => setTransactions(transactions.map(t=> t.id===id ? {...t, [field]: field==="amount" ? Number(val) : val} : t));

  const remove = (id) => setTransactions(transactions.filter(t=>t.id!==id));

  const filtered = transactions;

  const exportExcel = async () => {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapor");
    XLSX.writeFile(wb, "restaurant1_rapor.xlsx");
  };

  const exportPDF = async () => {
    const pdfModule = await import('jspdf');
    const jsPDF = pdfModule.default || pdfModule.jsPDF;
    await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.text("Restaurant 1 Rapor",14,15);
    doc.autoTable({ startY:20, head:[["ID","Tür","Açıklama","Tutar","Tarih"]], body: filtered.map(t=>[t.id, t.type, t.desc, t.amount, t.date]) });
    doc.save("restaurant1_rapor.pdf");
  };

  const currentMonth = new Date().toISOString().slice(0,7);
  const currentMonthTotal = (transactions||[]).reduce((acc,t)=> t.date.startsWith(currentMonth) ? (t.type==="Gelir" ? acc + Number(t.amount) : acc - Number(t.amount)) : acc, 0);

  return (
    <div>
      <h2>Restaurant 1</h2>
      <div style={{display:"flex", gap:8, justifyContent:"flex-end"}}>
        <button className="btn btn-green" onClick={()=>add("Gelir")}>➕ Gelir Ekle</button>
        <button className="btn btn-orange" onClick={()=>add("Gider")}>➖ Gider Ekle</button>
        <button className="btn btn-blue" onClick={exportExcel}>📊 Excel</button>
        <button className="btn btn-red" onClick={exportPDF}>📄 PDF</button>
      </div>

      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Tür</th><th>Açıklama</th><th>Tutar (€)</th><th>Tarih</th><th>Sil</th></tr></thead>
        <tbody>
          {transactions.map(r=>(
            <tr key={r.id}>
              <td>{r.type}</td>
              <td><input className="input-cell" value={r.desc} onChange={e=>change(r.id,"desc",e.target.value)} /></td>
              <td><input className="input-cell" type="number" value={r.amount} onChange={e=>change(r.id,"amount",e.target.value)} /></td>
              <td><input className="input-cell" type="date" value={r.date} onChange={e=>change(r.id,"date",e.target.value)} /></td>
              <td><button className="btn btn-red" onClick={()=>remove(r.id)}>🗑</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:12, fontWeight:700}}>Bu Ay Toplam: {currentMonthTotal.toLocaleString("tr-TR")} €</div>
    </div>
  );
}
