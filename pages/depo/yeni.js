// pages/depo/yeni.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const storageKey = "emsal_depo_products";

export default function DepoYeni() {
  const router = useRouter();
  const [product, setProduct] = useState({ id: "", name: "", stock: 0, unit: "", cost: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const raw = localStorage.getItem(storageKey);
      const arr = raw ? JSON.parse(raw) : [];
      const next = arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
      setProduct((p) => ({ ...p, id: next }));
    } catch {
      setProduct((p) => ({ ...p, id: 1 }));
    }
  }, []);

  const save = (e) => {
    e?.preventDefault();
    try {
      const raw = localStorage.getItem(storageKey);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(product);
      localStorage.setItem(storageKey, JSON.stringify(arr));
      alert("Ürün eklendi.");
      router.push("/depo");
    } catch (err) {
      alert("Kaydetme hatası");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Yeni Ürün Ekle</h1>
      <form onSubmit={save} style={{ display: "grid", gap: 10, width: 420 }}>
        <label>ID (otomatik)</label>
        <input value={product.id} readOnly style={{ padding: 8 }} />

        <label>Ürün Adı</label>
        <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} style={{ padding: 8 }} required />

        <label>Stok</label>
        <input type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} style={{ padding: 8 }} required />

        <label>Birim</label>
        <input value={product.unit} onChange={(e) => setProduct({ ...product, unit: e.target.value })} style={{ padding: 8 }} required />

        <label>Maliyet (€)</label>
        <input type="number" step="0.01" value={product.cost} onChange={(e) => setProduct({ ...product, cost: Number(e.target.value) })} style={{ padding: 8 }} required />

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={{ background: "#2563eb", color: "#fff", padding: 10, border: "none", borderRadius: 8 }}>Kaydet</button>
          <button type="button" onClick={() => router.push("/depo")} style={{ padding: 10 }}>İptal</button>
        </div>
      </form>
    </div>
  );
}
