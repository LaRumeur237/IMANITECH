
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import PackagesPage from './pages/PackagesPage';
import MethodPage from './pages/MethodPage';
import DigitalSolutionsPage from './pages/DigitalSolutionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuditLanding from './pages/AuditLanding';
import { AppRoute } from './types';

// Composant pour forcer le retour en haut de page sans défilement visible
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Landing Page without standard layout */}
        <Route path={AppRoute.Audit} element={<AuditLanding />} />
        
        {/* Pages with Global Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={AppRoute.Services} element={<ServicesPage />} />
          <Route path={AppRoute.CaseStudies} element={<CaseStudiesPage />} />
          <Route path={AppRoute.Packages} element={<PackagesPage />} />
          <Route path={AppRoute.Method} element={<MethodPage />} />
          <Route path={AppRoute.DigitalSolutions} element={<DigitalSolutionsPage />} />
          <Route path={AppRoute.About} element={<AboutPage />} />
          <Route path={AppRoute.Contact} element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





