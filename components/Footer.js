export default function Footer() {
  return (
    <footer className="w-full mt-10 border-t border-gray-200">
      <p className="text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} ERP Sistemleri | Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
