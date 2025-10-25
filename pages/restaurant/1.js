import { useAuth } from "../context/AuthContext";

export default function Restaurant1() {
  const { user } = useAuth() || {};

  if (!user) return <div style={{ color: "white" }}>Giriş yapmanız gerekiyor...</div>;

  return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h1>🍽 Restaurant 1 Panel</h1>
      <p>Burada günlük menü, sipariş ve stok bağlantıları bulunur.</p>
    </div>
  );
}
