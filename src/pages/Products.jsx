import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import DuotoneImage from '../components/DuotoneImage';
import { Cpu, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const families = [
    {
      id: 'edge-ai',
      icon: Cpu,
      title: 'Edge-AI Compute IP',
      desc: 'Our Edge-AI Compute IP family provides parameterized RISC-V cores coupled with dedicated vector extensions for inferencing at the edge. Designed for minimal power envelops while maintaining high throughput, these cores allow you to run neural networks locally on sensor nodes without relying on cloud connectivity. We provide reference synthesis scripts to hit 1GHz+ on modern 28nm nodes.',
      specs: ['Vector Extensions (RV32V)', 'Configurable Cache', 'AXI4 Master Interface'],
      seed: 'ai-chip'
    },
    {
      id: 'automotive',
      icon: Activity,
      title: 'Automotive-Grade Interface IP',
      desc: 'Automotive SoCs require absolute reliability. Our Automotive Interface IP includes ISO 26262 ASIL-D ready CAN FD controllers, automotive Ethernet MACs, and high-reliability SPI nodes. Every block in this family undergoes rigorous fault injection and formal verification to ensure it can survive the harshest operating conditions inside powertrains and ADAS units.',
      specs: ['ISO 26262 Ready', 'Fault Injection Verified', 'ECC Memory Protection'],
      seed: 'automotive-pcb'
    },
    {
      id: 'iot',
      icon: Zap,
      title: 'IoT Connectivity IP',
      desc: 'For ultra-low power sensor nodes, every micro-watt matters. The IoT Connectivity family consists of asynchronous UARTs, low-power I2C/SPI bridges, and wake-up timers designed using aggressive clock gating and multiple power domains. These blocks are optimized for sub-threshold leakage, extending the battery life of your remote sensors by years.',
      specs: ['Multi-Power Domain (UPF)', 'Aggressive Clock Gating', 'Asynchronous Wake-up'],
      seed: 'iot-sensor'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Silicon Product Families" 
        subtitle="Application-specific IP bundles parameterized for your exact SoC requirements." 
      />
      
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', marginBottom: '4rem', lineHeight: 1.8 }}>
            Ionrise IP is organized into three distinct product families based on their target operating environment. Whether you are maximizing TOPS/W for edge inferencing or minimizing static leakage for a coin-cell operated sensor, our verification team has already modeled the necessary corner cases.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {families.map((fam, index) => (
              <motion.div 
                key={fam.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ display: 'grid', gridTemplateColumns: index % 2 === 0 ? '1.5fr 1fr' : '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}
              >
                <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>
                    <fam.icon size={32} />
                    <h2 style={{ color: 'var(--text-main)', margin: 0 }}>{fam.title}</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{fam.desc}</p>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 className="tech-text" style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>Key Features:</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {fam.specs.map(spec => (
                        <li key={spec} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/ip-cores" className="btn btn-outline" style={{ display: 'inline-flex' }}>View Cores in Family</Link>
                </div>
                
                <div style={{ order: index % 2 === 0 ? 2 : 1, height: '350px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <DuotoneImage src={`https://picsum.photos/seed/${fam.seed}/600/600?grayscale`} alt={fam.title} />
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '6rem' }}>
            <h2 className="section-title text-center mb-5" style={{ justifyContent: 'center' }}>Family Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="spec-table" style={{ width: '100%', minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Family</th>
                    <th>Target Process Node</th>
                    <th>Typical Clock Speed</th>
                    <th>Verification Depth</th>
                    <th>Power Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: 'var(--text-main)' }}>Edge-AI Compute</td>
                    <td>16nm – 28nm FinFET/Planar</td>
                    <td>800MHz – 1.5GHz</td>
                    <td>UVM, Formal CDC/RDC</td>
                    <td>Performance/Watt focused</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-main)' }}>Automotive Interface</td>
                    <td>40nm – 65nm Automotive</td>
                    <td>50MHz – 200MHz</td>
                    <td>ISO 26262 Fault Injection</td>
                    <td>High voltage tolerance</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--text-main)' }}>IoT Connectivity</td>
                    <td>55nm – 130nm ULP</td>
                    <td>32kHz – 48MHz</td>
                    <td>UPF Power-Intent Sim</td>
                    <td>Sub-mW, High Sleep %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center', background: 'rgba(0, 229, 192, 0.05)', padding: '3rem', borderRadius: '4px', border: '1px solid var(--surface-border)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Need a Custom Architecture?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
              Run your specifications through our design pipeline visualizer to estimate project timelines and verification risks for bespoke IP blocks.
            </p>
            <Link to="/design-flow" className="btn btn-primary">Open Design Flow Visualizer</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
