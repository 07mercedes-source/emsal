// components/Utils.js (GÜNCELLENDİ)

import React from 'react';

// Dinamik import fonksiyonları (Aynı kaldı)
const dynamicImport = (fn) => async (data, filename) => {
  try {
    const module = await fn();
    return module.default ? module.default(data, filename) : module(data, filename);
  } catch (error) {
    console.error("Dışa aktarım hatası:", error);
    alert("Dışa aktarım sırasında bir hata oluştu.");
  }
};

const exportExcel = dynamicImport(async () => {
    // ... import logic (XLSX)
    const XLSX = await import('xlsx');
    return (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Rapor");
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };
});

const exportPDF = dynamicImport(async () => {
    // ... import logic (jsPDF)
    const pdfModule = await import('jspdf');
    const jsPDF = pdfModule.default || pdfModule.jsPDF;
    await import('jspdf-autotable');
    
    return (data, filename) => {
        if (!data || data.length === 0) {
            alert("Dışa aktarılacak veri bulunamadı.");
            return;
        }

        const doc = new jsPDF('p', 'mm', 'a4');
        const headers = Object.keys(data[0]);
        const body = data.map(item => Object.values(item));
        
        doc.text(filename.toUpperCase(), 14, 15);
        doc.autoTable({ 
            startY: 20, 
            head: [headers], 
            body: body,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [15, 98, 254] }
        });
        doc.save(`${filename}.pdf`);
    };
});

// Export Butonları - REALİSTİK TASARIM
export const ExportButtons = ({ data, filename }) => {
  return (
    <div className="flex gap-3">
      <button 
        className="
            bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-2 px-3 rounded-lg 
            transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03] active:shadow-inner active:scale-100
            flex items-center gap-1 text-sm
        "
        onClick={() => exportExcel(data, filename)}
      >
        📊 Excel İndir
      </button>
      <button 
        className="
            bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-3 rounded-lg 
            transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.03] active:shadow-inner active:scale-100
            flex items-center gap-1 text-sm
        "
        onClick={() => exportPDF(data, filename)}
      >
        📄 PDF İndir
      </button>
    </div>
  );
};