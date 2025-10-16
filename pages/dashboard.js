import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Hoşgeldiniz {user.username} ({user.role})
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => router.push("/depo")}
          className="p-6 bg-blue-100 hover:bg-blue-200 rounded-xl shadow-md"
        >
          🏭 Depo Modülü
        </button>
        <button
          onClick={() => router.push("/ik")}
          className="p-6 bg-green-100 hover:bg-green-200 rounded-xl shadow-md"
        >
          👨‍💼 İK Modülü
        </button>
        <button
          onClick={() => router.push("/restaurant")}
          className="p-6 bg-yellow-100 hover:bg-yellow-200 rounded-xl shadow-md"
        >
          🍽️ Restoran Modülü
        </button>
      </div>
    </div>
  );
}
