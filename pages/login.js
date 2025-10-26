// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e?.preventDefault();
    const res = login({ username, password });
    if (!res.ok) setErr(res.msg || "Hata");
    else router.push("/dashboard");
  };

  return (
    <div className="card" style={{ maxWidth:500, margin:"40px auto" }}>
      <h2>Giriş</h2>
      <form onSubmit={onSubmit}>
        <label>Kullanıcı adı</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <label>Şifre</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-2 border rounded mb-2" />
        {err && <div style={{ color:"red", marginBottom:8 }}>{err}</div>}
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <button type="submit" className="btn btn-primary">Giriş</button>
          <div style={{ color:"#6b7280", alignSelf:"center" }}>Bilgi: demo admin/12345 personel/11111</div>
        </div>
      </form>
    </div>
  );
}
