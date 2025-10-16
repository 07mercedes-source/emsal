// pages/ik/avans.js

import { useState } from "react";
import { useIK } from "../../context/IKContext";
import { useRouter } from "next/router";

export default function AvansTalepPage() {
  const { personnel, advances, setAdvances } = useIK();
  const router = useRouter();

  const [personnelId, setPersonnelId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [explanation, setExplanation] = useState("");
  const [message, setMessage] = useState("");

  const selectedPersonnel = personnel.find(p => p.id === Number(personnelId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPersonnel || !amount || amount <= 0) {
      setMessage("Lütfen geçerli personel seçin ve miktar girin.");
      return;
    }

    const newAdvance = {
      id: Date.now(),
      personnelId: Number(personnelId),
      personnelName: selectedPersonnel.name,
      amount: Number(amount),
      date,
      explanation,
      status: "Beklemede", // Onay süreci eklenebilir
    };

    setAdvances([...advances, newAdvance]);
    
    // 💡 Mail Gönderme Simülasyonu
    console.log(`[MAIL] Yeni avans talebi gönderildi: ${selectedPersonnel.name} (${amount} €)`);
    
    setMessage(`✅ Avans talebi başarıyla oluşturuldu ve yöneticiye iletildi.`);
    setAmount("");
    setExplanation("");
    setPersonnelId("");
  };

  return (
    <div className="container mx-auto max-w-2xl bg-white p-8 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">💸 Avans Talep Formu</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded-lg text-white font-medium ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personel Seçimi</label>
          <select 
            className="input-cell w-full"
            value={personnelId}
            onChange={e => setPersonnelId(e.target.value)}
            required
          >
            <option value="">-- Personel Seçin --</option>
            {personnel.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.title})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Talep Edilen Miktar (€)</label>
          <input 
            type="number"
            className="input-cell w-full"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Talep Tarihi</label>
          <input 
            type="date"
            className="input-cell w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea
            className="input-cell w-full"
            rows="3"
            value={explanation}
            onChange={e => setExplanation(e.target.value)}
            placeholder="Avans talep nedeninizi açıklayınız..."
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors shadow-md">
          💰 Avans Talebi Oluştur
        </button>
      </form>

      <div className="mt-8 pt-4 border-t">
        <h3 className="text-xl font-semibold mb-3">Son Avans Kayıtları</h3>
        <ul className="space-y-2">
            {advances.slice().reverse().slice(0,5).map(a => (
                <li key={a.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center text-sm">
                    <span>{a.personnelName} - {a.amount} €</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${a.status === 'Beklemede' ? 'bg-yellow-100 text-yellow-800' : ''}`}>{a.status}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
}