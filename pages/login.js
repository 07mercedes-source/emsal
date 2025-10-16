// pages/login.js
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function LoginPage(){
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(()=> {
    if(user) router.push("/");
  },[user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");

  const handle = (e) => {
    e?.preventDefault();
    const res = login(username, password);
    if(!res.ok) setErr(res.msg);
    else router.push("/");
  };

  return (
    <div style={{maxWidth:560}}>
      <h2>Giriş</h2>
      <form onSubmit={handle} style={{display:"grid", gap:10}}>
        <input className="input-cell" placeholder="Kullanıcı adı" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input-cell" placeholder="Şifre" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:"flex", gap:8}}>
          <button type="submit" className="btn btn-blue">Giriş</button>
        </div>
        {err && <div style={{color:"red"}}>{err}</div>}
        <div style={{color:"#6b7280", marginTop:6}}>Demo kullanıcılar: admin / muhasebe / personel — şifre: 12345</div>
      </form>
    </div>
  );
}
