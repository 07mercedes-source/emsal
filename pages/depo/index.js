import { useRouter } from "next/router";
import { useLanguage } from "../../context/LanguageContext";

export default function DepoPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div style={{ padding: 20 }}>
      <h1>{t("depo")}</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button
          onClick={() => router.push("/depo/sevk")}
          style={{
            background: "#0ea5e9",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Sevk Et
        </button>
        <button
          onClick={() => router.push("/depo/rapor")}
          style={{
            background: "#10b981",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Rapor
        </button>
        <button
          onClick={() => router.push("/depo/teslim")}
          style={{
            background: "#f59e0b",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Teslim Al
        </button>
      </div>
    </div>
  );
}
