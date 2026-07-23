import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SpecTable from '../components/SpecTable';
import DuotoneImage from '../components/DuotoneImage';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const IPCores = () => {
  const cores = [
    {
      id: 'core-rv32i',
      title: 'IonCore RV32I Processor',
      description: 'A 5-stage pipelined 32-bit RISC-V integer core optimized for deep embedded control. Features single-cycle execution for most ALU ops and a configurable branch predictor.',
      specs: [
        { label: 'ISA', value: 'RV32IMAC (Configurable)' },
        { label: 'Pipeline Stages', value: '5-stage' },
        { label: 'Functional Coverage', value: '100% (UVM)' },
        { label: 'Max Fmax (28nm)', value: '1.2 GHz' },
        { label: 'Verification Status', status: 'VERIFIED' }
      ],
      seed: 'riscv-diagram'
    },
    {
      id: 'core-apb-slave',
      title: 'AMBA APB 4.0 Peripheral Hub',
      description: 'A low-power peripheral bridge supporting APB4 protocol. Includes hardware timers, interrupt aggregation, and deep-sleep clock gating features.',
      specs: [
        { label: 'Data Width', value: '32-bit' },
        { label: 'Protocol', value: 'AMBA APB v2.0/3.0/4.0' },
        { label: 'Formal Verification', value: '100% Passed (SVA)' },
        { label: 'Clock Domains', value: '2 (Async Mode)' },
        { label: 'Verification Status', status: 'VERIFIED' }
      ],
      seed: 'amba-diagram'
    },
    {
      id: 'core-uart',
      title: 'IonUART Controller',
      description: 'Universal asynchronous receiver-transmitter with parameterized FIFO depth, auto-baud detection, and hardware flow control (RTS/CTS).',
      specs: [
        { label: 'Data Width', value: '5 to 9-bit configurable' },
        { label: 'Max Baud Rate', value: '12 Mbps' },
        { label: 'FIFO Depth', value: '4 to 256 bytes' },
        { label: 'Functional Coverage', value: '100% (UVM)' },
        { label: 'Verification Status', status: 'VERIFIED' }
      ],
      seed: 'uart-diagram'
    },
    {
      id: 'core-sync-fifo',
      title: 'Synchronous/Asynchronous FIFO',
      description: 'High-speed FIFO generator with gray-code CDC synchronization. Features programmable almost-full/almost-empty flags and power-optimized pointers.',
      specs: [
        { label: 'Mode', value: 'Sync / Async (CDC)' },
        { label: 'Data Width', value: 'Parameterized' },
        { label: 'Structural CDC', value: 'Zero Violations' },
        { label: 'Read Latency', value: '1 Cycle' },
        { label: 'Verification Status', status: 'VERIFIED' }
      ],
      seed: 'fifo-diagram'
    },
    {
      id: 'core-axi-lite',
      title: 'AXI4-Lite Slave',
      description: 'High-performance memory-mapped interface designed for control registers. Supports outstanding transactions and unaligned transfers.',
      specs: [
        { label: 'Data Width', value: '32-bit / 64-bit' },
        { label: 'Protocol', value: 'AMBA AXI4-Lite' },
        { label: 'Coverage Metrics', value: '92% (In Progress)' },
        { label: 'Target Fmax', value: '1.5 GHz' },
        { label: 'Verification Status', status: 'IN PROGRESS' }
      ],
      seed: 'axi-diagram'
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="Silicon IP Catalog" 
        subtitle="Rigorously verified, cleanly synthesizable RTL blocks ready for drop-in integration." 
      />
      
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Our Verification Philosophy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              At Ionrise, we treat our verification collateral as a first-class product, not an afterthought. Every IP core in our catalog (unless marked as "In Progress") has achieved 100% functional and code coverage within a constrained-random UVM environment. We deliver the RTL along with the full testbench suite, SVA properties, and synthesis reference scripts so you can replicate our results in your own environment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {cores.map((core, index) => (
              <motion.div 
                key={core.id}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '180px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--surface-border)' }}>
                  <DuotoneImage src={`https://picsum.photos/seed/${core.seed}/600/300?grayscale`} alt={core.title} />
                </div>
                
                <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.75rem', fontSize: '1.4rem' }}>{core.title}</h3>
                <p style={{ color: 'var(--text-muted)', minHeight: '80px', lineHeight: 1.6, marginBottom: '1.5rem' }}>{core.description}</p>
                
                <div style={{ flex: 1, marginBottom: '2rem' }}>
                  <SpecTable specs={core.specs} />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Link to={`/datasheets?core=${core.id}`} className="btn btn-outline" style={{ width: '100%' }}>
                    <Download size={18} /> View Datasheet
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPCores;
