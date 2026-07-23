import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { ShieldCheck, HardDrive, Cpu, TerminalSquare } from 'lucide-react';

const Partners = () => {
  const nodes = ['TSMC 28nm HPC', 'GlobalFoundries 22FDX', 'UMC 65nm', 'Intel 16 (Planned)'];
  const eda = [
    { name: 'Cadence Xcelium', icon: TerminalSquare, desc: 'Primary logic simulation and UVM regression.' },
    { name: 'Synopsys Design Compiler', icon: HardDrive, desc: 'Synthesis and timing constraint validation.' },
    { name: 'Siemens Questa', icon: ShieldCheck, desc: 'Formal verification and property checking.' },
    { name: 'OpenROAD / Yosys', icon: Cpu, desc: 'Open-source flow integration and rapid prototyping.' }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Ecosystem & Partners" 
        subtitle="Process nodes and EDA toolchains validated in our design flow." 
      />
      
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <p className="tech-text" style={{ marginBottom: '2rem' }}>/* ILLUSTRATIVE ECOSYSTEM SUPPORT */</p>
            <h2 className="section-title" style={{ justifyContent: 'center' }}>Supported Process Nodes</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
              {nodes.map((node, i) => (
                <motion.div 
                  key={node}
                  className="glass-card"
                  style={{ padding: '1rem 2rem', minWidth: '200px' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="tech-text" style={{ color: 'var(--wafer-silver)', fontSize: '1.1rem' }}>{node}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '6rem' }}>
            <h2 className="section-title text-center" style={{ justifyContent: 'center' }}>EDA Tool Compatibility</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {eda.map((tool, index) => (
                <motion.div 
                  key={index}
                  className="glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>
                    <tool.icon size={32} />
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{tool.name}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
