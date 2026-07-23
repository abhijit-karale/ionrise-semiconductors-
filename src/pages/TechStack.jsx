import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import './TechStack.css';

const TechStack = () => {
  const tools = [
    { name: 'Verilator', type: 'Simulation', desc: 'High-performance open-source Verilog simulator.' },
    { name: 'Icarus Verilog', type: 'Simulation', desc: 'Standard compliant Verilog simulation and synthesis.' },
    { name: 'Yosys', type: 'Synthesis', desc: 'Open-source framework for RTL synthesis.' },
    { name: 'Vivado WebPACK', type: 'FPGA', desc: 'Xilinx synthesis and implementation.' },
    { name: 'GTKWave', type: 'Debug', desc: 'Waveform viewer for VCD files.' },
    { name: 'SymbiYosys', type: 'Formal', desc: 'Front-end for Yosys-based formal verification.' }
  ];

  return (
    <div className="techstack-page">
      <PageHeader 
        title="Our Toolchain" 
        subtitle="We leverage the best open-source and proprietary EDA tools for uncompromised design." 
      />
      
      <section className="section">
        <div className="container">
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <motion.div 
                key={index}
                className="tool-card glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="tool-header">
                  <h3 className="tool-name">{tool.name}</h3>
                  <span className="tool-badge">{tool.type}</span>
                </div>
                <p className="tool-desc">{tool.desc}</p>
                <div className="hover-circuit"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
