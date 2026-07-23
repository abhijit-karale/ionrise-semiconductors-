import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DuotoneImage from '../components/DuotoneImage';
import { FileText, CheckCircle, Lock } from 'lucide-react';

const Datasheets = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', core: 'core-rv32i' });
  const [status, setStatus] = useState('idle');
  const location = useLocation();

  const availableDocs = [
    { id: 'core-rv32i', name: 'IonCore RV32I Processor', version: 'v2.1.0', seed: 'riscv-diagram' },
    { id: 'core-apb-slave', name: 'AMBA APB 4.0 Peripheral Hub', version: 'v1.4.2', seed: 'amba-diagram' },
    { id: 'core-uart', name: 'IonUART Controller', version: 'v3.0.1', seed: 'uart-diagram' },
    { id: 'core-sync-fifo', name: 'Sync/Async CDC FIFO', version: 'v2.2.0', seed: 'fifo-diagram' },
    { id: 'core-axi-lite', name: 'AXI4-Lite Slave', version: 'v0.9.0-beta', seed: 'axi-diagram' }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const coreParam = params.get('core');
    if (coreParam && availableDocs.find(d => d.id === coreParam)) {
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
        title="Technical Documentation" 
        subtitle="Request detailed datasheets, register maps, and integration guides for our IP cores." 
      />
      
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', marginBottom: '4rem', lineHeight: 1.8 }}>
            Our datasheets contain everything you need for architectural evaluation, including exact gate counts (synthesized on standard 28nm libraries), detailed timing diagrams for bus interfaces, and comprehensive register map definitions. Due to the proprietary nature of our coverage metrics, full documentation is gated behind a standard NDA-lite request.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem' }}>
            {/* Left Column: List of Docs */}
            <div>
              <h2 className="tech-text mb-4" style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>// AVAILABLE_DOCUMENTS</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {availableDocs.map((doc, index) => (
                  <motion.div 
                    key={doc.id}
                    className="glass-card"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem',
                      border: formData.core === doc.id ? '1px solid var(--accent-teal)' : '1px solid var(--surface-border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => setFormData({ ...formData, core: doc.id })}
                  >
                    <div style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                      <DuotoneImage src={`https://picsum.photos/seed/${doc.seed}/160/120?grayscale`} alt={doc.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>{doc.name}</h4>
                      <div className="tech-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Version {doc.version}</div>
                    </div>
                    {formData.core === doc.id && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-teal)', boxShadow: 'var(--glow-teal)' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Request Form */}
            <div>
              <motion.div 
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ position: 'sticky', top: '100px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Lock size={20} style={{ color: 'var(--accent-gold)' }} />
                  <h2 style={{ color: 'var(--text-main)', fontSize: '1.25rem', margin: 0 }}>Secure Request</h2>
                </div>
                
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
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
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Selected IP Core</label>
                      <select 
                        name="core" 
                        value={formData.core} 
                        onChange={handleChange} 
                        required
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}
                      >
                        {availableDocs.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Full Name</label>
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
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Corporate Email</label>
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
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Company</label>
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
                      {status === 'submitting' ? 'Processing...' : 'Request Documentation'} <FileText size={18} />
                    </button>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
                      By requesting this document, you agree to our standard IP evaluation terms.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datasheets;
