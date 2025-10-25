import { useDepo } from "../../context/DepoContext";
import { useState } from "react";

export default function Depo() {
  const { filtre, setFiltre, filtrelenmis, urunSil, urunEkle } = useDepo();
  const [yeni, setYeni] = useState({ ad: "", stok: "", birim: "", kategori: "Et" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!yeni.ad || !yeni.stok) return;
    urunEkle(yeni);
    setYeni({ ad: "", stok: "", birim: "", kategori: "Et" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Depo Modülü</h2>

      {/* Filtre */}
      <div style={{ marginBottom: 12 }}>
        {["Tümü", "Et", "İçecek", "Kuru Gıda", "Alkol"].map((k) => (
          <button
            key={k}
            onClick={() => setFiltre(k)}
            style={{
              margin: 4,
              padding: "6px 10px",
              background: filtre === k ? "#0ea5e9" : "#e5e7eb",
              border: "none",
              borderRadius: 6
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Ürün Listesi */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#0f172a", color: "#fff" }}>
          <tr>
            <th>Ad</th><th>Kategori</th><th>Stok</th><th>Birim</th><th></th>
          </tr>
        </thead>
        <tbody>
          {filtrelenmis.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{u.ad}</td>
              <td>{u.kategori}</td>
              <td>{u.stok}</td>
              <td>{u.birim}</td>
              <td>
                <button onClick={() => urunSil(u.id)} style={{ color: "red" }}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Yeni Ürün */}
      <h3 style={{ marginTop: 20 }}>Yeni Ürün Ekle</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Ad"
          value={yeni.ad}
          onChange={(e) => setYeni({ ...yeni, ad: e.target.value })}
        />
        <input
          placeholder="Stok"
          type="number"
          value={yeni.stok}
          onChange={(e) => setYeni({ ...yeni, stok: e.target.value })}
        />
        <input
          placeholder="Birim"
          value={yeni.birim}
          onChange={(e) => setYeni({ ...yeni, birim: e.target.value })}
        />
        <select
          value={yeni.kategori}
          onChange={(e) => setYeni({ ...yeni, kategori: e.target.value })}
        >
          <option>Et</option>
          <option>İçecek</option>
          <option>Kuru Gıda</option>
          <option>Alkol</option>
        </select>
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}
