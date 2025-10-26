export default function Restaurant1() {
  const siparişler = [
    { id: 1, masa: "A1", ürün: "Pizza", durum: "Hazırlanıyor" },
    { id: 2, masa: "B2", ürün: "Salata", durum: "Serviste" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Restoran 1</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Masa</th>
            <th className="p-2 border">Ürün</th>
            <th className="p-2 border">Durum</th>
          </tr>
        </thead>
        <tbody>
          {siparişler.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-2 border">{s.masa}</td>
              <td className="p-2 border">{s.ürün}</td>
              <td className="p-2 border">{s.durum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
