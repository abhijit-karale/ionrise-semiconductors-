import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { Cpu, Rocket, Code, Award } from 'lucide-react';
import './About.css';

const About = () => {
  const timeline = [
    { year: '2020–2023', title: 'Diploma in Electrical Engineering', desc: 'Baramati, Pune (71.39%)' },
    { year: '2023–2026', title: 'B.Tech, E&TC Engineering', desc: 'MAEER\'s MIT College of Railway Engineering & Research, Barshi (CGPA 7.86)' },
    { year: 'Aug–Nov 2024', title: 'Analog IC Design Internship', desc: 'Saksham Semiconductors, Hyderabad (MOSFET characterization, current mirrors, differential amps)' },
    { year: 'Dec 2024–Mar 2025', title: 'RTL Design & Verification Training', desc: 'The Silicon Sandbox, Bangalore' },
    { year: 'Mar 2025–Mar 2026', title: 'Embedded Systems Engineer', desc: 'Minilec India Pvt. Ltd., Pune' },
    { year: 'Mar 2026–Present', title: 'Embedded Firmware Engineer', desc: 'Velastra Pvt. Ltd., Ahmedabad' },
    { year: '2026', title: 'Ionrise Founded', desc: 'Ionrise Semiconductors established to provide simulation-proven RTL/DV services.' },
    { year: 'Dec 2026', title: 'Advanced RTL/DV Program', desc: 'Target completion, The Silicon Sandbox' }
  ];

  return (
    <div className="about-page">
      <PageHeader 
        title="Who We Are" 
        subtitle="We exist to eliminate the friction in custom silicon development." 
      />

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="tech-text mb-4">// THE_FOUNDER</h2>
              <p className="large-text">
                Ionrise Semiconductors was founded by <strong>Abhijit Karale</strong>, an RTL Design & Verification engineer based in Ahmedabad, India.
              </p>
              <p>
                With a background spanning embedded firmware, analog circuit design, and digital hardware verification, Abhijit has designed and verified digital logic from FSMs to a full 5-stage pipelined RISC-V core. He brings hands-on experience with industry EDA flows including Cadence Xcelium, JasperGold, Synopsys Design Compiler, and Vivado.
              </p>
              
              <h2 className="tech-text mb-4" style={{marginTop: '2rem'}}>// OUR_MISSION</h2>
              <p>
                To deliver simulation-verified, coverage-closed RTL and verification IP that teams can trust at tape-out — built with the same rigor as a production verification team, at startup speed.
              </p>
            </motion.div>
            
            <motion.div 
              className="about-stats glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="stat-row">
                <Cpu size={32} className="stat-icon" />
                <div>
                  <h4>Why "Ionrise"?</h4>
                  <p>A blend of "core" (silicon processor core) and "vertex" (the apex), signaling precision at the absolute core of every design.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="timeline-section mt-5">
            <h2 className="section-title">Timeline</h2>
            <div className="timeline-grid">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="timeline-year tech-text">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
