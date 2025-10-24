// pages/_app.js
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { LanguageProvider } from "../context/LanguageContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // isReady yerine güvenli kontrol
  useEffect(() => {
    if (router.isReady) setReady(true);
  }, [router.isReady]);

  if (!ready) return null; // yüklenmeden önce boş döner

  return (
    <AuthProvider>
      <IKProvider>
        <DepoProvider>
          <RestaurantProvider>
            <LanguageProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LanguageProvider>
          </RestaurantProvider>
        </DepoProvider>
      </IKProvider>
    </AuthProvider>
  );
}

// SSR kapalı
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
