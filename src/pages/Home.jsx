import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Activity, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
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
                SILICON FABRICATION <br />
                <span className="accent-teal">RE-ENGINEERED</span>
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Corevexis provides cutting-edge RTL Design and UVM Verification. 
                We bring extreme reliability and performance to your custom silicon architectures.
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
                <CountUp end={100} duration={2} suffix="%" />
              </div>
              <div className="stat-label tech-text">Coverage Closure</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">
                <CountUp end={42} duration={2.5} suffix="+" />
              </div>
              <div className="stat-label tech-text">Tapeouts Supported</div>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-number">
                <CountUp end={0} duration={2} suffix=" DPPM" />
              </div>
              <div className="stat-label tech-text">Defect Rate target</div>
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
            Core Competencies
          </motion.h2>
          
          <div className="value-grid">
            {[
              { icon: Cpu, title: 'RTL Design', desc: 'Microarchitecture to synthesis. Verilog, SystemVerilog, VHDL.' },
              { icon: Activity, title: 'UVM Verification', desc: 'Robust testbenches, constrained random, coverage-driven verification.' },
              { icon: Grid, title: 'Formal Verification', desc: 'Mathematical proofs for critical logic paths ensuring absolute correctness.' },
              { icon: Zap, title: 'DFT & Signoff', desc: 'Design for testability, STA, and logical equivalence checking.' }
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
    </div>
  );
};

export default Home;
