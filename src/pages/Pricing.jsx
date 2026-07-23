import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const tiers = [
    {
      title: 'Module-level RTL/DV',
      desc: 'Design and self-checking testbench for a single peripheral or block (e.g., UART, FIFO, APB slave). Includes coverage report.',
      price: 'Scoped per project',
      highlights: ['Module RTL design', 'Self-checking UVM/SV testbench', 'Functional coverage report']
    },
    {
      title: 'UVM Testbench Engagement',
      desc: 'Layered UVM environment build-out for an existing RTL block. Full coverage closure included.',
      price: 'Scoped per project',
      highlights: ['UVM architecture setup', 'Constrained-random sequences', 'Coverage closure & signoff']
    },
    {
      title: 'Formal Verification Add-on',
      desc: 'SVA authoring and JasperGold property proving for a defined block to guarantee no escape defects.',
      price: 'Scoped per project',
      highlights: ['SVA assertions', 'Mathematical proofs', 'Corner-case bug hunting']
    },
    {
      title: 'Custom / SoC-scale',
      desc: 'Multi-block integration, CDC analysis, synthesis and static timing review.',
      price: 'Quote on request',
      highlights: ['Full SoC integration', 'CDC & Linting', 'Synthesis & Timing closure']
    }
  ];

  return (
    <div className="pricing-page">
      <PageHeader 
        title="Engagement Models" 
        subtitle="Transparent, project-based scoping for RTL and Verification services." 
      />
      
      <section className="section">
        <div className="container">
          <div className="value-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {tiers.map((tier, index) => (
              <motion.div 
                key={index}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>{tier.title}</h3>
                <div className="tech-text" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                  {tier.price}
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>{tier.desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                  {tier.highlights.map((hl, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--accent-blue)' }}>▹</span> {hl}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="glass-card" 
            style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem 2rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Ready to get started?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Every engagement starts with a scoping call — final pricing depends on block complexity, coverage targets, and timeline.
            </p>
            <Link to="/contact" className="btn btn-primary">Request a Scoping Call</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
