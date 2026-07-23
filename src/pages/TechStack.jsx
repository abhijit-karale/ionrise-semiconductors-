import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import './TechStack.css';

const TechStack = () => {
  const tools = [
    { name: 'RTL Design', type: 'Design', desc: 'Verilog, SystemVerilog, VHDL' },
    { name: 'Verification', type: 'Methodology', desc: 'UVM, SVA, JasperGold (formal), Constrained-Random, CDC, DPI' },
    { name: 'EDA Tools', type: 'Industry standard', desc: 'Cadence Xcelium, JasperGold, Synopsys Design Compiler, QuestaSim, ModelSim, Vivado, Verdi' },
    { name: 'Protocols', type: 'Integration', desc: 'AMBA-APB, AXI4, AXI4-Lite, UART, SPI, I2C' },
    { name: 'Embedded', type: 'Firmware', desc: 'Embedded C, FreeRTOS, STM32/ARM Cortex-M' },
    { name: 'Open-source Flow', type: 'Lab / Prototyping', desc: 'Icarus Verilog, GTKWave, Verilator, SymbiYosys/Yosys, Vivado WebPACK' },
    { name: 'Software', type: 'Infrastructure', desc: 'Python, Git, Linux, Shell Scripting' }
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
