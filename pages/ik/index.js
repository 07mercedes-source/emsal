// pages/ik/index.js
import { useState } from "react";
import { useIK } from "../../context/IKContext";

export default function IKPage() {
  const { personnel, addPerson, updatePerson, removePerson } = useIK();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ sicil: "", ad: "", telefon: "", adres: "", restaurant: "", gorev: "", maas: 0, steuerklasse: "", baslangic: "", ayrilis: "" });

  const filtered = personnel.filter(p => p.ad.toLowerCase().includes(search.toLowerCase()) || p.sicil.includes(search));

  const save = () => {
    if (editing) updatePerson(editing.id, form);
    else addPerson(form);
    setEditing(null);
    setForm({ sicil: "", ad: "", telefon: "", adres: "", restaurant: "", gorev: "", maas: 0, steuerklasse: "", baslangic: "", ayrilis: "" });
  };

  const startEdit = (p) => {
    setEditing(p); setForm({ sicil: p.sicil, ad: p.ad, telefon: p.telefon, adres: p.adres, restaurant: p.restaurant, gorev: p.gorev, maas: p.maas, steuerklasse: p.steuerklasse, baslangic: p.baslangic, ayrilis: p.ayrilis });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Personel Listesi</h1>

      <div className="mb-4 flex gap-2">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ara (isim veya sicil)" className="p-2 border rounded" />
        <button onClick={()=>{ setEditing(null); setForm({ sicil: "", ad: "", telefon: "", adres: "", restaurant: "", gorev: "", maas: 0, steuerklasse: "", baslangic: "", ayrilis: "" }); window.scrollTo({ top:0, behavior:'smooth' }) }} className="px-3 py-2 bg-sky-600 text-white rounded">➕ Yeni Personel</button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-6 gap-2 font-semibold text-sm border-b pb-2">
          <div>Sicil</div><div>Ad Soyad</div><div>Telefon</div><div>Rest.</div><div>Brüt Maaş</div><div>İşlem</div>
        </div>

        {filtered.map(p => (
          <div key={p.id} className="grid grid-cols-6 gap-2 items-center border-b py-2 text-sm">
            <div>{p.sicil}</div>
            <div>{p.ad}</div>
            <div>{p.telefon}</div>
            <div>{p.restaurant}</div>
            <div>€{p.maas.toLocaleString('de-DE')}</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-amber-400 rounded" onClick={()=>startEdit(p)}>Düzenle</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>removePerson(p.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">{editing ? "Personel Düzenle" : "Yeni Personel"}</h3>
        <div className="grid grid-cols-2 gap-2">
          <input value={form.sicil} onChange={(e)=>setForm({...form, sicil:e.target.value})} placeholder="Sicil No" className="p-2 border rounded" />
          <input value={form.ad} onChange={(e)=>setForm({...form, ad:e.target.value})} placeholder="Ad Soyad" className="p-2 border rounded" />
          <input value={form.telefon} onChange={(e)=>setForm({...form, telefon:e.target.value})} placeholder="Telefon" className="p-2 border rounded" />
          <input value={form.adres} onChange={(e)=>setForm({...form, adres:e.target.value})} placeholder="Adres" className="p-2 border rounded" />
          <input value={form.restaurant} onChange={(e)=>setForm({...form, restaurant:e.target.value})} placeholder="Restaurant" className="p-2 border rounded" />
          <input value={form.gorev} onChange={(e)=>setForm({...form, gorev:e.target.value})} placeholder="Görev" className="p-2 border rounded" />
          <input value={form.maas} onChange={(e)=>setForm({...form, maas: Number(e.target.value)})} placeholder="Brüt Maaş" className="p-2 border rounded" />
          <input value={form.steuerklasse} onChange={(e)=>setForm({...form, steuerklasse:e.target.value})} placeholder="Steuerklasse" className="p-2 border rounded" />
          <input value={form.baslangic} onChange={(e)=>setForm({...form, baslangic:e.target.value})} type="date" className="p-2 border rounded" />
          <input value={form.ayrilis} onChange={(e)=>setForm({...form, ayrilis:e.target.value})} type="date" className="p-2 border rounded" />
        </div>

        <div className="mt-3">
          <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded">{editing ? "Güncelle" : "Ekle"}</button>
        </div>
      </div>
    </div>
  );
}
