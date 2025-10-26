export default function IK() {
  const personel = [
    { id: 1, ad: "Ahmet", pozisyon: "Garson" },
    { id: 2, ad: "Ayşe", pozisyon: "Aşçı" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Personel Listesi</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Ad</th>
            <th className="p-2 border">Pozisyon</th>
          </tr>
        </thead>
        <tbody>
          {personel.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.ad}</td>
              <td className="p-2 border">{p.pozisyon}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end space-x-4 mt-4">
        <a href="/ik/avans" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Avans</a>
        <a href="/ik/izin" className="bg-green-500 text-white px-4 py-2 rounded-lg">İzin</a>
      </div>
    </div>
  );
}
