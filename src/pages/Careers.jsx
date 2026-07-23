import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DuotoneImage from '../components/DuotoneImage';
import { CheckCircle, Cpu, Code, Activity, Briefcase } from 'lucide-react';

const Careers = () => {
  const roles = [
    {
      id: 'rtl-designer',
      title: 'RTL Design Engineer',
      type: 'Full-time · Remote',
      desc: 'Join the core architecture team to design and parameterize high-speed digital interfaces and customized compute cores.',
      reqs: ['SystemVerilog / Verilog fluency', 'AMBA AXI/APB experience', 'Timing closure familiarity']
    },
    {
      id: 'uvm-dv',
      title: 'Verification Engineer (UVM)',
      type: 'Full-time · Remote',
      desc: 'Build scalable constrained-random testbenches for our complex IP cores. You will own verification from test plan to 100% functional coverage.',
      reqs: ['UVM framework expertise', 'SVA / Formal Verification', 'Python/Bash scripting']
    },
    {
      id: 'pd-intern',
      title: 'Physical Design Intern',
      type: 'Internship · Remote',
      desc: 'Work closely with our backend team to take verified RTL through synthesis, floorplanning, CTS, and sign-off on advanced nodes.',
      reqs: ['ASIC flow understanding', 'Tcl scripting', 'Static Timing Analysis basics']
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Careers at Ionrise" 
        subtitle="Build the silicon foundations that will power the next generation of embedded and edge intelligence." 
      />

      {/* Intro & Culture */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4" style={{ color: 'var(--accent-teal)' }}>Why join Ionrise?</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                We are a small, elite team of VLSI engineers who prefer writing robust code over attending endless sync meetings. At Ionrise, you won't be siloed into a single block for years; you will touch the entire design flow.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Whether you are optimizing a customized RISC-V pipeline or hunting down a CDC bug using advanced formal property checking, you will be doing real, tape-out-adjacent work from day one.
              </p>
              <ul style={{ listStyle: 'none', color: 'var(--text-main)' }}>
                {['Remote-first engineering culture', 'Hardware allowance for local dev/FPGA testing', 'Mentorship in advanced RTL & UVM DV', 'Direct impact on silicon-proven IP'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <CheckCircle size={16} style={{ color: 'var(--pcb-green)' }} /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <DuotoneImage 
                src="https://picsum.photos/seed/ionrise-culture/800/500?grayscale" 
                alt="Ionrise Team Culture" 
                style={{ borderRadius: '4px', border: '1px solid var(--surface-border)' }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hiring Process Pipeline */}
      <section className="section" style={{ background: 'var(--surface-color)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title text-center" style={{ justifyContent: 'center' }}>Our Hiring Pipeline</h2>
            <p style={{ color: 'var(--text-muted)' }}>We value your time. Our interview process is fast, technical, and transparent.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', position: 'relative' }}>
            {/* Background connecting line */}
            <div className="desktop-only" style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'var(--surface-border)', zIndex: 0 }} />
            
            {[
              { icon: Briefcase, title: 'Application', text: 'Resume & GitHub portfolio review.' },
              { icon: Cpu, title: 'Technical Screen', text: '45-minute chat on VLSI fundamentals.' },
              { icon: Code, title: 'Design Exercise', text: 'Take-home RTL/DV coding task.' },
              { icon: Activity, title: 'Offer', text: 'Final team fit and offer extension.' }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', zIndex: 1, position: 'relative' }}
              >
                <div style={{ 
                  width: '48px', height: '48px', background: 'var(--bg-color)', border: '2px solid var(--accent-teal)', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  margin: '0 auto 1.5rem', color: 'var(--accent-teal)', boxShadow: 'var(--glow-teal)'
                }}>
                  <step.icon size={20} />
                </div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section">
        <div className="container">
          <h2 className="section-title mb-5">Open Roles</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {roles.map((role, i) => (
              <motion.div 
                key={role.id}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ flex: '1 1 500px' }}>
                  <h3 style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>{role.title}</h3>
                  <div className="tech-text" style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>{role.type}</div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{role.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {role.reqs.map(req => (
                      <span key={req} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--surface-border)', borderRadius: '2px', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/contact" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
