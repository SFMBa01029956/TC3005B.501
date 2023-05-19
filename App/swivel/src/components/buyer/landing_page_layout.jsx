/*
Salvador Federico Milanes Braniff
16-04-2023

LandingPageLayout es el componente que contiene la estructura de la página de inicio.
Utilizarlo permite reducir la cantidad de codigo redundante en interfaces
que compartan la misma estructura.
*/
import Navbar from "../general/navbar";
import Footer from "../general/footer";

export default function LandingPageLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-vh-100">
        {children}
      </div>
      <Footer />
    </>
  );
}
