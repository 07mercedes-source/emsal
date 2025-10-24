import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      router.push("/");
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b1220",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 320,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#0b1220" }}>EMSAL Panel Giriş</h2>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />

        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

        <button
          type="submit"
          style={{
            background: "#0b1220",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
