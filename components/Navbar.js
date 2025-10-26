import Link from "next/link";

export default function Navbar() {
  const nav = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/depo", label: "Depo" },
    { href: "/ik", label: "İK" },
    { href: "/restaurant/1", label: "Restoran 1" },
    { href: "/restaurant/2", label: "Restoran 2" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <span className="text-lg font-bold text-blue-600">Yönetim Sistemi</span>
        <div className="space-x-4">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
