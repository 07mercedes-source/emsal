// pages/depo/sevk.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";

const STORAGE = "emsal_products_v2";
const HISTORY = "emsal_history_v2";

export default function Sevk() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [pid, setPid] = useState("");
  const [qty, setQty] = useState(0);
  const [cart, setCart] = useState([]);
  const [target, setTarget] = useState("");

  useEffect(()=> {
    try { setProducts(JSON.parse(localStorage.getItem(STORAGE) || "[]")); } catch { setProducts([]); }
  }, []);

  useEffect(()=> localStorage.setItem(STORAGE, JSON.stringify(products)), [products]);

  const addToCart = (id, q) => {
    const prod = products.find(p=>p.id === Number(id));
    if (!prod) { alert("Ürün bulunamadı"); return; }
    if (!q || q <= 0) { alert("Adet girin"); return; }
    setCart(prev => [...prev, { id: prod.id, name: prod.name, qty: Number(q) }]);
    setPid(""); setQty(0);
  };

  const removeFromCart = (i) => setCart(prev => prev.filter((_,idx)=>idx!==i));

  const dispatchNow = () => {
    if (!target) { alert("Hedef seçin"); return; }
    if (!cart.length) { alert("Sepet boş"); return; }
    // update products
    const updated = products.map(p => {
      const totalOut = cart.filter(c=>c.id===p.id).reduce((s,c)=>s+c.qty,0);
      return { ...p, quantity: (Number(p.quantity)||0) - totalOut };
    });
    setProducts(updated);
    // history + invoice
    const invoice = `IRS-${Date.now()}`;
    const hist = JSON.parse(localStorage.getItem(HISTORY) || "[]");
    const date = new Date().toISOString();
    cart.forEach(it => hist.push({ type:"cikis", id: it.id, name: it.name, qty: it.qty, date, target, invoice }));
    localStorage.setItem(HISTORY, JSON.stringify(hist));
    // restaurant ledger add (gider entries) if target rest1/rest2
    if (target === "Restaurant 1") {
      const rest = JSON.parse(localStorage.getItem("emsal_rest1_v1") || "[]");
      cart.forEach(it => rest.push({ id: Date.now()+Math.floor(Math.random()*999), date: date.slice(0,10), type:"gider", desc:`Mal sevki (id:${it.id})`, amount:0 }));
      localStorage.setItem("emsal_rest1_v1", JSON.stringify(rest));
    } else if (target === "Restaurant 2") {
      const rest = JSON.parse(localStorage.getItem("emsal_rest2_v1") || "[]");
      cart.forEach(it => rest.push({ id: Date.now()+Math.floor(Math.random()*999), date: date.slice(0,10), type:"gider", desc:`Mal sevki (id:${it.id})`, amount:0 }));
      localStorage.setItem("emsal_rest2_v1", JSON.stringify(rest));
    }

    // print invoice window
    const rows = cart.map(it=>`<tr><td>${it.id}</td><td>${it.name}</td><td style="text-align:right">${it.qty}</td></tr>`).join("");
    const html = `
      <html>
      <head><title>Sevk İrsaliyesi ${invoice}</title><style>body{font-family:Arial;padding:20px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #333;padding:8px}</style></head>
      <body>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h2>Sevk İrsaliyesi</h2>
            <div>İrsaliye No: ${invoice}</div>
            <div>Tarih: ${new Date().toLocaleString()}</div>
            <div>Hedef: ${target}</div>
          </div>
          <div><img src="/logo.png" alt="logo" style="height:70px"/></div>
        </div>
        <table style="margin-top:20px"><thead><tr><th>ID</th><th>Ürün</th><th style="text-align:right">Adet</th></tr></thead><tbody>${rows}</tbody></table>
        <p style="margin-top:24px">İmza: ____________________</p>
      </body>
      </html>
    `;
    const w = window.open("", "_blank");
    w.document.write(html); w.document.close(); w.print();
    setCart([]);
    alert("Sevk tamamlandı, stok güncellendi.");
  };

  return (
    <div style={{ background:"#fff", padding:16, borderRadius:10 }}>
      <h2>Sevk / Çıkış</h2>

      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
        <input placeholder="Ürün ID" value={pid} onChange={e=>setPid(e.target.value)} className="cell-input" style={{ width:120 }} />
        <input placeholder="Adet" type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} className="cell-input" style={{ width:120 }} />
        <button onClick={()=>addToCart(pid, qty)} className="primary">Sepete Ekle</button>
      </div>

      <div style={{ display:"flex", gap:12 }}>
        <div style={{ flex:1 }}>
          <h3>Sepet</h3>
          <table className="excel-table">
            <thead><tr><th>ID</th><th>Ürün</th><th>Adet</th><th>İşlem</th></tr></thead>
            <tbody>
              {cart.map((c,i)=>(
                <tr key={i}>
                  <td>{c.id}</td><td>{c.name}</td><td style={{ textAlign:"right" }}>{c.qty}</td>
                  <td><button onClick={()=>removeFromCart(i)} className="small" style={{ background:"#ef4444" }}>Kaldır</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width:320 }}>
          <h3>Sevk Bilgileri</h3>
          <div style={{ marginBottom:8 }}>
            <select value={target} onChange={e=>setTarget(e.target.value)} className="cell-input" style={{ width:"100%" }}>
              <option value="">Hedef seçin</option>
              <option value="Restaurant 1">Restaurant 1</option>
              <option value="Restaurant 2">Restaurant 2</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>
          <button onClick={dispatchNow} className="primary" style={{ width:"100%" }}>Sevk Et & Yazdır</button>
        </div>
      </div>

      <div style={{ marginTop:16 }}>
        <h3>Depo Mevcut</h3>
        <div style={{ overflowX:"auto" }}>
          <table className="excel-table">
            <thead><tr><th>ID</th><th>Ürün</th><th>Adet</th></tr></thead>
            <tbody>{products.map(p=>(<tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td style={{ textAlign:"right" }}>{p.quantity}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
