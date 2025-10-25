// pages/ik/index.js
import { useIK } from "../../context/IKContext";
import { useState } from "react";
import Link from "next/link";

export default function IKPage() {
  const { personnel, addPerson, updatePerson, removePerson, sendRequestMail } = useIK();
  const [newP, setNewP] = useState({ sicil:"", name:"", phone:"", address:"", restaurant:"Restaurant 1", position:"", gross:2000, steuer:"1" });

  return (
    <div>
      <h2>İnsan Kaynakları</h2>

      <div style={{ marginBottom: 12 }}>
        <strong>Yeni Personel Ekle</strong>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input placeholder="Sicil" value={newP.sicil} onChange={e=>setNewP({...newP, sicil:e.target.value})} />
          <input placeholder="Ad Soyad" value={newP.name} onChange={e=>setNewP({...newP, name:e.target.value})} />
          <select value={newP.restaurant} onChange={e=>setNewP({...newP, restaurant:e.target.value})}><option>Restaurant 1</option><option>Restaurant 2</option></select>
          <button onClick={() => { addPerson(newP); setNewP({ sicil:"", name:"", phone:"", address:"", restaurant:"Restaurant 1", position:"", gross:2000, steuer:"1" }); }}>Ekle</button>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <Link href="/ik/izin"><button>Yıllık İzin Talebi</button></Link>
        <Link href="/ik/avans"><button style={{ marginLeft: 8 }}>Avans Talebi</button></Link>
      </div>

      <table style={{ width: "100%" }}>
        <thead><tr><th>Sicil</th><th>Ad Soyad</th><th>Telefon</th><th>Restaurant</th><th>Görev</th><th>Brüt (€)</th><th>İşlem</th></tr></thead>
        <tbody>
          {personnel.map(p => (
            <tr key={p.id}>
              <td>{p.sicil}</td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>{p.restaurant}</td>
              <td>{p.position}</td>
              <td>{p.gross}</td>
              <td>
                <button onClick={()=>{ const n = prompt("Yeni brüt maaş", p.gross); if(n!=null) updatePerson(p.id, { gross: Number(n) }); }}>Düzenle</button>
                <button onClick={()=>{ if(confirm("Silinsin mi?")) removePerson(p.id); }} style={{ marginLeft: 8 }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
