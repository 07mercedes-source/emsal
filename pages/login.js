// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage(){
  const { user, login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] = useState("");

  const handle = (e) => {
    e.preventDefault();
    setErr("");
    const res = login(username, password);
    if(res.ok) router.push("/");
    else setErr(res.msg || "Hata");
  };

  return (
    <div className="container">
      <div style={{maxWidth:480, marginTop:40}}>
        <div className="card">
          <h2 className="h2">Giriş</h2>
          <form onSubmit={handle}>
            <div style={{marginBottom:8}}>
              <label className="small-muted">Kullanıcı adı</label><br/>
              <input value={username} onChange={e=>setUsername(e.target.value)} style={{width:"100%",padding:8,borderRadius:6,border:"1px solid #e6eef7"}} />
            </div>
            <div style={{marginBottom:8}}>
              <label className="small-muted">Şifre</label><br/>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:8,borderRadius:6,border:"1px solid #e6eef7"}} />
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="button" type="submit">Giriş</button>
              {err && <div style={{color:"crimson"}}>{err}</div>}
            </div>
            <div style={{marginTop:8}} className="small-muted">Demo kullanıcı bilgileri gösterilmiyor. Sunum için admin/muhasebe/personel kullanıcıları kullanılabilir.</div>
          </form>
        </div>
      </div>
    </div>
  );
}
