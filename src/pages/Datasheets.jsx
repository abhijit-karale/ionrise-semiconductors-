import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { FileText, CheckCircle } from 'lucide-react';

const Datasheets = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', core: 'core-uart' });
  const [status, setStatus] = useState('idle');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const coreParam = params.get('core');
    if (coreParam) {
      setFormData(prev => ({ ...prev, core: coreParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="Datasheet Access" 
        subtitle="Request technical documentation and register maps for our IP cores." 
      />
      
      <section className="section">
        <div className="container" style={{ maxWidth: '600px' }}>
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="tech-text mb-4">// DOCUMENTATION_REQUEST</h2>
            
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--pcb-green)', margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Request Approved</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  The requested datasheet has been sent to <strong>{formData.email}</strong>. 
                  Please check your inbox.
                </p>
                <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => setStatus('idle')}>
                  Request Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Target IP Core</label>
                  <select 
                    name="core" 
                    value={formData.core} 
                    onChange={handleChange} 
                    required
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}
                  >
                    <option value="core-uart">UART Controller</option>
                    <option value="core-apb-slave">AMBA APB Slave</option>
                    <option value="core-axi-lite">AXI4-Lite Slave</option>
                    <option value="core-rv32i">RISC-V CPU Core</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', color: 'var(--text-main)' }}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Corporate Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', color: 'var(--text-main)' }}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Company</label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    required 
                    style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', color: 'var(--text-main)' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Processing...' : 'Download PDF'} <FileText size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Datasheets;
