import { useRouter } from "next/router";

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return <div style={{ padding: 20 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🍽️ Restaurant {id}</h1>
      <p>Bu sayfada Restaurant {id} bilgileri görüntüleniyor.</p>
    </div>
  );
}
