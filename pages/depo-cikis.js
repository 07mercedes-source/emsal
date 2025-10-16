import { useEffect, useState } from "react";

export default function DepoCikis() {
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

  const createInvoiceNo = () => `IRS-${Date.now()}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value, 10);
    const qty = parseInt(e.target.qty.value, 10);
    const target = e.target.target.value;
    const prod = products.find((p) => p.id === id);
    if (!prod) { alert("Ürün bulunamadı"); return; }
    if (qty > prod.quantity) { alert("Stokta yeterli ürün yok"); return; }
    const updated = products.map((p) => p.id === id ? { ...p, quantity: p.quantity - qty } : p);
    saveProducts(updated);
    const rec = { type: "Çıkış", id, name: prod.name, quantity: qty, date: new Date().toLocaleString("de-DE"), target, invoice: createInvoiceNo() };
    saveHistory([...history, rec]);

    // print invoice
    const html = `
      <html><head><title>Sevk İrsaliyesi</title></head><body>
      <h2>Sevk İrsaliyesi</h2>
      <p>İrsaliye No: ${rec.invoice}</p>
      <p>Tarih: ${rec.date}</p>
      <p>Hedef: ${rec.target}</p>
      <table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>ID</th><th>Ürün</th><th>Miktar</th></tr></thead><tbody><tr><td>${rec.id}</td><td>${rec.name}</td><td>${rec.quantity}</td></tr></tbody></table>
      </body></html>
    `;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
    e.target.reset();
  };

  return (
    <div>
      <h2>Sevk / Ürün Çıkışı</h2>
      <div style={{ background: "#fff", padding: 12, borderRadius: 10 }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input name="id" placeholder="Ürün ID" style={input} />
          <input name="qty" placeholder="Miktar" style={input} />
          <select name="target" style={input}>
            <option value="">Hedef Restaurant</option>
            <option value="Restaurant 1">Restaurant 1</option>
            <option value="Restaurant 2">Restaurant 2</option>
          </select>
          <button type="submit">Sevk Et & Yazdır</button>
        </form>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Çıkış Geçmişi</h3>
        <table style={{ width: "100%" }}>
          <thead><tr><th style={th}>İrsaliye</th><th style={th}>Tarih</th><th style={th}>ID</th><th style={th}>Ürün</th><th style={th}>Adet</th><th style={th}>Hedef</th></tr></thead>
          <tbody>
            {history.filter(h => h.type === "Çıkış").map((h,i) => <tr key={i}><td style={td}>{h.invoice || "-"}</td><td style={td}>{h.date}</td><td style={td}>{h.id}</td><td style={td}>{h.name}</td><td style={td}>{h.quantity}</td><td style={td}>{h.target}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const input = { padding: 8, borderRadius: 8, border: "1px solid #eef2f7" };
const th = { textAlign: "left", padding: 8, borderBottom: "1px solid #eef2f7" };
const td = { padding: 8, borderBottom: "1px solid #f3f6f9" };
