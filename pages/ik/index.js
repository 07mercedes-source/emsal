// pages/ik/index.js
import React, { useState } from "react";
import { useIK } from "../../context/IKContext";
import { useAuth } from "../../context/AuthContext";

export default function IKPage() {
  const { personnel, addPerson, updatePerson, removePerson } = useIK();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState({ sicil: "", name: "", phone: "", address: "", restaurant: "", position: "", grossSalary: 0, steuerKlasse: 1 });

  const save = () => { addPerson(form); setForm({ sicil: "", name: "", phone: "", address: "", restaurant: "", position: "", grossSalary: 0, steuerKlasse: 1 }); };

  return (
    <div className="container">
      <div className="card">
        <h3>Personel Listesi</h3>
        <table className="table">
          <thead><tr><th>Sicil</th><th>Ad Soyad</th><th>Telefon</th><th>Adres</th><th>Restoran</th><th>Görev</th><th>Brüt (€)</th><th>Steuer</th><th>İşlem</th></tr></thead>
          <tbody>
            {personnel.map(p => (
              <tr key={p.id}>
                <td><input value={p.sicil} onChange={(e)=>updatePerson(p.id,{sicil:e.target.value})}/></td>
                <td><input value={p.name} onChange={(e)=>updatePerson(p.id,{name:e.target.value})}/></td>
                <td><input value={p.phone} onChange={(e)=>updatePerson(p.id,{phone:e.target.value})}/></td>
                <td><input value={p.address} onChange={(e)=>updatePerson(p.id,{address:e.target.value})}/></td>
                <td><input value={p.restaurant} onChange={(e)=>updatePerson(p.id,{restaurant:e.target.value})}/></td>
                <td><input value={p.position} onChange={(e)=>updatePerson(p.id,{position:e.target.value})}/></td>
                <td><input type="number" value={p.grossSalary} onChange={(e)=>updatePerson(p.id,{grossSalary:Number(e.target.value)})}/></td>
                <td><input value={p.steuerKlasse} onChange={(e)=>updatePerson(p.id,{steuerKlasse:e.target.value})}/></td>
                <td>{isAdmin && <button onClick={()=>removePerson(p.id)}>Sil</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAdmin && (
          <div style={{ marginTop: 12 }}>
            <h4>Yeni Personel Ekle</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Sicil" value={form.sicil} onChange={(e)=>setForm({...form,sicil:e.target.value})}/>
              <input placeholder="Ad Soyad" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
              <input placeholder="Telefon" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})}/>
              <button onClick={save}>Ekle</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
