// pages/depo/index.js
import { useEffect, useMemo, useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useLanguage } from "../../context/LanguageContext";

export default function DepoPage() {
  const { urunler, addUrun, updateUrun, removeUrun } = useDepo();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ad: "", kategori: "kuru gıda", miktar: 0, birim: "", maliyet: 0, skt: "" });

  const categories = useMemo(() => ["all", "alkol", "et", "içecek", "kuru gıda"], []);

  useEffect(() => {
    if (!editing) setForm({ ad: "", kategori: "kuru gıda", miktar: 0, birim: "", maliyet: 0, skt: "" });
  }, [editing]);

  const filtered = urunler.filter(u => (category === "all" ? true : u.kategori === category) && u.ad.toLowerCase().includes(search.toLowerCase()));

  const save = () => {
    if (editing) {
      updateUrun(editing.id, form);
      setEditing(null);
    } else {
      addUrun(form);
    }
  };

  const startEdit = (u) => {
    setEditing(u);
    setForm({ ad: u.ad, kategori: u.kategori, miktar: u.miktar, birim: u.birim, maliyet: u.maliyet, skt: u.skt });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{t("products")}</h1>

      <div className="mb-4 flex gap-2 items-center">
        <input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          {categories.map(c => <option key={c} value={c}>{c === "all" ? t("all") : c}</option>)}
        </select>
        <div className="ml-auto flex gap-2">
          <button onClick={() => { setEditing(null); setForm({ ad: "", kategori: "kuru gıda", miktar: 0, birim: "", maliyet: 0, skt: "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-3 py-2 bg-sky-600 text-white rounded">➕ Yeni Ürün Ekle</button>
        </div>
      </div>

      <div className="mb-4 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-6 gap-2 text-sm font-semibold border-b pb-2">
          <div>ID</div><div>Ürün Adı</div><div>Stok</div><div>Birim</div><div>Maliyet (€)</div><div>İşlem</div>
        </div>

        {filtered.map(u => (
          <div key={u.id} className="grid grid-cols-6 gap-2 items-center text-sm border-b py-2">
            <div className="truncate">{u.id.slice(0,8)}</div>
            <div>{u.ad}</div>
            <div>{u.miktar}</div>
            <div>{u.birim}</div>
            <div>€{u.maliyet?.toLocaleString("de-DE")}</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-amber-400 rounded" onClick={() => startEdit(u)}>Düzenle</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeUrun(u.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">{editing ? "Ürün Düzenle" : "Yeni Ürün"}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input value={form.ad} onChange={(e)=>setForm({...form, ad:e.target.value})} placeholder="Ürün adı" className="p-2 border rounded" />
          <select value={form.kategori} onChange={(e)=>setForm({...form, kategori:e.target.value})} className="p-2 border rounded">
            <option value="alkol">Alkol</option>
            <option value="et">Et</option>
            <option value="içecek">İçecek</option>
            <option value="kuru gıda">Kuru Gıda</option>
          </select>
          <input value={form.miktar} onChange={(e)=>setForm({...form, miktar: Number(e.target.value)})} placeholder="Miktar" type="number" className="p-2 border rounded" />
          <input value={form.birim} onChange={(e)=>setForm({...form, birim:e.target.value})} placeholder="Birim" className="p-2 border rounded" />
          <input value={form.maliyet} onChange={(e)=>setForm({...form, maliyet: Number(e.target.value)})} placeholder="Maliyet (€)" type="number" step="0.01" className="p-2 border rounded" />
          <input value={form.skt} onChange={(e)=>setForm({...form, skt:e.target.value})} placeholder="SKT (YYYY-MM-DD)" className="p-2 border rounded" />
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">{editing ? "Güncelle" : "Ekle"}</button>
          {editing && <button onClick={()=>setEditing(null)} className="px-4 py-2 bg-gray-300 rounded">İptal</button>}
        </div>
      </div>
    </div>
  );
}
