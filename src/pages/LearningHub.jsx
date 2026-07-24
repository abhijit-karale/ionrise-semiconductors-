import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SidebarMenu from '../components/SidebarMenu';
import { BookOpen, Video, FileText, CheckCircle, HelpCircle, Target, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const learningContent = {
  'vlsi-basics': {
    title: 'VLSI Basic Understanding',
    description: 'A comprehensive introduction to Very Large Scale Integration. Learn how billions of transistors are integrated into a single chip.',
    sections: [
      {
        title: 'Core Fundamentals',
        items: [
          { title: 'Moore\'s Law & Scaling', type: 'video', duration: '15 min' },
          { title: 'CMOS Fabrication Process', type: 'guide', duration: '20 min' },
          { title: 'Transistor Fundamentals', type: 'guide', duration: '25 min' }
        ]
      }
    ]
  },
  'digital-elec': {
    title: 'Digital Electronics',
    description: 'The foundation of all digital systems. Master logic gates, combinational circuits, and sequential memory elements.',
    sections: [
      {
        title: 'Boolean & Logic',
        items: [
          { title: 'Boolean Algebra', type: 'guide', duration: '30 min' },
          { title: 'Combinational Logic Gates', type: 'video', duration: '20 min' },
          { title: 'Flip-Flops and Registers', type: 'video', duration: '25 min' }
        ]
      }
    ]
  },
  'verilog': {
    title: 'Verilog RTL Design',
    description: 'Learn the industry-standard Hardware Description Language for designing complex digital circuits.',
    sections: [
      {
        title: 'Language Basics',
        items: [
          { title: 'Modules and Ports', type: 'guide', duration: '15 min' },
          { title: 'Continuous vs Procedural Assignment', type: 'video', duration: '30 min' },
          { title: 'Blocking vs Non-Blocking', type: 'guide', duration: '25 min' }
        ]
      }
    ]
  },
  'system-verilog': {
    title: 'SystemVerilog (SV)',
    description: 'The evolution of Verilog. Dive into Object-Oriented hardware verification and complex data structures.',
    sections: [
      {
        title: 'OOP and Data Types',
        items: [
          { title: 'Structs and Unions', type: 'guide', duration: '20 min' },
          { title: 'Interfaces and Modports', type: 'video', duration: '35 min' },
          { title: 'Classes and OOP in SV', type: 'video', duration: '40 min' }
        ]
      }
    ]
  },
  'uvm': {
    title: 'Mastering UVM',
    description: 'Universal Verification Methodology. The golden standard for verifying large-scale ASICs.',
    sections: [
      {
        title: 'Architecture & Components',
        items: [
          { title: 'UVM Architecture Overview', type: 'video', duration: '45 min' },
          { title: 'Agents, Drivers, and Monitors', type: 'guide', duration: '30 min' },
          { title: 'Sequences and Sequences', type: 'video', duration: '50 min' }
        ]
      }
    ]
  },
  'asic-flow': {
    title: 'ASIC Design Flow',
    description: 'From RTL to GDSII. Understand the complete lifecycle of chip development.',
    sections: [
      {
        title: 'Front-End to Back-End',
        items: [
          { title: 'Logic Synthesis', type: 'video', duration: '30 min' },
          { title: 'Static Timing Analysis (STA)', type: 'guide', duration: '40 min' },
          { title: 'Physical Design / P&R', type: 'video', duration: '45 min' }
        ]
      }
    ]
  },
  'eda-tools': {
    title: 'Component Skills',
    description: 'Real-world skills every hardware engineer needs — learn how to recognize, decode, select, and master electronic components.',
    sections: [
      {
        title: 'Resistor',
        items: [
          { title: 'Resistor Basics', type: 'guide', duration: 'Quick Guide' },
          { title: 'Resistor Marking', type: 'quiz', duration: 'Quiz' },
          { title: 'Resistor Selection', type: 'quiz', duration: 'Quiz' },
          { title: 'Replace Through-Hole with SMD Resistor', type: 'task', duration: 'Task' },
          { title: 'Select a Resistor to Drive an LED', type: 'task', duration: 'Task' },
          { title: 'Motor Current Shunt Resistor Selection', type: 'task', duration: 'Task' },
          { title: 'MELF Resistor Selection', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'Capacitor',
        items: [
          { title: 'Capacitor Basics', type: 'guide', duration: 'Quick Guide' },
          { title: 'Capacitor Marking', type: 'quiz', duration: 'Quiz' },
          { title: 'Capacitor Selection', type: 'quiz', duration: 'Quiz' },
          { title: 'MCU Decoupling Capacitor Selection', type: 'task', duration: 'Task' },
          { title: 'Motor Driver Bulk Capacitor Selection', type: 'task', duration: 'Task' },
          { title: 'Regulator Input Bulk Capacitor', type: 'task', duration: 'Task' },
          { title: 'RC Delay Capacitor Selection', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'Inductor',
        items: [
          { title: 'Inductor Basics', type: 'guide', duration: 'Quick Guide' },
          { title: 'Inductor Marking', type: 'quiz', duration: 'Quiz' },
          { title: 'Inductor Selection', type: 'quiz', duration: 'Quiz' },
          { title: 'Buck Converter Inductor Selection', type: 'task', duration: 'Task' },
          { title: 'Boost Converter Inductor Selection', type: 'task', duration: 'Task' },
          { title: 'Input EMI Filter Inductor', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'Component Identification',
        items: [
          { title: 'Component Identification - I', type: 'quiz', duration: 'Quiz' },
          { title: 'Component Identification - II', type: 'quiz', duration: 'Quiz' }
        ]
      },
      {
        title: 'Diode',
        items: [
          { title: 'Diode Visual Recognition', type: 'quiz', duration: 'Quiz' },
          { title: 'Diode Polarity and Symbols', type: 'quiz', duration: 'Quiz' },
          { title: 'Diode Package Identification', type: 'quiz', duration: 'Quiz' },
          { title: 'Diode Ratings and Datasheets', type: 'quiz', duration: 'Quiz' },
          { title: 'Diode Selection and Application', type: 'quiz', duration: 'Quiz' },
          { title: 'Relay Flyback Diode Selection', type: 'task', duration: 'Task' },
          { title: 'Reverse Polarity Protection Diode', type: 'task', duration: 'Task' },
          { title: 'Buck Converter Schottky Diode', type: 'task', duration: 'Task' },
          { title: 'AC Rectifier Diode Selection', type: 'task', duration: 'Task' },
          { title: 'Zener Clamping Diode Selection', type: 'task', duration: 'Task' },
          { title: 'Signal Switching Diode Selection', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'LED',
        items: [
          { title: 'LED Identification', type: 'quiz', duration: 'Quiz' },
          { title: 'LED Electrical Characteristics', type: 'quiz', duration: 'Quiz' },
          { title: 'LED Circuit', type: 'quiz', duration: 'Quiz' },
          { title: 'LED Selection & Failure', type: 'quiz', duration: 'Quiz' },
          { title: 'Panel Indicator LED Selection', type: 'task', duration: 'Task' },
          { title: 'GPIO Status LED Selection', type: 'task', duration: 'Task' },
          { title: 'High-Brightness Indicator LED', type: 'task', duration: 'Task' },
          { title: 'RGB LED Selection', type: 'task', duration: 'Task' },
          { title: 'Automotive Status LED Selection', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'Switch & Relay',
        items: [
          { title: 'Switch Recognition & Pin Layout', type: 'quiz', duration: 'Quiz' },
          { title: 'Switch Ratings and Applications', type: 'quiz', duration: 'Quiz' },
          { title: 'Reset Tactile Switch Selection', type: 'task', duration: 'Task' },
          { title: 'Relay Recognition and Markings', type: 'quiz', duration: 'Quiz' },
          { title: 'AC Load Relay Selection', type: 'task', duration: 'Task' },
          { title: 'DC Motor Relay Selection', type: 'task', duration: 'Task' }
        ]
      },
      {
        title: 'Optocoupler & BJT',
        items: [
          { title: 'Optocoupler Symbol and Structure', type: 'quiz', duration: 'Quiz' },
          { title: '24V Input Optocoupler Selection', type: 'task', duration: 'Task' },
          { title: 'Transistor Recognition and Symbols', type: 'quiz', duration: 'Quiz' },
          { title: 'NPN Transistor for Relay Coil Driver', type: 'task', duration: 'Task' },
          { title: 'N-Channel MOSFET for LED Strip PWM Driver', type: 'task', duration: 'Task' }
        ]
      }
    ]
  }
};

const SectionAccordion = ({ section }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--surface-border)',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: isOpen ? '1rem' : '0'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{section.title}</h3>
        <ChevronDown 
          size={20} 
          style={{ 
            color: 'var(--text-muted)', 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--surface-border)' }}>
              {section.items.map((item, idx) => {
                
                // Determine styling based on type
                let IconComponent = FileText;
                let iconColor = 'var(--accent-gold)';
                let bgBadge = 'rgba(245, 158, 11, 0.1)';
                
                if (item.type === 'video') {
                  IconComponent = Video;
                  iconColor = 'var(--accent-blue)';
                  bgBadge = 'rgba(59, 130, 246, 0.1)';
                } else if (item.type === 'guide') {
                  IconComponent = BookOpen;
                  iconColor = 'var(--accent-teal)';
                  bgBadge = 'rgba(20, 184, 166, 0.1)';
                } else if (item.type === 'quiz') {
                  IconComponent = HelpCircle;
                  iconColor = '#ea580c'; // Orange
                  bgBadge = 'rgba(234, 88, 12, 0.1)';
                } else if (item.type === 'task') {
                  IconComponent = Target;
                  iconColor = '#16a34a'; // Green
                  bgBadge = 'rgba(22, 163, 74, 0.1)';
                }

                return (
                  <div key={idx} className="glass-card hover-scale" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '8px', 
                        background: bgBadge, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: iconColor
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                          {item.title}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {item.type.toUpperCase()} • {item.duration}
                        </span>
                      </div>
                    </div>
                    <button className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                      {item.type === 'task' ? 'Start Task' : item.type === 'quiz' ? 'Take Quiz' : 'View'}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LearningHub = () => {
  const [activeCourse, setActiveCourse] = useState('eda-tools');
  const courseData = learningContent[activeCourse];

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <PageHeader 
        title="Student Learning Hub" 
        subtitle="Theoretical coursework, reading materials, and interactive tasks to build your hardware foundation." 
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

              {/* Render Sections */}
              {courseData.sections.map((section, idx) => (
                <SectionAccordion key={idx} section={section} />
              ))}
              
              <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0, 255, 102, 0.05)', border: '1px dashed var(--pcb-green)', borderRadius: '8px', textAlign: 'center' }}>
                <CheckCircle size={32} color="var(--pcb-green)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Ready for a Code Challenge?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Put your RTL knowledge to the test in the interactive Gamified Academy.
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
