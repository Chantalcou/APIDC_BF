import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Home";
import Gestor from "./pages/Gestor";
import SocioConReprocan from "./pages/SocioConReprocan";
import SocioSinReprocan from "./pages/SocioSinReprocan";
import WhatsApp from "./components/WhatsApp";
import Dashboard from "./components/Dashboard";
import ContactForm from "./components/ContactForm";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsAndPrivacy from "./components/TermsAndPrivacy";
import Unauthorized from "./components/Unauthorized";
import Newsletter from "./components/Newsletter";
import { ContactOptions } from "./components/ContactOptions";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import { HelmetProvider } from "react-helmet-async"; //Optimización SEO
import MembershipComponent from "./components/MembershipComponent";
import ProductsSection from "./components/ProductsSection";
import SearchFormSocio from "./components/SearchFormSocio";

const App = () => {
  return (
    <>
      <HelmetProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membershipSection/gestor" element={<Gestor />} />
          {/* Rutas NewsLetter y products protegidas*/}

          <Route
            path="/newsletter"
            element={
              <ProtectedRoute requiredRole="newsletter">
                <Newsletter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredRole="products">
                <ProductsSection />
              </ProtectedRoute>
            }
          />
          <Route path="/membershipSection" element={<MembershipComponent />} />
          <Route path="/no-autorizado" element={<Unauthorized />} />

          {/* Usa ProtectedRoute en el elemento de la ruta */}
          <Route
            path="/socio"
            element={
              <ProtectedRoute requiredRole="socio">
                <SearchFormSocio />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/contacto" element={<ContactForm />} />
          <Route
            path="/membershipSection/SocioConReprocan"
            element={<SocioConReprocan />}
          />
          <Route
            path="/membershipSection/socioSinReprocan"
            element={<SocioSinReprocan />}
          />
          <Route path="/shop" element={<Shop />} />
          
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/termsAndPrivacy" element={<TermsAndPrivacy />} />
        </Routes>
        <WhatsApp />
        <ContactOptions />
        {/* <NewsletterBanner /> */}
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default App;
