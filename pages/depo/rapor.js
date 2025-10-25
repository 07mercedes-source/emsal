// pages/depo/rapor.js
import React, { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function DepoRapor() {
  const { products } = useDepo();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Bu demo versiyonda "sevkiyat/teslim geçmişi" olmadığı için stok snapshot'larına dayanmıyoruz.
  // Gerçek uygulamada sevk/teslim loglarını ayrı bir storage'da tutmalısın.
  const downloadXlsx = () => {
    alert("Demo: Excel export fonksiyonu buraya entegre edilmeli (xlsx/js).");
  };

  return (
    <div>
      <h2>Raporlar</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={downloadXlsx}>Excel Olarak İndir</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div>Not: Demo sürümde sevk/teslim logları tutulmadığı için rapor örnekleri stok tablosundan çıkarılır.</div>
      </div>
    </div>
  );
}
