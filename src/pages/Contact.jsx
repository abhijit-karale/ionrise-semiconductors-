import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PageHeader from '../components/PageHeader';
import { Send, MapPin, Calendar, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      // Mock successful submission if Firebase config is missing
      setStatus('submitting');
      setTimeout(() => setStatus('success'), 1500);
      return;
    }

    try {
      setStatus('submitting');
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date()
      });
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
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
                  <p>123 Silicon Way<br/>San Jose, CA 95134<br/>United States</p>
                </div>
              </div>

              <div className="info-card glass-card">
                <Mail className="info-icon" />
                <div>
                  <h3>Direct Inquiry</h3>
                  <p>tapeout@corevexis.com</p>
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
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required />
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
