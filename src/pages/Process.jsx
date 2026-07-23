import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FileText, Cpu, CheckSquare, ShieldCheck, Flag } from 'lucide-react';
import './Process.css';

const Process = () => {
  const steps = [
    { icon: FileText, title: 'Specification', desc: 'Translating architectural requirements into microarchitecture specs.' },
    { icon: Cpu, title: 'RTL Implementation', desc: 'Coding the design in SystemVerilog, optimized for PPA.' },
    { icon: CheckSquare, title: 'UVM Testbench', desc: 'Developing constrained-random stimulus and coverage models.' },
    { icon: ShieldCheck, title: 'Coverage Closure', desc: 'Iterative simulation to hit 100% functional and code coverage.' },
    { icon: Flag, title: 'Formal Signoff', desc: 'Mathematical proofs ensuring zero escape defects.' }
  ];

  return (
    <div className="process-page">
      <PageHeader 
        title="Verification Methodology" 
        subtitle="Our rigorous, battle-tested pipeline guarantees first-pass silicon success." 
      />
      
      <section className="section">
        <div className="container">
          <div className="pipeline-container">
            {/* The animated central line */}
            <motion.div 
              className="pipeline-line"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={`pipeline-step ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3 * index, duration: 0.5 }}
              >
                <div className="step-content glass-card">
                  <div className="step-icon">
                    <step.icon size={24} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="step-node">
                  <motion.div 
                    className="node-inner"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 * index + 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
