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

const Legal = ({ title }) => (
  <GenericPage title={title} subtitle="Standard legal documentation.">
    <p>This is a placeholder for the {title} documentation. Corevexis Semiconductor ensures all intellectual property and data are handled with the highest security standards.</p>
  </GenericPage>
);

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
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal title="Privacy Policy" />} />
        <Route path="/terms" element={<Legal title="Terms of Service" />} />
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
