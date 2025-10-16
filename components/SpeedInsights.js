import React, { useState, useEffect } from "react";

const SpeedInsights = () => {
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((Math.random() * 100).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      width: "200px",
      textAlign: "center",
      margin: "10px auto",
      background: "#f9f9f9"
    }}>
      <h4 style={{ margin: 6 }}>Speed Insights</h4>
      <p style={{ margin: 0 }}>{speed ? `${speed} Mbps` : "Loading..."}</p>
    </div>
  );
};

export default SpeedInsights;
