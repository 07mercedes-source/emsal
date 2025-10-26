// pages/_app.js
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import { IKProvider } from "../context/IKContext";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DepoProvider>
          <RestaurantProvider>
            <IKProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </IKProvider>
          </RestaurantProvider>
        </DepoProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

// Eğer Vercel build/some contexts hydration hatası verirse: SSR kapatmak için
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
