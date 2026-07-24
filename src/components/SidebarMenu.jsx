import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Binary, Zap, Settings, BookOpen } from 'lucide-react';

const courses = [
  { id: 'vlsi-basics', label: 'VLSI Basic Understanding', color: '#f59e0b', iconType: 'text', text: 'B' },
  { id: 'digital-elec', label: 'Digital Electronics', color: '#ea580c', iconType: 'icon', Icon: Zap },
  { id: 'verilog', label: 'Verilog RTL Design', color: '#8b5a2b', iconType: 'text', text: 'V' },
  { id: 'system-verilog', label: 'SystemVerilog (SV)', color: '#0891b2', iconType: 'text', text: 'SV' },
  { id: 'uvm', label: 'Mastering UVM', color: '#9333ea', iconType: 'text', text: 'UVM' },
  { id: 'eda-tools', label: 'EDA & Component Skills', color: '#16a34a', iconType: 'icon', Icon: Settings },
  { id: 'asic-flow', label: 'ASIC Design Flow', color: '#2563eb', iconType: 'icon', Icon: Cpu },
];

const SidebarMenu = ({ activeCourse, onSelectCourse }) => {
  return (
    <div style={{
      width: '320px',
      background: 'rgba(5, 6, 10, 0.6)',
      borderRight: '1px solid var(--surface-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      minHeight: '100%',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
        <h3 className="tech-text" style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>LEARNING PATHS</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {courses.map((course) => {
          const isActive = activeCourse === course.id;
          return (
            <motion.button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                borderLeft: isActive ? `3px solid ${course.color}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'left'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: course.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: '4px', // slight rounding to make it look premium
                boxShadow: `0 4px 12px ${course.color}40`, // dynamic shadow matching color
                marginRight: '1rem',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'bold',
                fontSize: course.text && course.text.length > 2 ? '0.75rem' : '1.1rem'
              }}>
                {course.iconType === 'icon' ? <course.Icon size={20} /> : course.text}
              </div>
              
              <span style={{
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                fontSize: '0.95rem',
                fontWeight: isActive ? '600' : '400',
                fontFamily: 'var(--font-main)'
              }}>
                {course.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenu;
