// pages/depo/cikis.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useRouter } from "next/router";

export default function Cikis() {
  const router = useRouter();
  const { urunler, stokGuncelle } = useDepo();
  const [satirlar, setSatirlar] = useState([{ idSearch: "", adet: 1 }]);
  const [restoran, setRestoran] = useState("1");

  const setSatir = (idx, v) => {
    const s = [...satirlar];
    s[idx] = { ...s[idx], ...v };
    setSatirlar(s);
  };

  const urunBySearch = (txt) => urunler.find(u => u.id.startsWith(txt) || u.id === txt);

  const addRow = () => setSatirlar(p => [...p, { idSearch: "", adet: 1 }]);
  const removeRow = (i) => setSatirlar(p => p.filter((_,idx)=>idx!==i));

  const handleSevk = (e) => {
    e.preventDefault();
    // stokları düş
    for (const r of satirlar) {
      const u = urunBySearch(r.idSearch);
      if (!u) return alert("Ürün bulunamadı: " + r.idSearch);
      if (u.stok < Number(r.adet)) return alert(`${u.ad} için yeterli stok yok`);
    }
    // hepsi tamam ise stokları güncelle
    for (const r of satirlar) {
      const u = urunBySearch(r.idSearch);
      stokGuncelle(u.id, -Math.abs(Number(r.adet)));
    }
    // basit irsaliye için yeni pencerede yazdırılabilir içerik aç
    const html = generateIrsaliyeHtml(satirlar, urunler, restoran);
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.focus();
    // otomatik print istersen: w.print();
    router.push("/depo");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sevk (Çıkış)</h2>
      <form onSubmit={handleSevk}>
        <div style={{ marginBottom: 12 }}>
          Restoran:
          <select value={restoran} onChange={(e)=>setRestoran(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="1">Restaurant 1</option>
            <option value="2">Restaurant 2</option>
          </select>
        </div>

        {satirlar.map((s, i) => {
          const u = urunBySearch(s.idSearch);
          return (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <input placeholder="Ürün ID (kısmı)" value={s.idSearch} onChange={(e)=>setSatir(i,{idSearch:e.target.value})} />
              <div style={{ minWidth: 220 }}>{u ? u.ad : "—"}</div>
              <input type="number" value={s.adet} onChange={(e)=>setSatir(i,{adet:e.target.value})} style={{ width: 80 }} />
              <button type="button" onClick={()=>removeRow(i)} style={{ background:"transparent", color:"red", border:"none" }}>Kaldır</button>
            </div>
          );
        })}

        <div style={{ marginTop: 8 }}>
          <button type="button" onClick={addRow} style={{ marginRight: 8 }}>+ Satır Ekle</button>
          <button type="submit" style={{ background:"#ff9800", color:"#fff", border:"none", padding:"8px 12px", borderRadius:6 }}>Sevk Et & Yazdır</button>
        </div>
      </form>
    </div>
  );
}

function generateIrsaliyeHtml(satirlar, urunler, restoran) {
  const now = new Date().toLocaleString();
  const rows = satirlar.map(s => {
    const u = urunler.find(x => x.id.startsWith(s.idSearch) || x.id === s.idSearch);
    return `<tr>
      <td>${u ? u.id : s.idSearch}</td>
      <td>${u ? u.ad : "Bilinmeyen"}</td>
      <td>${s.adet}</td>
      <td>${u ? u.birim : ""}</td>
    </tr>`;
  }).join("");
  return `
    <html>
      <head>
        <title>Sevk İrsaliyesi</title>
        <style>
          body{font-family:Arial;padding:20px}
          table{width:100%;border-collapse:collapse}
          td,th{border:1px solid #ccc;padding:6px}
        </style>
      </head>
      <body>
        <h2>EMSAL GmbH - Sevk İrsaliyesi</h2>
        <div>Restoran: ${restoran}</div>
        <div>Tarih: ${now}</div>
        <table>
          <thead><tr><th>ID</th><th>Ürün</th><th>Adet</th><th>Birim</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;
}
