import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Hoş geldiniz! Yukarıdaki menüden modüller arasında geçiş yapabilirsiniz.
        </p>
      </main>
      <footer className="text-center mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Yönetim Sistemi
      </footer>
    </>
  );
}
