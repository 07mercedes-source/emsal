// pages/ik/index.js
import { useIK } from "../../context/IKContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function IKPage() {
  const { personnel } = useIK();
  const router = useRouter();

  return (
    <div>
      <h1>İnsan Kaynakları</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => router.push("/ik/avans")}>💰 Avans Talebi</button>
        <button onClick={() => router.push("/ik/izin")}>🏖️ Yıllık İzin</button>
      </div>

      <div style={{ borderTop: "1px solid #eee", paddingTop: 8 }}>
        <div style={{ fontWeight: 700, display: "grid", gridTemplateColumns: "120px 200px 140px 120px 120px", gap: 8 }}>
          <div>Sicil</div><div>Ad Soyad</div><div>Telefon</div><div>Restoran</div><div>Maaş (€)</div>
        </div>
        {personnel.map(p => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "120px 200px 140px 120px 120px", gap: 8, padding: 6, borderBottom: "1px solid #f5f7fb" }}>
            <div>{p.id}</div><div>{p.name}</div><div>{p.phone}</div><div>{p.restaurant}</div><div>€{p.grossSalary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
