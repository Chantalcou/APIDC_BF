import React from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";

import Home from "./Home";
import Gestor from "./pages/Gestor";
import SocioConReprocan from "./pages/SocioConReprocan";
import SocioSinReprocan from "./pages/SocioSinReprocan";

import Dashboard from "./components/Dashboard";
import ContactForm from "./components/ContactForm";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsAndPrivacy from "./components/TermsAndPrivacy";
import Unauthorized from "./components/Unauthorized";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import NewsLetter from "./components/Newsletter";
import LearnWithUs from "./components/LearnWithUs";
import MembershipComponent from "./components/MembershipComponent";
import ProductsSection from "./components/ProductsSection";
import SearchFormSocio from "./components/SearchFormSocio";
import ProtectedSocioRoute from "./components/ProtectedSocioRoute";
import GeneticasDisponibles from "./components/GeneticasDisponibles";

const App = () => {
  return (
    <HelmetProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/membershipSection" element={<MembershipComponent />} />
        <Route path="/membershipSection/gestor" element={<Gestor />} />
        <Route
          path="/membershipSection/SocioConReprocan"
          element={<SocioConReprocan />}
        />
        <Route
          path="/membershipSection/socioSinReprocan"
          element={<SocioSinReprocan />}
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute requiredRole="products">
              <ProductsSection />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/geneticas-disponibles"
          element={
            <ProtectedSocioRoute>
              <GeneticasDisponibles />
            </ProtectedSocioRoute>
          }
        />

        <Route path="/contacto" element={<ContactForm />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/newsLetter" element={<NewsLetter />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/termsAndPrivacy" element={<TermsAndPrivacy />} />
        <Route path="/learnWithUs" element={<LearnWithUs />} />
        <Route path="/no-autorizado" element={<Unauthorized />} />
      </Routes>

      <WhatsApp />
      <Footer />
    </HelmetProvider>
  );
};

export default App;