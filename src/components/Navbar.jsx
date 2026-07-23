import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navGroups = [
    {
      name: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog & News', path: '/blog' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      name: 'Solutions',
      links: [
        { name: 'Products', path: '/products' },
        { name: 'IP Cores', path: '/ip-cores' },
        { name: 'Design Flow', path: '/design-flow' },
        { name: 'Datasheets', path: '/datasheets' },
        { name: 'Partners', path: '/partners' }
      ]
    },
    {
      name: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Cpu className="logo-icon" size={28} />
          <span className="logo-text">Ionrise</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only" style={{ display: 'flex', gap: '2.5rem' }}>
          {navGroups.map((group) => (
            <div 
              key={group.name} 
              className="nav-item-group"
              onMouseEnter={() => setActiveDropdown(group.name)}
              onMouseLeave={() => setActiveDropdown(null)}
              style={{ position: 'relative', padding: '1.5rem 0' }}
            >
              <div className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                {group.name} <ChevronDown size={14} />
              </div>
              
              {/* Dropdown Menu */}
              {activeDropdown === group.name && (
                <div 
                  className="dropdown-menu glass-card"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: '200px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    zIndex: 1000
                  }}
                >
                  {group.links.map(link => (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className="dropdown-link"
                      style={{
                        padding: '0.5rem 1rem',
                        color: location.pathname === link.path ? 'var(--accent-teal)' : 'var(--text-main)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        borderRadius: '2px',
                        transition: 'background 0.2s',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,192,0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
        <div className="mobile-menu" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
          {navGroups.map((group) => (
            <div key={group.name} style={{ marginBottom: '1.5rem' }}>
              <div className="tech-text" style={{ marginBottom: '0.75rem', opacity: 0.7 }}>// {group.name}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid var(--surface-border)' }}>
                {group.links.map((link) => (
                  <Link key={link.name} to={link.path} className="mobile-link" style={{ fontSize: '1rem' }}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/contact" className="btn btn-primary mobile-cta">Initiate Handshake</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
