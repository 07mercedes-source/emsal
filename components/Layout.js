 // components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", fontFamily: "Inter, Arial, sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, padding: 20, marginRight: 320 }}>{children}</main>
        <RightPanel />
      </div>
      <footer style={{ textAlign: "center", padding: "12px 8px", background: "#0b1220", color: "#cfe0ff" }}>
        © {new Date().getFullYear()} EMSAL GmbH — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
