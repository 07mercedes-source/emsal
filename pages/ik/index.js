// pages/ik/index.js
import { useIK } from "../../context/IKContext";
import { useState } from "react";

export default function IKPage(){
  const { personnel, add, update, remove } = useIK();
  const [newP, setNewP] = useState({ sicil:"", name:"", phone:"", address:"", restaurant:"Restaurant 1", position:"Garson", gross:2000 });

  const addNew = ()=>{ if(!newP.name) return; add(newP); setNewP({ sicil:"", name:"", phone:"", address:"", restaurant:"Restaurant 1", position:"Garson", gross:2000 }); };

  const requestLeave = (p) => {
    const mailto = `mailto:07mercedes@gmail.com?subject=İzin Talebi&body=Sicil:${p.sicil}%0Aİsim:${p.name}%0ATalep:%0A`;
    window.location.href = mailto;
  };

  const requestAdvance = (p) => {
    const mailto = `mailto:07mercedes@gmail.com?subject=Avans Talebi&body=Sicil:${p.sicil}%0Aİsim:${p.name}%0ATutar:%0A`;
    window.location.href = mailto;
  };

  return (
    <div>
      <h2 className="h1">İnsan Kaynakları</h2>

      <div className="card">
        <h3 className="h2">Personeller</h3>
        <table className="table">
          <thead><tr><th>Sicil</th><th>Ad Soyad</th><th>Telefon</th><th>Restoran</th><th>Görev</th><th>Maaş (€)</th><th>İşlem</th></tr></thead>
          <tbody>
            {personnel.map(p=>(
              <tr key={p.id}>
                <td>{p.sicil}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.restaurant}</td>
                <td>{p.position}</td>
                <td>{p.gross}</td>
                <td>
                  <button className="button ghost" onClick={()=>requestLeave(p)}>İzin Talep</button>
                  <button className="button" style={{marginLeft:8}} onClick={()=>requestAdvance(p)}>Avans Talep</button>
                </td>
              </tr>
            ))}
            <tr>
              <td><input value={newP.sicil} onChange={e=>setNewP({...newP,sicil:e.target.value})} /></td>
              <td><input value={newP.name} onChange={e=>setNewP({...newP,name:e.target.value})} /></td>
              <td><input value={newP.phone} onChange={e=>setNewP({...newP,phone:e.target.value})} /></td>
              <td><select value={newP.restaurant} onChange={e=>setNewP({...newP,restaurant:e.target.value})}><option>Restaurant 1</option><option>Restaurant 2</option></select></td>
              <td><input value={newP.position} onChange={e=>setNewP({...newP,position:e.target.value})} /></td>
              <td><input type="number" value={newP.gross} onChange={e=>setNewP({...newP,gross:Number(e.target.value)})} /></td>
              <td><button className="button" onClick={addNew}>➕ Ekle</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
