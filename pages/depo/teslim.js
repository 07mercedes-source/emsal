// pages/depo/teslim.js
import { useState } from "react";
import { useDepo } from "../../context/DepoContext";
import { useRouter } from "next/router";

export default function TeslimAl() {
  const router = useRouter();
  const { products, receiveProduct } = useDepo();
  const [id, setId] = useState("");
  const [qty, setQty] = useState(0);
  const [cost, setCost] = useState(0);
  const [expiry, setExpiry] = useState("");

  function findName(id) {
    const p = products.find((x) => x.id === id);
    return p ? p.name : "";
  }

  function handleSubmit(e) {
    e?.preventDefault();
    if (!id || qty <= 0) return alert("Id ve miktar girin");
    receiveProduct({ id, qty, cost, expiry });
    alert("Teslim alındı");
    router.push("/depo");
  }

  return (
    <div>
      <h1>Teslim Alma</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "200px 200px", gap: 8 }}>
        <input placeholder="Ürün ID" value={id} onChange={(e) => setId(e.target.value)} />
        <div>{findName(id)}</div>
        <input type="number" placeholder="Adet" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        <input type="number" placeholder="Maliyet" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
        <div />
        <button style={{ padding: 8, background: "#0b1220", color: "#fff" }} type="submit">Teslim Al</button>
      </form>
    </div>
  );
}
