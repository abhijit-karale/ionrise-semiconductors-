import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Cpu, Rocket, Code, Award } from 'lucide-react';
import './About.css';

const About = () => {
  const timeline = [
    { year: '2024', title: 'Corevexis Founded', desc: 'Established in stealth mode with a seed round of $12M led by deep-tech VCs.' },
    { year: '2025', title: 'First Silicon Success', desc: 'Successfully taped out our first internally verified RISC-V edge accelerator.' },
    { year: '2026', title: 'UVM Framework Launch', desc: 'Released our proprietary coverage-driven UVM framework for rapid verification.' },
    { year: '2027', title: 'Series A', desc: 'Scaling the team to support Tier-1 datacenters and automotive clients.' }
  ];

  return (
    <div className="about-page">
      <PageHeader 
        title="Who We Are" 
        subtitle="We exist to eliminate the friction in custom silicon development." 
      />

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="tech-text mb-4">// OUR_MISSION</h2>
              <p className="large-text">
                Silicon design is notoriously difficult, expensive, and prone to catastrophic failure. 
                At Corevexis, we bring modern software engineering principles to hardware design.
              </p>
              <p>
                By integrating continuous integration, exhaustive formal verification, and automated 
                coverage closure, we dramatically reduce time-to-market for complex SoCs while ensuring 
                first-pass silicon success. We don't just write Verilog; we engineer bulletproof logic.
              </p>
            </motion.div>
            
            <motion.div 
              className="about-stats glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="stat-row">
                <Cpu size={32} className="stat-icon" />
                <div>
                  <h4>10M+</h4>
                  <p>Gate Counts Supported</p>
                </div>
              </div>
              <div className="stat-row">
                <Rocket size={32} className="stat-icon" />
                <div>
                  <h4>5x</h4>
                  <p>Faster Coverage Closure</p>
                </div>
              </div>
              <div className="stat-row">
                <Code size={32} className="stat-icon" />
                <div>
                  <h4>100%</h4>
                  <p>UVM Compliant</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="timeline-section mt-5">
            <h2 className="section-title">Timeline</h2>
            <div className="timeline-grid">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="timeline-year tech-text">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
