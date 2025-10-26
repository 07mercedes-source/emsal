import { useAuth } from "../context/AuthContext";

export default function DepoTeslim() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-4">Depo Teslim</h1>
      {user ? (
        <p className="text-gray-700">Hoş geldin, {user.name}</p>
      ) : (
        <p className="text-gray-500">Kullanıcı bilgisi yüklenemedi.</p>
      )}
      <footer className="text-center mt-8 text-sm text-slate-500">
        © {new Date().getFullYear()} EMSAL GmbH. All rights reserved.
      </footer>
    </div>
  );
}
