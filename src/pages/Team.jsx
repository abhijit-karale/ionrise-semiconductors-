import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Briefcase, MessageCircle, Code } from 'lucide-react';
import './Team.css';

const Team = () => {
  return (
    <div className="team-page">
      <PageHeader 
        title="Leadership" 
        subtitle="Driven by decades of combined experience in silicon design and verification." 
      />
      
      <section className="section">
        <div className="container">
          <div className="founder-card glass-card">
            <div className="founder-grid">
              <div className="founder-image-placeholder">
                <div className="image-circuit"></div>
              </div>
              <div className="founder-info">
                <h2 className="tech-text mb-2">// FOUNDER_&_RTL/DV_ENGINEER</h2>
                <h3 className="founder-name">Abhijit Karale</h3>
                <p className="founder-bio">
                  Ahmedabad, Gujarat, India. RTL Design & Verification Engineer with 2+ years of embedded systems and hardware design experience. Currently Embedded Firmware Engineer at Velastra Pvt. Ltd.
                </p>
                <p className="founder-bio">
                  Certified by Maven Silicon, ChipXpert, IIT (BHU) Varanasi, and The Silicon Sandbox. Former Vice President, Electronics & Telecommunication Student Association, MAEER's MIT College of Railway Engineering & Research — organized workshops and events for 200+ students, mentored juniors on VLSI/embedded career paths.
                </p>
                <div className="founder-socials" style={{ marginTop: '1.5rem' }}>
                  <a href="mailto:hello@ionrise-semiconductors.com" className="social-icon" title="hello@ionrise-semiconductors.com"><MessageCircle size={20}/></a>
                  <a href="https://github.com/abhijit-karale" target="_blank" rel="noreferrer" className="social-icon" title="GitHub"><Code size={20}/></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn"><Briefcase size={20}/></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hiring-section mt-5" style={{textAlign: 'center'}}>
            <h2 className="section-title text-center" style={{justifyContent: 'center'}}>Open Roles</h2>
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                Ionrise is a founder-led team today — reach out if you're an RTL/DV engineer interested in early-stage collaboration.
              </p>
              <a href="/#/careers" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>View Careers</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
