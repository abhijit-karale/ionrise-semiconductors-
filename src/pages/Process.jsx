import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FileText, Cpu, CheckSquare, ShieldCheck, Flag, Activity, Grid, Zap } from 'lucide-react';
import './Process.css';

const Process = () => {
  const steps = [
    { icon: FileText, title: 'Spec Capture', desc: 'Translating architectural requirements into microarchitecture specs.' },
    { icon: Cpu, title: 'RTL Coding', desc: '32-instruction RISC architectures and 5-stage pipelines in Verilog/VHDL.' },
    { icon: CheckSquare, title: 'Testbench Development', desc: 'Full UVM environments: drivers, monitors, scoreboards, and sequences.' },
    { icon: Activity, title: 'Simulation & Regression', desc: 'Running 350+ directed and constrained-random test cases.' },
    { icon: ShieldCheck, title: 'Coverage Closure', desc: 'Hitting 95%+ to 100% functional and code coverage across testbenches.' },
    { icon: Grid, title: 'Formal Property Signoff', desc: 'SVA and JasperGold proofs for critical logic paths ensuring absolute correctness.' },
    { icon: Zap, title: 'Synthesis & Timing Review', desc: 'Timing and area trade-off analysis, floorplanning, and static timing closure.' },
    { icon: Flag, title: 'Delivery', desc: 'Simulation-proven, coverage-closed RTL ready for FPGA or tapeout.' }
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
