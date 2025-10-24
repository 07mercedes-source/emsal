// pages/depo/index.js
import { useEffect, useMemo, useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export default function DepoPage() {
  const router = useRouter();
  const { products, addProduct, updateProduct, removeProduct } = useDepo();
  const { user } = useAuth() || {};
  const isAdmin = user?.role === "Yönetici";

  // filtre
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("Tümü");

  const categories = useMemo(() => ["Tümü", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = products.filter((p) => {
    if (category !== "Tümü" && p.category !== category) return false;
    if (!filter) return true;
    return p.name.toLowerCase().includes(filter.toLowerCase()) || p.id.toLowerCase().includes(filter.toLowerCase());
  });

  // inline edit (basit)
  const [editingId, setEditingId] = useState(null);
  const [rowDraft, setRowDraft] = useState({});

  function startEdit(p) {
    setEditingId(p.id);
    setRowDraft({ ...p });
  }
  function saveEdit() {
    updateProduct(editingId, rowDraft);
    setEditingId(null);
    setRowDraft({});
  }
  function cancelEdit() {
    setEditingId(null);
    setRowDraft({});
  }

  // yeni ürün ekleme satırı
  const [newRow, setNewRow] = useState({ name: "", category: "", unit: "", qty: 0, cost: 0 });

  function createNew() {
    if (!newRow.name) return alert("Ürün adı girin");
    addProduct(newRow);
    setNewRow({ name: "", category: "", unit: "", qty: 0, cost: 0 });
  }

  return (
    <div>
      <h1>Depo</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => router.push("/depo/sevk")} style={{ padding: 8, background: "#ffb000", border: "none", borderRadius: 6 }}>🚚 Sevk Et</button>
        <button onClick={() => router.push("/depo/rapor")} style={{ padding: 8, background: "#10b981", border: "none", borderRadius: 6 }}>📊 Rapor</button>
        <button onClick={() => router.push("/depo/teslim")} style={{ padding: 8, background: "#0ea5e9", border: "none", borderRadius: 6 }}>📦 Teslim Al</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Ara (isim veya id)" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* yeni satır (excel-like) */}
      {isAdmin && (
        <div style={{ display: "grid", gridTemplateColumns: "150px 140px 100px 80px 80px 120px", gap: 8, marginBottom: 12, alignItems: "center" }}>
          <input placeholder="Ürün adı" value={newRow.name} onChange={(e) => setNewRow(s => ({ ...s, name: e.target.value }))} />
          <input placeholder="Kategori" value={newRow.category} onChange={(e) => setNewRow(s => ({ ...s, category: e.target.value }))} />
          <input placeholder="Birim" value={newRow.unit} onChange={(e) => setNewRow(s => ({ ...s, unit: e.target.value }))} />
          <input type="number" placeholder="Adet" value={newRow.qty} onChange={(e) => setNewRow(s => ({ ...s, qty: Number(e.target.value) }))} />
          <input type="number" placeholder="Maliyet" value={newRow.cost} onChange={(e) => setNewRow(s => ({ ...s, cost: Number(e.target.value) }))} />
          <div>
            <button onClick={createNew} style={{ padding: 6, background: "#0b1220", color: "#fff", border: "none", borderRadius: 6 }}>➕ Yeni Ürün Ekle</button>
          </div>
        </div>
      )}

      {/* tablo */}
      <div style={{ borderTop: "1px solid #eee" }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 180px 120px 80px 100px 120px", gap: 8, padding: "8px 0", fontWeight: 700 }}>
          <div>ID</div><div>Ürün Adı</div><div>Kategori</div><div>Birim</div><div>Stok</div><div>Maliyet (€)</div>
        </div>

        {filtered.map((p) => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "120px 180px 120px 80px 100px 120px", gap: 8, padding: "6px 0", alignItems: "center", borderBottom: "1px solid #f3f6fb" }}>
            <div>{p.id}</div>

            <div>
              {editingId === p.id ? <input value={rowDraft.name} onChange={(e) => setRowDraft(s => ({ ...s, name: e.target.value }))} /> : p.name}
            </div>

            <div>
              {editingId === p.id ? <input value={rowDraft.category} onChange={(e) => setRowDraft(s => ({ ...s, category: e.target.value }))} /> : p.category}
            </div>

            <div>{editingId === p.id ? <input value={rowDraft.unit} onChange={(e) => setRowDraft(s => ({ ...s, unit: e.target.value }))} /> : p.unit}</div>

            <div>{editingId === p.id ? <input type="number" value={rowDraft.qty} onChange={(e) => setRowDraft(s => ({ ...s, qty: Number(e.target.value) }))} /> : p.qty}</div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {editingId === p.id ? <input type="number" value={rowDraft.cost} onChange={(e) => setRowDraft(s => ({ ...s, cost: Number(e.target.value) }))} /> : `€${p.cost}`}
              {isAdmin && editingId !== p.id && <button onClick={() => startEdit(p)} style={{ padding: 6 }}>✏️</button>}
              {isAdmin && editingId === p.id && <button onClick={saveEdit} style={{ padding: 6 }}>✅</button>}
              {isAdmin && editingId === p.id && <button onClick={cancelEdit} style={{ padding: 6 }}>❌</button>}
              {isAdmin && <button onClick={() => { if (confirm("Silinsin mi?")) removeProduct(p.id); }} style={{ padding: 6 }}>🗑️</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
