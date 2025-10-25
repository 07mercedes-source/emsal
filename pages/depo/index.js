import { useDepo } from "../../context/DepoContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function DepoPage() {
  const { urunler, urunEkle, urunSil } = useDepo() || {};
  const { user } = useAuth() || {};
  const [filtre, setFiltre] = useState("Tümü");
  const [yeniUrun, setYeniUrun] = useState({ ad: "", kategori: "", miktar: 0, birim: "" });

  if (!urunler) return <div style={{ color: "white" }}>Depo yükleniyor...</div>;

  const filtreli = filtre === "Tümü" ? urunler : urunler.filter((u) => u.kategori === filtre);

  return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h1>📦 Depo Modülü</h1>

      <div style={{ marginBottom: 10 }}>
        <label>Filtre: </label>
        <select value={filtre} onChange={(e) => setFiltre(e.target.value)}>
          <option>Tümü</option>
          <option>Et</option>
          <option>İçecek</option>
          <option>Kuru Gıda</option>
          <option>Süt Ürünü</option>
        </select>
      </div>

      {user?.role === "Yönetici" && (
        <div style={{ marginBottom: 10 }}>
          <input placeholder="Ürün Adı" onChange={(e) => setYeniUrun({ ...yeniUrun, ad: e.target.value })} />
          <input placeholder="Kategori" onChange={(e) => setYeniUrun({ ...yeniUrun, kategori: e.target.value })} />
          <input type="number" placeholder="Miktar" onChange={(e) => setYeniUrun({ ...yeniUrun, miktar: e.target.value })} />
          <input placeholder="Birim" onChange={(e) => setYeniUrun({ ...yeniUrun, birim: e.target.value })} />
          <button onClick={() => urunEkle(yeniUrun)}>Ekle</button>
        </div>
      )}

      <table border="1" cellPadding="6" style={{ width: "100%", background: "#0f172a", color: "#fff" }}>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Kategori</th>
            <th>Miktar</th>
            <th>Birim</th>
            {user?.role === "Yönetici" && <th>Sil</th>}
          </tr>
        </thead>
        <tbody>
          {filtreli.map((u) => (
            <tr key={u.id}>
              <td>{u.ad}</td>
              <td>{u.kategori}</td>
              <td>{u.miktar}</td>
              <td>{u.birim}</td>
              {user?.role === "Yönetici" && <td><button onClick={() => urunSil(u.id)}>❌</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
