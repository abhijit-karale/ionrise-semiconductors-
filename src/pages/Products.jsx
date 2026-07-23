import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Cpu, Activity, Zap, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    {
      icon: Activity,
      title: 'Automotive Edge',
      desc: 'ASIL-D compliant IP integrations for powertrain, ADAS, and in-cabin networking.',
      tags: ['ISO 26262', 'CAN FD', 'Fault-Tolerant']
    },
    {
      icon: Zap,
      title: 'IoT & Ultra-Low Power',
      desc: 'Sub-threshold designs and power-gated peripherals extending battery life for edge sensors.',
      tags: ['Power Domains', 'Always-On', 'Sub-mW']
    },
    {
      icon: Server,
      title: 'Data Center Accelerators',
      desc: 'High-throughput PCIe and CXL integrations for AI training and inferencing chips.',
      tags: ['PCIe Gen6', 'CXL', 'High-Bandwidth']
    },
    {
      icon: Cpu,
      title: 'Custom SoCs',
      desc: 'Full-stack RTL-to-GDSII pipeline management for bespoke silicon.',
      tags: ['Turnkey', 'P&R', 'Signoff']
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Silicon Lineup" 
        subtitle="Application-specific product families tailored to your domain." 
      />
      
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.map((prod, index) => (
              <motion.div 
                key={index}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>
                  <prod.icon size={36} />
                </div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>{prod.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{prod.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {prod.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '2px', border: '1px solid rgba(59,130,246,0.3)', fontFamily: 'var(--font-mono)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Need a Custom Architecture?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Run your specifications through our design pipeline visualizer to estimate project timelines and verification risks.
            </p>
            <Link to="/design-flow" className="btn btn-primary">Open Design Flow Visualizer</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
