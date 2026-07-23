import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import DuotoneImage from '../components/DuotoneImage';
import { Shield, Zap, Target, History, Cpu, FileCheck } from 'lucide-react';
import './About.css';

const About = () => {
  const timeline = [
    { year: 'Phase 1: Architecture Definition', title: 'Ionrise Founded', desc: 'Identified the gap in the market for rigorously verified, affordable IP cores for mid-sized IoT and edge-compute design teams.', icon: Target },
    { year: 'Phase 2: First RTL Freeze', title: 'RISC-V Core Tape-Out Ready', desc: 'Completed the RTL design and basic directed testbenches for our flagship IonCore RV32I 5-stage pipeline.', icon: Cpu },
    { year: 'Phase 3: Coverage Closure', title: 'UVM Methodology Adopted', desc: 'Transitioned the entire verification infrastructure to constrained-random UVM, achieving 100% functional coverage on all interface IP.', icon: FileCheck },
    { year: 'Phase 4: Silicon Sign-off', title: 'Expanding the Catalog', desc: 'Currently expanding our portfolio to include advanced AMBA interconnects and asynchronous FIFOs.', icon: Zap }
  ];

  return (
    <div className="about-page page-container">
      <PageHeader 
        title="Who We Are" 
        subtitle="We build the verified silicon foundations for the next generation of edge intelligence." 
      />

      {/* Company Story & Founder Bio */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem', alignItems: 'start' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4" style={{ color: 'var(--text-main)' }}>Our Story</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Ionrise Semiconductors was founded out of a direct frustration with the current IP licensing landscape. Startups and mid-sized SoC teams are often forced to choose between extremely expensive, legacy IP from the tier-one EDA giants, or unreliable, open-source cores pulled from academic GitHub repositories that break down during the synthesis phase.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                Our mission is to bridge that gap. We provide resource-constrained design teams with silicon-proven, highly configurable RTL cores that don't require a massive upfront licensing fee. We focus exclusively on foundational blocks—RISC-V compute, AMBA interconnects, and critical interfaces—so you can focus on building your differentiating system-level logic.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                What truly sets us apart is our verification methodology. We don't just ship Verilog. Every IP block we release comes with a full UVM testbench, JasperGold formal proofs for critical CDC paths, and 100% functional coverage metrics. We treat verification as the product itself, ensuring that our cores integrate into your SoC seamlessly on the first tape-out.
              </p>
            </motion.div>
            
            <motion.div 
              className="glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}
            >
              <div style={{ height: '300px', borderRadius: '4px', overflow: 'hidden' }}>
                <DuotoneImage src="https://picsum.photos/seed/abhijit-headshot/400/400?grayscale" alt="Abhijit Karale" />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>Abhijit Karale</h3>
                <div className="tech-text" style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', marginBottom: '1rem' }}>Founder & Principal Engineer</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  With a background spanning embedded firmware, analog circuit design, and digital hardware, Abhijit leads the architectural definition and UVM verification strategy at Ionrise. He brings hands-on experience debugging silicon-to-firmware integration issues from his time in the embedded systems industry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: 'rgba(230, 237, 243, 0.02)' }}>
        <div className="container">
          <h2 className="section-title text-center mb-5" style={{ justifyContent: 'center' }}>Core Engineering Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: Shield, title: 'Paranoid Verification', desc: 'If it hasn\'t been formally proven and hit 100% functional coverage, it isn\'t done. We assume all RTL is broken until mathematically and exhaustively proven otherwise.' },
              { icon: Zap, title: 'Clean Synthesizability', desc: 'Academic cores are full of unsynthesizable constructs. We write strict, static RTL that easily passes through Design Compiler without throwing timing or CDC violations.' },
              { icon: FileCheck, title: 'Absolute Transparency', desc: 'Our clients get full access to our UVM verification plans, test coverage reports, and known errata. We don\'t hide bugs behind encrypted netlists.' }
            ].map((val, i) => (
              <motion.div 
                key={val.title}
                className="glass-card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0, 229, 192, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>
                  <val.icon size={32} />
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{val.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tape-out Timeline */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center mb-5" style={{ justifyContent: 'center' }}>The Tape-Out Timeline</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50px', width: '2px', background: 'var(--surface-border)', zIndex: 0 }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}
                >
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid var(--accent-teal)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', 
                    boxShadow: 'var(--glow-teal)', flexShrink: 0, marginLeft: '31px' 
                  }}>
                    <item.icon size={18} />
                  </div>
                  <div className="glass-card" style={{ flex: 1 }}>
                    <div className="tech-text" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>{item.year}</div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
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
