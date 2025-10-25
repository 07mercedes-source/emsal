// pages/depo/index.js
import Link from "next/link";
import { useDepo } from "../../context/DepoContext";
import { useState } from "react";

export default function DepoPage() {
  const { filtre, setFiltre, filtrelenmis, urunSil, urunEkle, urunDuzenle } = useDepo();
  const [yeni, setYeni] = useState({ ad: "", stok: 0, birim: "", kategori: "Et", maliyet: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!yeni.ad) return alert("Ürün adı gerekli");
    urunEkle(yeni);
    setYeni({ ad: "", stok: 0, birim: "", kategori: "Et", maliyet: 0 });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Depo</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Link href="/depo/teslim"><button style={btn}>📦 Teslim Alma</button></Link>
        <Link href="/depo/cikis"><button style={btnOrange}>🚚 Sevk Et</button></Link>
        <Link href="/depo/rapor"><button style={btnGreen}>📊 Raporlar</button></Link>
      </div>

      <div style={{ marginBottom: 12 }}>
        {["Tümü", "Et", "İçecek", "Kuru Gıda", "Alkol"].map((k) => (
          <button key={k} onClick={() => setFiltre(k)} style={{ ...filterBtn, background: filtre === k ? "#0ea5e9" : "#e5e7eb" }}>
            {k}
          </button>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
        <thead style={{ background: "#0f172a", color: "#fff", textAlign: "left" }}>
          <tr>
            <th style={th}>Ürün ID</th>
            <th style={th}>Ad</th>
            <th style={th}>Kategori</th>
            <th style={th}>Stok</th>
            <th style={th}>Birim</th>
            <th style={th}>Maliyet (€)</th>
            <th style={th}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filtrelenmis.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={tdSmall}>{u.id.slice(0, 8)}</td>
              <td style={td}>{u.ad}</td>
              <td style={td}>{u.kategori}</td>
              <td style={tdSmall}>{u.stok}</td>
              <td style={tdSmall}>{u.birim}</td>
              <td style={tdSmall}>{Number(u.maliyet).toFixed(2)}</td>
              <td style={tdSmall}>
                <button onClick={() => urunSil(u.id)} style={rowBtnDel}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Yeni Ürün Ekle</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input placeholder="Ad" value={yeni.ad} onChange={(e)=>setYeni({...yeni,ad:e.target.value})} />
        <input placeholder="Stok" type="number" value={yeni.stok} onChange={(e)=>setYeni({...yeni,stok:e.target.value})} />
        <input placeholder="Birim" value={yeni.birim} onChange={(e)=>setYeni({...yeni,birim:e.target.value})} />
        <input placeholder="Maliyet (€)" type="number" step="0.01" value={yeni.maliyet} onChange={(e)=>setYeni({...yeni,maliyet:e.target.value})} />
        <select value={yeni.kategori} onChange={(e)=>setYeni({...yeni,kategori:e.target.value})}>
          <option>Et</option>
          <option>İçecek</option>
          <option>Kuru Gıda</option>
          <option>Alkol</option>
        </select>
        <button type="submit" style={btnAdd}>➕ Ekle</button>
      </form>
    </div>
  );
}

// stil değişkenleri
const btn = { padding: "8px 12px", borderRadius: 6, border: "none", background: "#2196F3", color: "#fff", cursor: "pointer" };
const btnOrange = {...btn, background:"#ff9800"};
const btnGreen = {...btn, background:"#4CAF50"};
const btnAdd = {...btn, background:"#0ea5e9"};
const filterBtn = { padding: "6px 10px", borderRadius: 6, border: "none", cursor: "pointer" };
const th = { padding: "8px 10px" };
const td = { padding: "8px 10px" };
const tdSmall = { padding: "8px 6px", fontSize: 13 };
const rowBtnDel = { background: "transparent", color: "red", border: "none", cursor: "pointer" };
