import "@/styles/globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { DepoProvider } from "@/context/DepoContext";
import Navbar from "@/components/Navbar";
import RightPanel from "@/components/RightPanel";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <DepoProvider>
        <div className="flex min-h-screen">
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex flex-1">
              <div className="flex-1 p-4">
                <Component {...pageProps} />
              </div>
              <RightPanel />
            </main>
            <footer className="text-center text-gray-500 py-3 border-t">
              © 2025 Emsal Dashboard
            </footer>
          </div>
        </div>
      </DepoProvider>
    </LanguageProvider>
  );
}
