import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">{t("home")}</h1>
      <p>EMSAL Yönetim Paneline hoş geldiniz 👋</p>
    </div>
  );
}
