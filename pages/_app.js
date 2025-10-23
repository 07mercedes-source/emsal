// pages/_app.js
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { LanguageProvider } from "../context/LanguageContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // router.isReady kontrolü: Next.js 13–14'te güvenli yöntem
  if (!router.isReady) return null;

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

// SSR kapatıyoruz (bazı context’lerde hydration sorunu çözülür)
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
