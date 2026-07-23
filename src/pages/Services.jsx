import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import './Services.css';

const Services = () => {
  const [activeBlock, setActiveBlock] = useState(null);

  const services = [
    { id: 'rtl', label: 'RTL Design', desc: 'Verilog, SystemVerilog, VHDL, FSM design, datapath & controller design, parameterizable synchronous/asynchronous FIFOs, FPGA prototyping.' },
    { id: 'uvm', label: 'UVM Verification', desc: 'Layered UVM testbenches — sequences, sequencers, drivers, monitors, agents, scoreboards, factory overrides, TLM. Constrained-random verification with functional and code coverage closure.' },
    { id: 'formal', label: 'Formal Verification', desc: 'SystemVerilog Assertions (SVA) and JasperGold-based property proving for address decoding, reset behavior, and protocol compliance — exhaustive proof alongside simulation.' },
    { id: 'protocol', label: 'Protocol & SoC Integration', desc: 'AMBA-APB, AXI4, AXI4-Lite, UART, SPI, I2C. Bus functional models and reference models for protocol-compliant peripheral verification.' },
    { id: 'fw', label: 'Embedded Firmware & Bring-up', desc: 'Embedded C, FreeRTOS, RTOS-based task scheduling, UART/SPI/I2C/ADC/PWM drivers, STM32/ARM Cortex-M bring-up, PCB-level and signal-integrity debugging, schematic-to-board correlation.' },
    { id: 'cdc', label: 'CDC & Timing Closure', desc: 'Clock domain crossing analysis with Gray-code pointer synchronization, timing and area trade-off analysis via synthesis tools.' }
  ];

  return (
    <div className="services-page">
      <PageHeader 
        title="Engineering Services" 
        subtitle="From architectural spec to tapeout signoff, we cover the complete silicon lifecycle."
      />

      <section className="section">
        <div className="container">
          <div className="block-diagram-container glass-card">
            <h2 className="diagram-title tech-text">// INTERACTIVE_PIPELINE</h2>
            
            <div className="diagram-grid">
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  className={`diagram-block ${activeBlock === service.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveBlock(service.id)}
                  onMouseLeave={() => setActiveBlock(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="block-node">
                    <div className="node-pulse"></div>
                    <span className="node-label">{service.label}</span>
                  </div>
                  
                  {activeBlock === service.id && (
                    <motion.div 
                      className="block-tooltip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {service.desc}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* SVG connecting lines mapping the blocks */}
            <svg className="diagram-connections" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <motion.path 
                d="M 100 100 L 900 100" 
                stroke="var(--surface-border)" 
                strokeWidth="2" 
                fill="none" 
              />
              {activeBlock && (
                <motion.path 
                  d="M 100 100 L 900 100" 
                  stroke="var(--accent-teal)" 
                  strokeWidth="3" 
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ filter: 'drop-shadow(0 0 8px var(--accent-teal))' }}
                />
              )}
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
