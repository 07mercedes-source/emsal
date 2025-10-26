// components/Layout.js
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, padding: 20, maxWidth: 1200, margin: "0 auto" }}>{children}</main>
        <aside className="sidebar-right" style={{ background: "transparent" }}>
          <RightPanel />
        </aside>
      </div>
      <footer className="footer">© {new Date().getFullYear()} EMSAL GmbH — Tüm hakları saklıdır.</footer>
    </div>
  );
}
