// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-6 mr-72">{children}</main>
        <RightPanel />
      </div>
      <footer className="text-center p-3 bg-white border-t">
        © {new Date().getFullYear()} EMSAL GmbH — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
