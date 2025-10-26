import { useDepo } from "@/context/DepoContext";
import { useState } from "react";

export default function DepoPage() {
  const { urunler, urunEkle, urunSil, kategoriler } = useDepo();
  const [filtre, setFiltre] = useState("Tümü");
  const [yeni, setYeni] = useState({ ad: "", kategori: "Et", miktar: "", birim: "kg" });

  const list = filtre === "Tümü" ? urunler : urunler.filter((u) => u.kategori === filtre);

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Depo Yönetimi</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {kategoriler.map((k) => (
          <button
            key={k}
            onClick={() => setFiltre(k)}
            className={`px-3 py-1 rounded ${filtre === k ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-slate-200">
              <th className="p-2">Ad</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Miktar</th>
              <th className="p-2">Birim</th>
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.ad}</td>
                <td className="p-2">{u.kategori}</td>
                <td className="p-2">{u.miktar}</td>
                <td className="p-2">{u.birim}</td>
                <td className="p-2">
                  <button
                    onClick={() => urunSil(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Yeni Ürün Ekle</h3>
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Ad"
          className="border rounded p-1"
          value={yeni.ad}
          onChange={(e) => setYeni({ ...yeni, ad: e.target.value })}
        />
        <select
          className="border rounded p-1"
          value={yeni.kategori}
          onChange={(e) => setYeni({ ...yeni, kategori: e.target.value })}
        >
          {kategoriler.filter(k=>k!=="Tümü").map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <input
          placeholder="Miktar"
          type="number"
          className="border rounded p-1 w-24"
          value={yeni.miktar}
          onChange={(e) => setYeni({ ...yeni, miktar: e.target.value })}
        />
        <input
          placeholder="Birim"
          className="border rounded p-1 w-20"
          value={yeni.birim}
          onChange={(e) => setYeni({ ...yeni, birim: e.target.value })}
        />
        <button onClick={() => urunEkle(yeni)}>Ekle</button>
      </div>
    </div>
  );
}
