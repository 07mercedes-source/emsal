// components/InvoiceLogo.js
export default function InvoiceLogo({ style }) {
  return <img src="/logo.png" alt="emsal" style={{ width: 140, height: "auto", objectFit: "contain", ...style }} />;
}
