import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { DepoProvider } from "../context/DepoContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DepoProvider>
        <Component {...pageProps} />
      </DepoProvider>
    </AuthProvider>
  );
}
