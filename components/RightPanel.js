// components/RightPanel.js
import { useEffect, useState } from "react";

export default function RightPanel() {
  const [weather, setWeather] = useState({ temp: 18, desc: "Açık" });
  const [today, setToday] = useState(new Date());

  useEffect(()=> {
    const t = setInterval(()=> setToday(new Date()), 60_000);
    return ()=> clearInterval(t);
  },[]);

  // Örnek ciro verileri (localStorage'dan çekilebilir)
  const [r1Total, setR1Total] = useState(() => Number(localStorage.getItem("r1_total") || 0));
  const [r2Total, setR2Total] = useState(() => Number(localStorage.getItem("r2_total") || 0));

  return (
    <div className="card" style={{ width: 260 }}>
      <h4 style={{ margin: 0, marginBottom:6 }}>🌤️ Berlin Hava Durumu</h4>
      <div style={{ fontSize:18, fontWeight:700 }}>{weather.temp}°C — {weather.desc}</div>

      <hr style={{ margin: "10px 0" }} />

      <h4 style={{ margin: 0, marginBottom:6 }}>📅 Takvim</h4>
      <div>{today.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
      <div style={{ color:"#6b7280", marginTop:8 }}>{today.toLocaleString("tr-TR", { weekday: "long" })}</div>

      <hr style={{ margin: "10px 0" }} />
      <h4 style={{ margin:0, marginBottom:6 }}>📊 Aylık Ciro</h4>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div>Restaurant 1</div><div>€ {r1Total.toLocaleString()}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <div>Restaurant 2</div><div>€ {r2Total.toLocaleString()}</div>
      </div>
    </div>
  );
}
