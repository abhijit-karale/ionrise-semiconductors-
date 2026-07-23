import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, MessageCircle, Briefcase, Code } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Cpu className="logo-icon" size={28} />
            <span className="logo-text">Corevexis</span>
          </Link>
          <p className="footer-desc">
            Next-generation semiconductor technology powering the future of AI and high-performance computing.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><MessageCircle size={20} /></a>
            <a href="#" className="social-link"><Briefcase size={20} /></a>
            <a href="#" className="social-link"><Code size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4 className="group-title">Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog & News</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className="link-group">
            <h4 className="group-title">Solutions</h4>
            <Link to="/products">Products</Link>
            <Link to="/technology">Technology</Link>
            <Link to="/industries">Industries</Link>
            <Link to="/pricing">Pricing</Link>
          </div>

          <div className="link-group">
            <h4 className="group-title">Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Corevexis Semiconductor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
