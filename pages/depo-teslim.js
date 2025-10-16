import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";

export default function DepoTeslim() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const s = localStorage.getItem("emsal_products");
    if (s) setProducts(JSON.parse(s));
    const h = localStorage.getItem("emsal_history");
    if (h) setHistory(JSON.parse(h));
  }, []);

  const saveProducts = (p) => {
    setProducts(p);
    localStorage.setItem("emsal_products", JSON.stringify(p));
  };

  const saveHistory = (h) => {
    setHistory(h);
    localStorage.setItem("emsal_history", JSON.stringify(h));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value, 10);
    const qty = parseInt(e.target.qty.value, 10);
    const cost = parseFloat(e.target.cost.value) || 0;
    const expiry = e.target.expiry.value;
    const prod = products.find((x) => x.id === id);
    if (!prod) { alert("Ürün bulunamadı"); return; }
    const updated = products.map((p) => p.id === id ? { ...p, quantity: p.quantity + qty, cost: cost.toFixed(2), expiry: expiry || p.expiry } : p);
    saveProducts(updated);
    const rec = { type: "Giriş", id, name: prod.name, quantity: qty, date: new Date().toLocaleString("de-DE"), note: "Teslim Alma" };
    saveHistory([...history, rec]);
    e.target.reset();
  };

  return (
    <div>
      <h2>Depo Teslim Alma</h2>
      <div style={{ background: "#fff", padding: 12, borderRadius: 10 }}>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input name="id" placeholder="Ürün ID" style={input} />
          <input name="qty" placeholder="Adet" style={input} />
          <input name="cost" placeholder="Maliyet (€)" style={input} />
          <input name="expiry" placeholder="Son Kullanma (YYYY-MM-DD)" style={input} />
          <button type="submit">Stok Güncelle</button>
        </form>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Güncel Stok</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={th}>ID</th><th style={th}>Ürün</th><th style={th}>Miktar</th></tr></thead>
          <tbody>
            {products.map(p => <tr key={p.id}><td style={td}>{p.id}</td><td style={td}>{p.name}</td><td style={td}>{p.quantity}</td></tr>)}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Giriş Geçmişi</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={th}>Tarih</th><th style={th}>ID</th><th style={th}>Ürün</th><th style={th}>Adet</th></tr></thead>
          <tbody>
            {history.filter(h => h.type === "Giriş").map((h,i) => <tr key={i}><td style={td}>{h.date}</td><td style={td}>{h.id}</td><td style={td}>{h.name}</td><td style={td}>{h.quantity}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const input = { padding: 8, borderRadius: 8, border: "1px solid #eef2f7" };
const th = { textAlign: "left", padding: 8, borderBottom: "1px solid #eef2f7" };
const td = { padding: 8, borderBottom: "1px solid #f3f6f9" };
