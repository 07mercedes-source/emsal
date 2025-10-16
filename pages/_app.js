// pages/_app.js
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { IKProvider } from "../context/IKContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }){
  return (
    <AuthProvider>
      <LanguageProvider>
        <IKProvider>
          <RestaurantProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RestaurantProvider>
        </IKProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
