// pages/depo/teslim.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useRouter } from "next/router";

export default function Teslim() {
  const router = useRouter();
  const { urunler, stokGuncelle } = useDepo();
  const [id, setId] = useState("");
  const [adet, setAdet] = useState(1);
  const [sonKullanma, setSonKullanma] = useState("");
  const [maliyet, setMaliyet] = useState("");

  const secili = urunler.find(u => u.id.startsWith(id) || u.id === id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!secili) return alert("Geçerli ürün seçin");
    stokGuncelle(secili.id, Number(adet));
    alert("Teslim alındı, stok güncellendi");
    router.push("/depo");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Teslim Alma</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexDirection: "column", maxWidth: 500 }}>
        <label>Ürün ID (id'nin başını yazabilirsiniz)</label>
        <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="ör: abc123..." />

        <div>Seçili ürün: <strong>{secili ? secili.ad : "—"}</strong></div>

        <label>Adet / Miktar</label>
        <input type="number" value={adet} onChange={(e)=>setAdet(e.target.value)} />

        <label>Son Kullanma Tarihi</label>
        <input type="date" value={sonKullanma} onChange={(e)=>setSonKullanma(e.target.value)} />

        <label>Maliyet (€)</label>
        <input type="number" step="0.01" value={maliyet} onChange={(e)=>setMaliyet(e.target.value)} />

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ padding: "8px 12px", background:"#4CAF50", color:"#fff", border:"none", borderRadius:6 }}>Teslim Al</button>
          <button type="button" onClick={()=>router.push("/depo")} style={{ padding: "8px 12px", borderRadius:6 }}>İptal</button>
        </div>
      </form>
    </div>
  );
}
