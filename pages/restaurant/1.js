import { useAuth } from "../../context/AuthContext";

export default function Restaurant1() {
  const { user } = useAuth() || {};

  if (!user) return <div style={{ color: "#fff", padding: 20 }}>Giriş yapmanız gerekiyor...</div>;

  return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h1>🍽 Restaurant 1 Panel</h1>
      <p>Burada Restaurant 1’in sipariş, stok ve menü bilgileri gösterilir.</p>
    </div>
  );
}
