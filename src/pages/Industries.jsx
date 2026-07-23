import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Cpu, Factory, Database, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
  const industries = [
    { icon: Cpu, title: 'Semiconductor & IP Vendors', desc: 'RTL/DV services and custom verification IP development.' },
    { icon: Factory, title: 'Industrial Automation & Controls', desc: 'STM32/ARM firmware, PCB-level debugging, and RTOS solutions.' },
    { icon: Database, title: 'IoT & Embedded Products', desc: 'Power-efficient firmware, sensor bring-up, and peripheral drivers.' },
    { icon: Microscope, title: 'Academic & R&D Labs', desc: 'FPGA prototyping and formal verification support for novel architectures.' }
  ];

  return (
    <div className="industries-page">
      <PageHeader 
        title="Industries We Serve" 
        subtitle="Leveraging our hardware expertise across diverse verticals." 
      />
      
      <section className="section">
        <div className="container">
          <div className="value-grid">
            {industries.map((ind, index) => (
              <motion.div 
                key={index}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="icon-wrapper" style={{ marginBottom: '1.5rem' }}>
                  <ind.icon size={32} />
                </div>
                <h3 className="mb-2" style={{ marginBottom: '0.5rem' }}>{ind.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/contact" className="btn btn-primary">Discuss Your Use Case</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
