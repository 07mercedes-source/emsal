import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <footer className="text-center mt-10 py-4 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Yönetim Sistemi
      </footer>
    </>
  );
}
