import dynamic from "next/dynamic";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { IKProvider } from "../context/IKContext";
import { DepoProvider } from "../context/DepoContext";
import { RestaurantProvider } from "../context/RestaurantContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <IKProvider>
        <DepoProvider>
          <RestaurantProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RestaurantProvider>
        </DepoProvider>
      </IKProvider>
    </AuthProvider>
  );
}

// Vercel build’ında SSR devre dışı, hata kesilir:
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
