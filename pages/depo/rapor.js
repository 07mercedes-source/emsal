// pages/rapor.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Rapor() {
  const [filtre, setFiltre] = useState("");
  const [veriler, setVeriler] = useState([
    { id: 1, ürün: "Un", miktar: "25 kg", tarih: "2025-10-20" },
    { id: 2, ürün: "Şeker", miktar: "10 kg", tarih: "2025-10-21" },
    { id: 3, ürün: "Yağ", miktar: "5 lt", tarih: "2025-10-22" },
  ]);

  const filtrelenmiş = veriler.filter((v) =>
    v.ürün.toLowerCase().includes(filtre.toLowerCase())
  );

  const dışaAktar = async (format) => {
    if (format === "excel") {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(veriler);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Rapor");
      XLSX.writeFile(wb, "rapor.xlsx");
    } else if (format === "pdf") {
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["Ürün", "Miktar", "Tarih"]],
        body: veriler.map((v) => [v.ürün, v.miktar, v.tarih]),
      });
      doc.save("rapor.pdf");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Depo Raporları</h1>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Ürün ara..."
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
            />
            <Button onClick={() => dışaAktar("excel")}>Excel</Button>
            <Button onClick={() => dışaAktar("pdf")}>PDF</Button>
          </div>
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Ürün</th>
                <th className="p-2 border">Miktar</th>
                <th className="p-2 border">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmiş.map((v) => (
                <tr key={v.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{v.ürün}</td>
                  <td className="p-2 border">{v.miktar}</td>
                  <td className="p-2 border">{v.tarih}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Depo Yönetim Sistemi
      </footer>
    </div>
  );
}
