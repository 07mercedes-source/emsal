// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, padding: "20px", marginRight: 280 }}>{children}</main>
        <RightPanel />
      </div>
      <footer style={{ textAlign: "center", padding: "12px 8px", background: "#f5f7fb", color: "#333" }}>
        © {new Date().getFullYear()} EMSAL GmbH — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
