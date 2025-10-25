import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Restaurant() {
  const { query } = useRouter();
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    if (query.id) setHazir(true);
  }, [query.id]);

  if (!hazir) return <div style={{ padding: 40 }}>Yükleniyor...</div>;
  return (
    <div style={{ padding: 40 }}>
      <h2>Restaurant {query.id}</h2>
      <p>Bu sayfa ilgili restoranın stok ve satış bilgilerini gösterecek.</p>
    </div>
  );
}
