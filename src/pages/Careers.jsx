import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitApplication } from '../services/api';
import PageHeader from '../components/PageHeader';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import './Careers.css';

const Careers = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', linkedin_url: '', cover_letter: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('submitting');
      await submitApplication(formData);
      setStatus('success');
      setFormData({ name: '', email: '', role: '', linkedin_url: '', cover_letter: '' });
    } catch (error) {
      console.error("Error submitting application: ", error);
      setStatus('error');
    }
  };
  const benefits = [
    'Top-tier compensation and early-stage equity.',
    'Remote-first culture with hubs in San Jose & Austin.',
    'Unlimited PTO and comprehensive health coverage.',
    'Access to premium EDA tools and immense compute clusters.',
    'Direct mentorship from industry veterans.'
  ];

  return (
    <div className="careers-page">
      <PageHeader 
        title="Join The Revolution" 
        subtitle="Help us build the most efficient compute engines on the planet." 
      />
      
      <section className="section">
        <div className="container">
          <div className="careers-grid">
            <motion.div 
              className="culture-section"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="tech-text mb-4">// OUR_CULTURE</h2>
              <div className="glass-card mb-4" style={{padding: '2rem'}}>
                <p style={{color: 'var(--text-muted)', lineHeight: '1.8'}}>
                  We are a team of passionate engineers who believe that hardware design doesn't have to be 
                  slow and painful. We value first-principles thinking, rigorous verification, and a 
                  blame-free post-mortem culture. If you love solving impossible timing closure issues or 
                  writing elegant UVM sequences, you'll fit right in.
                </p>
              </div>
              
              <h3 className="mb-2">Benefits & Perks</h3>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 size={18} className="benefit-icon" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="application-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="tech-text mb-4">// APPLY_NOW</h2>
              
              <div className="glass-card form-card">
                {status === 'success' ? (
                  <div className="success-message text-center p-4">
                    <h3 className="mb-3">Application Received</h3>
                    <p style={{ color: 'var(--text-muted)' }}>We will review your profile and get back to you soon.</p>
                    <button type="button" className="btn btn-outline mt-4" onClick={() => setStatus('idle')}>
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form className="application-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Target Role</label>
                      <select name="role" className="form-input" value={formData.role} onChange={handleChange} required>
                        <option value="">Select a role...</option>
                        <option value="uvm">Senior UVM Engineer</option>
                        <option value="formal">Formal Verification Lead</option>
                        <option value="rtl">RTL Design Architect</option>
                        <option value="other">General Application</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>LinkedIn / GitHub URL</label>
                      <input type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Why Ionrise?</label>
                      <textarea name="cover_letter" rows="4" value={formData.cover_letter} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Submitting...' : 'Submit Application'} <ChevronRight size={18} />
                    </button>
                    {status === 'error' && (
                      <p className="error-text mt-3">Submission failed. Please try again later.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
