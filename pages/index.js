// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <div className="container">
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div className="card" style={{ flex: 1 }}>
          <h2 className="header-title">{t("home")}</h2>
          <p>{t("welcome")} {user?.name || ""}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button className="big-btn" onClick={() => router.push("/depo")}>{t("depo")}</button>
            <button className="big-btn" onClick={() => router.push("/ik")}>{t("ik")}</button>
            <button className="big-btn" onClick={() => router.push("/restaurant/1")}>Restaurant 1</button>
            <button className="big-btn" onClick={() => router.push("/restaurant/2")}>Restaurant 2</button>
          </div>
        </div>
      </div>
    </div>
  );
}
