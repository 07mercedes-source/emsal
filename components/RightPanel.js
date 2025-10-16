// components/RightPanel.js
import React from "react";
import { useRestaurantData } from "../context/RestaurantContext";

export default function RightPanel(){
  let r1 = [], r2 = [];
  try {
    const ctx = useRestaurantData();
    r1 = ctx.restaurant1 || [];
    r2 = ctx.restaurant2 || [];
  } catch(e){ /* provider yoksa boş */ }

  const sum = arr => arr.reduce((s, it) => s + (Number(it.amount)||0), 0);
  const total1 = sum(r1), total2 = sum(r2);

  return (
    <aside style={{
      position:"fixed",
      right:0,
      top:60,              /* <-- navbar yüksekliği ile eşitlendi */
      width:300,
      height:"calc(100vh - 60px)",
      background:"#fff",
      borderLeft:"1px solid #e6eef7",
      padding:16,
      overflowY:"auto",
      zIndex:900
    }}>
      <h4 style={{margin:0, marginBottom:8}}>📊 Aktif Ay Ciro</h4>

      <div style={{fontSize:14, marginBottom:12}}>
        <div style={{display:"flex", justifyContent:"space-between"}}><span>Restaurant 1</span><strong>{new Intl.NumberFormat('de-DE').format(total1)} €</strong></div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:6}}><span>Restaurant 2</span><strong>{new Intl.NumberFormat('de-DE').format(total2)} €</strong></div>
        <hr style={{margin:"10px 0"}} />
        <div style={{display:"flex", justifyContent:"space-between"}}><span>Toplam</span><strong>{new Intl.NumberFormat('de-DE').format(total1+total2)} €</strong></div>
      </div>

      <div style={{fontSize:13, color:"#555"}}>
        <div>🌤️ Berlin Hava Durumu: 18°C, Açık</div>
        <div style={{marginTop:8}}>📅 {new Date().toLocaleDateString('de-DE')}</div>
      </div>
    </aside>
  );
}
