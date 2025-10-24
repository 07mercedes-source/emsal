// pages/_app.js
import "../styles/globals.css";
import dynamic from "next/dynamic";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { DepoProvider } from "../context/DepoContext";
import { IKProvider } from "../context/IKContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  // dynamic export with ssr false prevents some hydration issues in your environment
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
