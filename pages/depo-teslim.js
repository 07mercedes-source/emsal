import { useAuth } from "../context/AuthContext";

export default function DepoTeslim() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Depo Teslim</h1>

      {user ? (
        <p className="text-gray-700">Hoş geldin, <b>{user.name}</b></p>
      ) : (
        <p className="text-gray-500">Kullanıcı bilgisi yüklenemedi.</p>
      )}

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h2 className="font-semibold mb-2">Teslimat Listesi</h2>
        <p className="text-slate-500">Henüz veri yok. Teslimatlar burada listelenecek.</p>
      </div>

      <footer className="text-center py-6 mt-10 text-sm text-gray-500 border-t border-slate-200">
        © {new Date().getFullYear()} EMSAL GmbH. All rights reserved.
      </footer>
    </div>
  );
}
