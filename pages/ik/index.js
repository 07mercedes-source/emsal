// pages/ik/index.js
import Link from "next/link";
import { useIK } from "../../context/IKContext";

export default function IKPage(){
  const { personnel } = useIK();
  return (
    <div className="card">
      <h2>İnsan Kaynakları — Personel Listesi</h2>
      <table className="table">
        <thead><tr><th>Sicil</th><th>Ad</th><th>Pozisyon</th><th>Restaurant</th></tr></thead>
        <tbody>
          {personnel.map(p=> <tr key={p.id}><td>{p.sicil}</td><td>{p.name}</td><td>{p.position}</td><td>{p.restaurant}</td></tr>)}
        </tbody>
      </table>

      <div style={{ marginTop:12 }}>
        <Link href="/ik/avans"><button className="btn btn-primary">Avans Talebi</button></Link>
        <Link href="/ik/izin"><button className="btn" style={{ marginLeft:8 }}>Yıllık İzin</button></Link>
      </div>
    </div>
  );
}
