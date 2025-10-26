import { useState } from "react";

export default function Depo() {
  const [filtre, setFiltre] = useState("");
  const ürünler = [
    { id: 1, kategori: "Kuru Gıda", ad: "Un", miktar: "25 kg", stok: 40 },
    { id: 2, kategori: "İçecek", ad: "Su", miktar: "1.5 lt", stok: 100 },
    { id: 3, kategori: "Et", ad: "Kıyma", miktar: "10 kg", stok: 15 },
  ];

  const filtreli = ürünler.filter(
    (u) =>
      u.ad.toLowerCase().includes(filtre.toLowerCase()) ||
      u.kategori.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Depo Yönetimi</h2>
      <input
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        placeholder="Kategori veya ürün ara..."
        className="w-full p-2 border rounded-lg mb-4"
      />

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Kategori</th>
            <th className="p-2 border">Ürün</th>
            <th className="p-2 border">Miktar</th>
            <th className="p-2 border">Stok</th>
          </tr>
        </thead>
        <tbody>
          {filtreli.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-2 border">{u.kategori}</td>
              <td className="p-2 border">{u.ad}</td>
              <td className="p-2 border">{u.miktar}</td>
              <td className="p-2 border">{u.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end space-x-4 mt-4">
        <a href="/depo/teslim" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Teslim Al</a>
        <a href="/depo/sevk" className="bg-green-500 text-white px-4 py-2 rounded-lg">Sevk Et</a>
        <a href="/depo/rapor" className="bg-gray-600 text-white px-4 py-2 rounded-lg">Raporlar</a>
      </div>
    </div>
  );
}
