import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GenericPage from './pages/GenericPage';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Process from './pages/Process';
import TechStack from './pages/TechStack';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Industries from './pages/Industries';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import IPCores from './pages/IPCores';
import Products from './pages/Products';
import Partners from './pages/Partners';
import Datasheets from './pages/Datasheets';
import DesignFlow from './pages/DesignFlow';
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};


const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/process" element={<Process />} />
        <Route path="/technology" element={<TechStack />} />
        <Route path="/team" element={<Team />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ip-cores" element={<IPCores />} />
        <Route path="/products" element={<Products />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/datasheets" element={<Datasheets />} />
        <Route path="/design-flow" element={<DesignFlow />} />
        <Route path="/design-flow/f/:id" element={<DesignFlow />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </PageTransition>
  );
};

const App = () => {
  return (
    <Router>
      <div className="page-wrapper">
        <Navbar />
        <main className="page-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
