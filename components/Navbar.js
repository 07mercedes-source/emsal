import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const navBtn = "bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition font-semibold";

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
        <img src="/logo.png" alt="EMSAL" className="h-12 bg-white rounded-lg p-1" />
        <span className="font-extrabold text-xl text-sky-300">EMSAL GmbH</span>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/"><button className={navBtn}>Anasayfa</button></Link>
        <Link href="/depo"><button className={navBtn}>Depo</button></Link>
        <Link href="/ik"><button className={navBtn}>İK</button></Link>
        <button className={navBtn} onClick={() => router.push("/restaurant/1")}>Restaurant 1</button>
        <button className={navBtn} onClick={() => router.push("/restaurant/2")}>Restaurant 2</button>
      </div>

      <span className="text-sm text-slate-400">{time.toLocaleString("de-DE", { hour12: false })}</span>
    </nav>
  );
}
