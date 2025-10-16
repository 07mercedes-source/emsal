// pages/ik/index.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function IKPersonnelPage(){
  const { personnel, setPersonnel } = useIK();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (personnel||[]).filter(p =>
    (p.name||"").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.title||"").toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(p.id).includes(searchTerm)
  );

  const add = () => {
    const newId = personnel.length ? Math.max(...personnel.map(x=>x.id))+1 : 101;
    setPersonnel([...personnel, { id:newId, name:"", title:"", salary:0, hireDate:new Date().toISOString().slice(0,10) }]);
  };
  const change = (id, field, value) => setPersonnel(personnel.map(p=>p.id===id?{...p,[field]: field==="salary"?Number(value):value}:p));
  const remove = id => { if(confirm("Silinsin mi?")) setPersonnel(personnel.filter(p=>p.id!==id)); };

  return (
    <div>
      <div className="top-row">
        <h2>👨‍💼 Personel Listesi</h2>
        <div style={{display:"flex", gap:8}}>
          <button className="btn" style={{background:"#2563eb", color:"#fff"}} onClick={add}>➕ Yeni Personel</button>
          <input placeholder="Ara (Ad/Ünvan/ID)" className="input-cell" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="table-card">
        <table className="table">
          <thead><tr><th>ID</th><th>Adı</th><th>Ünvan</th><th>Maaş (€)</th><th>İşe Giriş</th><th>Aksiyon</th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><input className="input-cell" value={p.name} onChange={e=>change(p.id,"name",e.target.value)} /></td>
                <td><input className="input-cell" value={p.title} onChange={e=>change(p.id,"title",e.target.value)} /></td>
                <td><input className="input-cell" type="number" value={p.salary} onChange={e=>change(p.id,"salary",e.target.value)} /></td>
                <td><input className="input-cell" type="date" value={p.hireDate} onChange={e=>change(p.id,"hireDate",e.target.value)} /></td>
                <td><button className="btn" style={{background:"#ef4444", color:"#fff"}} onClick={()=>remove(p.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
