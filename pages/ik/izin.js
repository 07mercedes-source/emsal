// pages/ik/izin.js

import { useState } from "react";
import { useIK } from "../../context/IKContext";
import { useRouter } from "next/router";

export default function IzinTalepPage() {
  const { personnel, leaves, setLeaves } = useIK();
  const router = useRouter();

  const [personnelId, setPersonnelId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const selectedPersonnel = personnel.find(p => p.id === Number(personnelId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPersonnel || !startDate || !endDate) {
      setMessage("Lütfen personel, başlangıç ve bitiş tarihlerini girin.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        setMessage("Başlangıç tarihi, bitiş tarihinden sonra olamaz.");
        return;
    }

    const newLeave = {
      id: Date.now(),
      personnelId: Number(personnelId),
      personnelName: selectedPersonnel.name,
      startDate,
      endDate,
      reason,
      status: "Beklemede",
    };

    setLeaves([...leaves, newLeave]);
    
    // 💡 Mail Gönderme Simülasyonu
    console.log(`[MAIL] Yeni izin talebi gönderildi: ${selectedPersonnel.name} (${startDate} - ${endDate})`);
    
    setMessage(`✅ İzin talebi başarıyla oluşturuldu ve yöneticiye iletildi.`);
    setStartDate("");
    setEndDate("");
    setReason("");
    setPersonnelId("");
  };

  return (
    <div className="container mx-auto max-w-2xl bg-white p-8 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🌴 İzin Talep Formu</h2>
      
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

        <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç Tarihi</label>
                <input 
                    type="date"
                    className="input-cell w-full"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş Tarihi</label>
                <input 
                    type="date"
                    className="input-cell w-full"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                />
            </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">İzin Nedeni</label>
          <textarea
            className="input-cell w-full"
            rows="3"
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="İzin talep nedeninizi açıklayınız..."
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors shadow-md">
          ✈️ İzin Talebi Oluştur
        </button>
      </form>
    </div>
  );
}