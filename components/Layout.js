// components/Layout.js
import Navbar from "./Navbar";
import RightPanel from "./RightPanel";
import Footer from "./Footer";

export default function Layout({ children }){
  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column"}}>
      <Navbar />
      <div style={{display:"flex", flex:1}}>
        <main className="main-content">{children}</main>
        <div className="right-panel-space"><RightPanel /></div>
      </div>

      <Footer />
    </div>
  );
}
