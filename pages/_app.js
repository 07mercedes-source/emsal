// pages/_app.js
import dynamic from "next/dynamic";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { LanguageProvider } from "../context/LanguageContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  // SSR kapalı: client-side render ile hydration problemlerini engelliyoruz
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
