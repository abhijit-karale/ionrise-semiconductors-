import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Tech', path: '/technology' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Cpu className="logo-icon" size={28} />
          <span className="logo-text">Corevexis</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <Link to="/contact" className="btn btn-primary">Initiate Handshake</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="mobile-link">
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary mobile-cta">Initiate Handshake</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
