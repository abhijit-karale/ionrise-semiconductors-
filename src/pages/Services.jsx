import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import './Services.css';

const Services = () => {
  const [activeBlock, setActiveBlock] = useState(null);

  const services = [
    { id: 'rtl', label: 'RTL Design', desc: 'Front-end microarchitecture & logic design in SystemVerilog.' },
    { id: 'uvm', label: 'UVM Verification', desc: 'Constrained random, coverage-driven verification using Universal Verification Methodology.' },
    { id: 'formal', label: 'Formal Verification', desc: 'Property checking and mathematical proofs for critical control logic.' },
    { id: 'dft', label: 'DFT / ATPG', desc: 'Design for Testability insertions, JTAG, BIST, and scan chains.' },
    { id: 'fw', label: 'Embedded Firmware', desc: 'Bare-metal C and RTOS development closely coupled with hardware.' }
  ];

  return (
    <div className="services-page">
      <PageHeader 
        title="Engineering Services" 
        subtitle="From architectural spec to tapeout signoff, we cover the complete silicon lifecycle."
      />

      <section className="section">
        <div className="container">
          <div className="block-diagram-container glass-card">
            <h2 className="diagram-title tech-text">// INTERACTIVE_PIPELINE</h2>
            
            <div className="diagram-grid">
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  className={`diagram-block ${activeBlock === service.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveBlock(service.id)}
                  onMouseLeave={() => setActiveBlock(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="block-node">
                    <div className="node-pulse"></div>
                    <span className="node-label">{service.label}</span>
                  </div>
                  
                  {activeBlock === service.id && (
                    <motion.div 
                      className="block-tooltip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {service.desc}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* SVG connecting lines mapping the blocks */}
            <svg className="diagram-connections" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <motion.path 
                d="M 100 100 L 900 100" 
                stroke="var(--surface-border)" 
                strokeWidth="2" 
                fill="none" 
              />
              {activeBlock && (
                <motion.path 
                  d="M 100 100 L 900 100" 
                  stroke="var(--accent-teal)" 
                  strokeWidth="3" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ filter: 'drop-shadow(0 0 8px var(--accent-teal))' }}
                />
              )}
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
