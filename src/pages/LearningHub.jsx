import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SidebarMenu from '../components/SidebarMenu';
import { BookOpen, Video, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const learningContent = {
  'vlsi-basics': {
    title: 'VLSI Basic Understanding',
    description: 'A comprehensive introduction to Very Large Scale Integration. Learn how billions of transistors are integrated into a single chip.',
    modules: [
      { title: 'Moore\'s Law & Scaling', type: 'video', duration: '15 min' },
      { title: 'CMOS Fabrication Process', type: 'reading', duration: '20 min' },
      { title: 'Transistor Fundamentals', type: 'reading', duration: '25 min' }
    ]
  },
  'digital-elec': {
    title: 'Digital Electronics',
    description: 'The foundation of all digital systems. Master logic gates, combinational circuits, and sequential memory elements.',
    modules: [
      { title: 'Boolean Algebra', type: 'reading', duration: '30 min' },
      { title: 'Combinational Logic Gates', type: 'video', duration: '20 min' },
      { title: 'Flip-Flops and Registers', type: 'video', duration: '25 min' }
    ]
  },
  'verilog': {
    title: 'Verilog RTL Design',
    description: 'Learn the industry-standard Hardware Description Language for designing complex digital circuits.',
    modules: [
      { title: 'Modules and Ports', type: 'reading', duration: '15 min' },
      { title: 'Continuous vs Procedural Assignment', type: 'video', duration: '30 min' },
      { title: 'Blocking vs Non-Blocking', type: 'reading', duration: '25 min' }
    ]
  },
  'system-verilog': {
    title: 'SystemVerilog (SV)',
    description: 'The evolution of Verilog. Dive into Object-Oriented hardware verification and complex data structures.',
    modules: [
      { title: 'Structs and Unions', type: 'reading', duration: '20 min' },
      { title: 'Interfaces and Modports', type: 'video', duration: '35 min' },
      { title: 'Classes and OOP in SV', type: 'video', duration: '40 min' }
    ]
  },
  'uvm': {
    title: 'Mastering UVM',
    description: 'Universal Verification Methodology. The golden standard for verifying large-scale ASICs.',
    modules: [
      { title: 'UVM Architecture Overview', type: 'video', duration: '45 min' },
      { title: 'Agents, Drivers, and Monitors', type: 'reading', duration: '30 min' },
      { title: 'Sequences and Sequences', type: 'video', duration: '50 min' }
    ]
  },
  'eda-tools': {
    title: 'EDA & Component Skills',
    description: 'Get familiar with Electronic Design Automation tools (Synopsys, Cadence, Mentor) and scripting.',
    modules: [
      { title: 'TCL Scripting Basics', type: 'reading', duration: '25 min' },
      { title: 'Makefile Generation', type: 'reading', duration: '15 min' },
      { title: 'Navigating Verdi for Debugging', type: 'video', duration: '35 min' }
    ]
  },
  'asic-flow': {
    title: 'ASIC Design Flow',
    description: 'From RTL to GDSII. Understand the complete lifecycle of chip development.',
    modules: [
      { title: 'Logic Synthesis', type: 'video', duration: '30 min' },
      { title: 'Static Timing Analysis (STA)', type: 'reading', duration: '40 min' },
      { title: 'Physical Design / P&R', type: 'video', duration: '45 min' }
    ]
  }
};

const LearningHub = () => {
  const [activeCourse, setActiveCourse] = useState('verilog');
  const courseData = learningContent[activeCourse];

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <PageHeader 
        title="Student Learning Hub" 
        subtitle="Theoretical coursework, reading materials, and video lectures to build your VLSI foundation." 
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar Menu */}
        <SidebarMenu activeCourse={activeCourse} onSelectCourse={setActiveCourse} />

        {/* Main Content Area */}
        <section className="section" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '6rem', overflowY: 'auto' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            
            <motion.div 
              key={activeCourse}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                {courseData.title}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem' }}>
                {courseData.description}
              </p>

              <h3 className="tech-text" style={{ fontSize: '1rem', color: 'var(--accent-teal)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                // COURSE_MODULES
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {courseData.modules.map((mod, idx) => (
                  <div key={idx} className="glass-card hover-scale" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '8px', 
                        background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: mod.type === 'video' ? 'var(--accent-blue)' : 'var(--accent-gold)'
                      }}>
                        {mod.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                          {idx + 1}. {mod.title}
                        </h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {mod.type.toUpperCase()} • {mod.duration}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>
                      Start Module
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0, 255, 102, 0.05)', border: '1px dashed var(--pcb-green)', borderRadius: '8px', textAlign: 'center' }}>
                <CheckCircle size={32} color="var(--pcb-green)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Ready for a Challenge?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Put your theoretical knowledge to the test in the interactive Gamified Academy.
                </p>
                <a href="#/academy" className="btn btn-primary">
                  Go to Gamified Academy
                </a>
              </div>

            </motion.div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningHub;
