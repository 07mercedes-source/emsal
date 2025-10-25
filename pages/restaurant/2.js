import { useAuth } from "../../context/AuthContext";

export default function Restaurant2() {
  const { user } = useAuth() || {};

  if (!user) return <div style={{ color: "#fff", padding: 20 }}>Giriş yapmanız gerekiyor...</div>;

  return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h1>🍽 Restaurant 2 Panel</h1>
      <p>Burada Restaurant 2’nin sipariş, stok ve menü bilgileri gösterilir.</p>
    </div>
  );
}
