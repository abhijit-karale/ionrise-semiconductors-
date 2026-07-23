import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Activity, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUpPkg from 'react-countup';
const CountUp = CountUpPkg.default || CountUpPkg;
import './Home.css';

const Home = () => {
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooted(true);
    }, 2500); // SVG animation duration
    return () => clearTimeout(timer);
  }, []);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="tech-badge"
              >
                // SYSTEM_READY
              </motion.div>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                From gate-level RTL <br />
                <span className="accent-teal">to silicon reality</span>
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Ionrise Semiconductors designs and verifies digital hardware — from protocol peripherals to pipelined processors — with simulation-proven, coverage-closed RTL.
              </motion.p>
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/ip-cores" className="btn btn-primary">
                  Explore IP Cores <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Talk to Us
                </Link>
              </motion.div>
            </div>
            
            <div className="hero-graphic">
              {/* Boot-up SVG Chip Animation */}
              <svg width="400" height="400" viewBox="0 0 400 400" className="chip-svg">
                <motion.rect 
                  x="100" y="100" width="200" height="200" rx="20" 
                  stroke="var(--accent-teal)" strokeWidth="4" fill="var(--bg-color)"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path 
                  d="M150 150 L250 150 L250 250 L150 250 Z" 
                  stroke="var(--accent-gold)" strokeWidth="2" fill="none"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* Pins */}
                {[50, 100, 150, 200, 250, 300, 350].map((y, i) => (
                  <React.Fragment key={`pin-${i}`}>
                    <motion.line x1="0" y1={y} x2="100" y2={y} stroke="var(--surface-border)" strokeWidth="2" variants={pathVariants} initial="hidden" animate="visible" />
                    <motion.line x1="300" y1={y} x2="400" y2={y} stroke="var(--surface-border)" strokeWidth="2" variants={pathVariants} initial="hidden" animate="visible" />
                  </React.Fragment>
                ))}
                {/* Circuit Traces */}
                <motion.path d="M50 50 L100 100 M350 50 L300 100 M50 350 L100 300 M350 350 L300 300" stroke="var(--accent-blue)" strokeWidth="3" variants={pathVariants} initial="hidden" animate="visible" />
                
                {isBooted && (
                  <motion.circle cx="200" cy="200" r="10" fill="var(--accent-teal)"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ filter: 'drop-shadow(0 0 10px var(--accent-teal))' }}
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">
                <CountUp end={5} duration={2} suffix="+" />
              </div>
              <div className="stat-label tech-text">Verified IP Cores</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-number">
                <CountUp end={96} duration={2.5} suffix="%+" />
              </div>
              <div className="stat-label tech-text">Avg. Functional Coverage</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">
                <CountUp end={3} duration={2} />
              </div>
              <div className="stat-label tech-text">AMBA Protocols Supported</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">
                <CountUp end={2} duration={2} />
              </div>
              <div className="stat-label tech-text">Fab Process Nodes Targeted</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="value-section section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Why Ionrise?
          </motion.h2>
          
          <div className="value-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {[
              { icon: Activity, title: 'Silicon-Proven Verification', desc: 'We do not just write RTL; we stress-test it. Every core undergoes exhaustive constrained-random UVM verification, formal property checking, and structural CDC/RDC linting before release.' },
              { icon: Grid, title: 'Strict Protocol Compliance', desc: 'Our interface IP is verified against standardized assertions to ensure 100% compliance with AMBA AXI/APB and industry-standard peripheral specifications, ensuring drop-in SoC integration.' },
              { icon: Cpu, title: 'Fast Integration Support', desc: 'We deliver more than just encrypted netlists. Our IP comes with clear integration guides, reference synthesis scripts, and direct engineering support to help you achieve timing closure faster.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="value-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="icon-wrapper">
                  <item.icon size={32} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured IP Cores Preview */}
      <section className="projects-preview section" style={{ background: 'rgba(230, 237, 243, 0.02)' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Featured IP Cores
          </motion.h2>
          <div className="value-grid">
            {[
              { title: 'IonCore RV32I', desc: 'A 5-stage pipelined RISC-V processor optimized for deeply embedded control applications.', seed: 'riscv-core' },
              { title: 'IonBridge APB', desc: 'High-speed AMBA APB 4.0 compliant bridge and timer peripheral.', seed: 'amba-bridge' },
              { title: 'IonSync FIFO', desc: 'Asynchronous FIFO with gray-code CDC and parameterized depth/width.', seed: 'async-fifo' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ height: '120px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src={`https://picsum.photos/seed/${item.seed}/400/200?grayscale`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'screen', filter: 'brightness(0.8) contrast(1.2)' }} />
                </div>
                <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                <Link to="/ip-cores" style={{ color: 'var(--text-main)', fontSize: '0.9rem', marginTop: 'auto', textDecoration: 'underline' }}>View Specs →</Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/ip-cores" className="btn btn-outline">View Full IP Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
