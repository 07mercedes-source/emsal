// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const res = login(username.trim(), password.trim());
    if (!res.ok) setErr(res.msg);
    else router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{t("login")}</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanıcı adı" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parola" className="w-full p-2 border rounded" />
        {err && <div className="text-sm text-red-600">{err}</div>}

        <div className="flex justify-between items-center">
          <button className="px-4 py-2 bg-sky-600 text-white rounded">Giriş</button>
          <div className="text-sm text-slate-500">Demo kimlikler UI'da gösterilmiyor</div>
        </div>
      </form>
    </div>
  );
}
