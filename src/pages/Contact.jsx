import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm } from '../services/api';
import PageHeader from '../components/PageHeader';
import { Send, MapPin, Calendar, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', projectType: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('submitting');
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <PageHeader 
        title="Initiate Handshake" 
        subtitle="Secure a meeting with our engineering leads to discuss your silicon requirements." 
      />
      
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="tech-text mb-4">// GLOBAL_PRESENCE</h2>
              
              <div className="info-card glass-card">
                <MapPin className="info-icon" />
                <div>
                  <h3>Headquarters</h3>
                  <p>Ahmedabad, Gujarat<br/>India</p>
                </div>
              </div>

              <div className="info-card glass-card">
                <Mail className="info-icon" />
                <div>
                  <h3>Direct Inquiry</h3>
                  <p>hello@ionrise-semiconductors.com</p>
                </div>
              </div>

              <div className="info-card glass-card">
                <Calendar className="info-icon" />
                <div>
                  <h3>Schedule Discovery Call</h3>
                  <a href="#" className="btn btn-outline" style={{marginTop: '1rem'}}>
                    View Calendly
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="contact-form-wrapper glass-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="tech-text mb-4">// TRANSMIT_DATA</h2>
              
              {status === 'success' ? (
                <div className="success-message">
                  <h3>Transmission Successful</h3>
                  <p>Our engineering team will review your requirements and respond within 24 hours.</p>
                  <button className="btn btn-outline mt-3" onClick={() => setStatus('idle')}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Corporate Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} />
                  </div>
                  
                  <div className="form-group">
                    <label>Project Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} required>
                      <option value="">Select an option</option>
                      <option value="RTL Design">RTL Design</option>
                      <option value="Verification">Verification</option>
                      <option value="Formal Verification">Formal Verification</option>
                      <option value="Embedded Firmware">Embedded Firmware</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Project Specifications</label>
                    <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Transmitting...' : 'Send Message'} <Send size={18} />
                  </button>
                  
                  {status === 'error' && (
                    <p className="error-text mt-3">Connection failed. Please check your network or email us directly.</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
