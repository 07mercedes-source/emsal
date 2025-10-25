// pages/depo/teslim.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";

export default function Teslim() {
  const { urunler, updateUrun, pushHistory } = useDepo();
  const [id, setId] = useState("");
  const [amount, setAmount] = useState(0);

  const pick = urunler.find(u => u.id.startsWith(id) || u.id === id);

  const submit = (e) => {
    e.preventDefault();
    if (!pick) return alert("Ürün bulunamadı.");
    const newQty = (pick.miktar || 0) + Number(amount);
    updateUrun(pick.id, { miktar: newQty });
    pushHistory({ action: "teslim", productId: pick.id, qty: Number(amount), date: new Date().toISOString().slice(0,10) });
    alert("Teslim alındı.");
    setId(""); setAmount(0);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Teslim Alma</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Ürün ID (kısmî yazabilirsiniz)" className="w-full p-2 border rounded mb-2" />
        <div className="mb-2">{pick ? `${pick.ad} — Stok: ${pick.miktar}` : "Ürün seçilmedi"}</div>
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" className="w-full p-2 border rounded mb-2" placeholder="Adet" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Stok Güncelle</button>
      </form>
    </div>
  );
}
