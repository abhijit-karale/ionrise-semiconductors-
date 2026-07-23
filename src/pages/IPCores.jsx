import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SpecTable from '../components/SpecTable';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const IPCores = () => {
  const cores = [
    {
      id: 'core-uart',
      title: 'UART Controller',
      description: 'Fully parameterized universal asynchronous receiver-transmitter with FIFO support.',
      specs: [
        { label: 'Data Width', value: '8-bit' },
        { label: 'Max Baud Rate', value: '10 Mbps' },
        { label: 'Verification Status', status: 'VERIFIED' },
        { label: 'Protocol', value: 'RS-232 / UART' },
        { label: 'Process Node', value: 'N/A (RTL)' }
      ]
    },
    {
      id: 'core-apb-slave',
      title: 'AMBA APB Slave',
      description: 'Low-power peripheral interface for system-on-chip integration.',
      specs: [
        { label: 'Data Width', value: '32-bit' },
        { label: 'Clock Speed', value: '800 MHz' },
        { label: 'Verification Status', status: 'VERIFIED' },
        { label: 'Protocol', value: 'AMBA APB3' },
        { label: 'Process Node', value: 'N/A (RTL)' }
      ]
    },
    {
      id: 'core-axi-lite',
      title: 'AXI4-Lite Slave',
      description: 'High-performance memory-mapped interface for control registers.',
      specs: [
        { label: 'Data Width', value: '32-bit / 64-bit' },
        { label: 'Clock Speed', value: '1.2 GHz' },
        { label: 'Verification Status', status: 'IN PROGRESS' },
        { label: 'Protocol', value: 'AMBA AXI4' },
        { label: 'Process Node', value: 'N/A (RTL)' }
      ]
    },
    {
      id: 'core-rv32i',
      title: 'RISC-V CPU Core',
      description: '32-bit integer instruction set architecture for embedded IoT devices.',
      specs: [
        { label: 'ISA', value: 'RV32I' },
        { label: 'Pipeline Stages', value: '3-stage' },
        { label: 'Verification Status', status: 'PLANNED' },
        { label: 'Target Freq', value: '250 MHz' },
        { label: 'Gate Count', value: '~15k NAND2' }
      ]
    }
  ];

  return (
    <div className="page-container">
      <PageHeader 
        title="IP Core Catalog" 
        subtitle="Simulation-proven RTL IP for rapid integration and silicon success." 
      />
      
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {cores.map((core, index) => (
              <motion.div 
                key={core.id}
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 style={{ color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>{core.title}</h3>
                <p style={{ color: 'var(--text-muted)', minHeight: '60px' }}>{core.description}</p>
                
                <SpecTable specs={core.specs} />
                
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
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
