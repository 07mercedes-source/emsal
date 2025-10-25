// pages/_app.js
import dynamic from "next/dynamic";
import "../styles/globals.css";

import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  // Tamamen client-side çalıştığı için SSR kaynaklı hatalar ortadan kalkar
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

// SSR kapatıyoruz (Vercel/Next prerender sorunları için)
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
