// components/Layout.js
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <main style={{ flex: 1 }}>
          <div className="container">{children}</div>
        </main>
        <aside style={{ width: 300, padding: 12 }}>
          <RightPanel />
        </aside>
      </div>
      <footer className="footer">© {new Date().getFullYear()} EMSAL GmbH — Tüm hakları saklıdır.</footer>
    </div>
  );
}
