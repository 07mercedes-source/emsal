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

  // router may be undefined during SSR; return null until ready
  if (typeof window === "undefined") return <Component {...pageProps} />; // SSR safe fallback
  if (!router?.isReady) return null;

  return (
    <AuthProvider>
      <LanguageProvider>
        <IKProvider>
          <DepoProvider>
            <RestaurantProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RestaurantProvider>
          </DepoProvider>
        </IKProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
