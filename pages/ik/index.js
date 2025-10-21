// pages/ik/index.js
import React, { useState } from "react";
import { useIK } from "../../context/IKContext";
import { useLanguage } from "../../context/LanguageContext";

export default function IKPage() {
  const { personnel, addPerson, updatePerson, removePerson } = useIK();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = (personnel || []).filter(p =>
    `${p.name} ${p.position} ${p.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => addPerson({ name: "", registry: "", address: "", phone: "", restaurant: "", position: "", salary: 0, steuerklasse: "1", hireDate: "", leaveDate: "" });

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{t("personnel")}</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleAdd} style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", borderRadius: 8 }}>➕ Yeni Personel Ekle</button>
        </div>

        <input placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "8px", borderRadius: 8, border: "1px solid #ddd", width: 240 }} />
      </div>

      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: 10 }}>Sicil</th>
              <th style={{ padding: 10 }}>Ad Soyad</th>
              <th style={{ padding: 10 }}>Telefon</th>
              <th style={{ padding: 10 }}>Adres</th>
              <th style={{ padding: 10 }}>Restaurant</th>
              <th style={{ padding: 10 }}>Pozisyon</th>
              <th style={{ padding: 10 }}>Brüt (€)</th>
              <th style={{ padding: 10 }}>Steuer</th>
              <th style={{ padding: 10 }}>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 10 }}><input value={p.registry} onChange={(e) => updatePerson(p.id, { registry: e.target.value })} style={{ width: 90 }} /></td>
                <td style={{ padding: 10 }}><input value={p.name} onChange={(e) => updatePerson(p.id, { name: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input value={p.phone} onChange={(e) => updatePerson(p.id, { phone: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input value={p.address} onChange={(e) => updatePerson(p.id, { address: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input value={p.restaurant} onChange={(e) => updatePerson(p.id, { restaurant: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input value={p.position} onChange={(e) => updatePerson(p.id, { position: e.target.value })} /></td>
                <td style={{ padding: 10 }}><input type="number" value={p.salary} onChange={(e) => updatePerson(p.id, { salary: Number(e.target.value) })} style={{ width: 100 }} /></td>
                <td style={{ padding: 10 }}><input value={p.steuerklasse} onChange={(e) => updatePerson(p.id, { steuerklasse: e.target.value })} style={{ width: 70 }} /></td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => removePerson(p.id)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6 }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
