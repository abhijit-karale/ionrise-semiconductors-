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
                <Link to="/services" className="btn btn-primary">
                  Explore Services <ArrowRight size={18} />
                </Link>
                <Link to="/portfolio" className="btn btn-outline">
                  View Projects
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
                <CountUp end={95} duration={2} suffix="%+" />
              </div>
              <div className="stat-label tech-text">Functional Coverage (RISC-V UVM)</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-number">
                <CountUp end={350} duration={2.5} suffix="+" />
              </div>
              <div className="stat-label tech-text">Directed & Random Tests (ASIC)</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">
                <CountUp end={7} duration={2} />
              </div>
              <div className="stat-label tech-text">RTL/DV Projects Shipped</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">
                <CountUp end={100} duration={2} suffix=" MHz" />
              </div>
              <div className="stat-label tech-text">Validated FPGA Implementation</div>
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
            Featured Services
          </motion.h2>
          
          <div className="value-grid">
            {[
              { icon: Cpu, title: 'RTL Design', desc: 'Verilog, SystemVerilog, VHDL, FSMs, datapath & controller design.' },
              { icon: Activity, title: 'UVM Verification', desc: 'Layered testbenches, constrained-random verification, coverage closure.' },
              { icon: Grid, title: 'Formal Verification', desc: 'SVA + JasperGold property proving for critical logic paths.' },
              { icon: Zap, title: 'Embedded Firmware & Bring-up', desc: 'Embedded C, FreeRTOS, peripheral drivers, and hardware bring-up.' }
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
                <Link to="/services" className="tech-text" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="projects-preview section" style={{ background: 'rgba(230, 237, 243, 0.02)' }}>
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="value-grid">
            {[
              { title: '32-bit RISC-V Processor', desc: '5-stage pipeline, 95%+ coverage, UVM environment.' },
              { title: 'Sync/Async FIFO', desc: 'Gray-code CDC, parameterizable depth.' },
              { title: 'AMBA-APB Slave Peripheral', desc: 'Address decoding, access phases, coverage closure.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
