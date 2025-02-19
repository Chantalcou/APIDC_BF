// App.js
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
import Newsletter from "./components/Newsletter";
import NewsletterBanner from "./components/NewsLetterBanner";
import { ContactOptions } from "./components/ContactOptions";
import Shop from "./components/Shop";
import { HelmetProvider } from "react-helmet-async"; //Optimización SEO
// import Admin from "./components/Admin";
// import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsSection from "./components/ProductsSection";
import MembershipComponent from "./components/MembershipComponent";

const App = () => {
  return (
    <>
      <HelmetProvider>
        <NavBar />
        {/* <BreadcrumbsRoutes /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membershipSection/gestor" element={<Gestor />} />
          <Route path="/products" element={<ProductsSection />} />
          <Route path="/membershipSection" element={<MembershipComponent />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
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
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/shop" element={<Shop />} />
          {/* <Route path="/loguin" element={<Loguin />} />  */}
          {/* <Route
          path="/admin"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <Admin />
            </ProtectedRoute>
          }
        /> */}
        </Routes>
        <WhatsApp />
        <ContactOptions />
        <NewsletterBanner />
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default App;
