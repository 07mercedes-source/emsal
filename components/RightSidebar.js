"use client";
import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RightSidebar({ restaurantData }) {
  const [weather, setWeather] = useState(null);
  const [month] = useState(new Date().toLocaleString("default", { month: "long" }));

  useEffect(() => {
    fetch(`https://wttr.in/Berlin?format=%t`)
      .then(res => res.text())
      .then(setWeather)
      .catch(() => setWeather("N/A"));
  }, []);

  return (
    <aside className="w-1/4 bg-white border-l border-gray-200 p-4 flex flex-col space-y-4">
      <div className="text-center text-gray-700 font-semibold">🌤 Berlin Hava Durumu: {weather}</div>
      <div className="text-center font-semibold text-gray-700">🗓 {month} Takvimi</div>
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-700">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="border text-center p-1 rounded">
            {i + 1}
          </div>
        ))}
      </div>
      <div>
        <h2 className="font-semibold text-center mt-4 mb-2">📊 Restoran Ciro Grafiği</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={restaurantData}>
            <Line type="monotone" dataKey="ciro" stroke="#0a1d40" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="gun" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </aside>
  );
}
