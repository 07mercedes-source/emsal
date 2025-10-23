// pages/_app.js
import dynamic from "next/dynamic";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { LanguageProvider } from "../context/LanguageContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
