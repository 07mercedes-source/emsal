// pages/rapor.js
import React, { useState } from "react";

export default function Rapor() {
  const [filtre, setFiltre] = useState("");
  const veriler = [
    { id: 1, ürün: "Un", miktar: "25 kg", tarih: "2025-10-20" },
    { id: 2, ürün: "Şeker", miktar: "10 kg", tarih: "2025-10-21" },
    { id: 3, ürün: "Yağ", miktar: "5 lt", tarih: "2025-10-22" },
  ];

  const filtrelenmiş = veriler.filter((v) =>
    v.ürün.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Depo Raporları</h1>

        <input
          type="text"
          placeholder="Ürün ara..."
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />

        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Ürün</th>
              <th className="border p-2 text-left">Miktar</th>
              <th className="border p-2 text-left">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {filtrelenmiş.map((v) => (
              <tr key={v.id} className="hover:bg-gray-100">
                <td className="border p-2">{v.ürün}</td>
                <td className="border p-2">{v.miktar}</td>
                <td className="border p-2">{v.tarih}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Depo Yönetim Sistemi
      </footer>
    </div>
  );
}
