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
                <h2 className="tech-text mb-2">// FOUNDER_CEO</h2>
                <h3 className="founder-name">Abhijit Karale</h3>
                <p className="founder-bio">
                  Former Principal Engineer at top-tier semiconductor firms. Abhijit led the verification 
                  efforts for multiple successful server-class CPU tapeouts. Frustrated by the inefficiencies 
                  in traditional DV methodologies, he founded Corevexis to bring agile software practices 
                  to the world of hardware engineering.
                </p>
                <div className="founder-socials">
                  <a href="#" className="social-icon"><Briefcase size={20}/></a>
                  <a href="#" className="social-icon"><Code size={20}/></a>
                  <a href="#" className="social-icon"><MessageCircle size={20}/></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hiring-section mt-5">
            <h2 className="section-title text-center" style={{justifyContent: 'center'}}>We Are Hiring</h2>
            <p className="section-subtitle" style={{margin: '0 auto 3rem'}}>Join our core team and help redefine silicon design.</p>
            
            <div className="roles-grid">
              {[
                { role: 'Senior UVM Engineer', location: 'San Jose / Remote', type: 'Full-time' },
                { role: 'Formal Verification Lead', location: 'Austin, TX / Remote', type: 'Full-time' },
                { role: 'RTL Design Architect', location: 'Remote', type: 'Full-time' }
              ].map((job, index) => (
                <motion.div 
                  key={index}
                  className="role-card glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4>{job.role}</h4>
                  <div className="role-meta tech-text">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
