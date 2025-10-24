import { useRouter } from "next/router";
import { useLanguage } from "../../context/LanguageContext";

export default function IKPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div style={{ padding: 20 }}>
      <h1>{t("ik")}</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button
          onClick={() => router.push("/ik/avans")}
          style={{
            background: "#0ea5e9",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Avans
        </button>
        <button
          onClick={() => router.push("/ik/izin")}
          style={{
            background: "#10b981",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Yıllık İzin
        </button>
      </div>
    </div>
  );
}
