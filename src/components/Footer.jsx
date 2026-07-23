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
            <span className="logo-text">Ionrise</span>
          </Link>
          <p className="footer-desc">
            Next-generation semiconductor technology powering the future of AI and high-performance computing.
          </p>
          <div className="social-links">
            <a href="mailto:hello@ionrise-semiconductors.com" className="social-link" title="Email Us"><MessageCircle size={20} /></a>
            <a href="https://www.linkedin.com/company/ionrise-semiconductors/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><Briefcase size={20} /></a>
            <a href="https://github.com/abhijit-karale" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><Code size={20} /></a>
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
            <Link to="/ip-cores">IP Cores</Link>
            <Link to="/design-flow">Design Flow</Link>
            <Link to="/datasheets">Datasheets</Link>
            <Link to="/partners">Partners</Link>
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
          <p>&copy; {new Date().getFullYear()} Ionrise Semiconductors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
