import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { PlayCircle, Lock, Unlock, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

const Academy = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [unlocked, setUnlocked] = useState(false); // Mock state for payment success
  const [processing, setProcessing] = useState(false);

  // Curriculum Generation
  const curriculum = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let title = '';
    let category = '';
    
    if (day <= 5) {
      category = 'Verilog Fundamentals';
      const topics = ['Intro to Digital Design', 'Logic Gates & Modules', 'Combinational Logic (Always)', 'Sequential Logic & D-FFs', 'FSM Design Basics'];
      title = topics[i];
    } else if (day <= 10) {
      category = 'Advanced RTL Design';
      const topics = ['Parameterization', 'Generate Blocks', 'Memory Models', 'CDC Synchronizers', 'Arithmetic Pipelines'];
      title = topics[i - 5];
    } else if (day <= 15) {
      category = 'SystemVerilog Basics';
      const topics = ['Data Types & Structs', 'Interfaces & Modports', 'SV Assertions (SVA)', 'Functional Coverage', 'Class-Based OOP'];
      title = topics[i - 10];
    } else if (day <= 20) {
      category = 'SV Verification';
      const topics = ['Inheritance & Polymorphism', 'Randomization (Constraints)', 'Mailboxes & Semaphores', 'Virtual Interfaces', 'Testbench Architecture'];
      title = topics[i - 15];
    } else if (day <= 25) {
      category = 'UVM Introduction';
      const topics = ['UVM Phases & Macros', 'UVM Agent & Sequencer', 'UVM Driver & Monitor', 'UVM Scoreboard', 'UVM Factory'];
      title = topics[i - 20];
    } else {
      category = 'Advanced UVM & Tape-out';
      const topics = ['Register Abstraction Layer (RAL)', 'Coverage Closure Strategies', 'Formal Verification Intro', 'Gate-Level Simulation (GLS)', 'Final Project: AMBA VIP'];
      title = topics[i - 25];
    }

    return { day, title, category, isFree: day <= 5 };
  });

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUnlocked(true);
      setShowCheckout(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="RTL Mastery Academy" 
        subtitle="Go from absolute beginner to UVM Professional in 30 days. Play the first 5 days free." 
      />

      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div className="container" style={{ position: 'relative' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
            
            {/* Left: 30-Day Timeline */}
            <div>
              <h2 className="tech-text mb-4" style={{ fontSize: '1.2rem' }}>// CURRICULUM_PATH</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                {/* Vertical connecting line */}
                <div style={{ position: 'absolute', left: '24px', top: '24px', bottom: '24px', width: '2px', background: 'var(--surface-border)', zIndex: 0 }} />

                {curriculum.map((item, index) => {
                  const isAccessible = item.isFree || unlocked;
                  
                  return (
                    <motion.div 
                      key={item.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: (index % 5) * 0.1 }}
                      style={{ 
                        display: 'flex', gap: '1.5rem', alignItems: 'center', position: 'relative', zIndex: 1,
                        opacity: isAccessible ? 1 : 0.6
                      }}
                    >
                      <div style={{ 
                        width: '50px', height: '50px', borderRadius: '50%', flexShrink: 0,
                        background: isAccessible ? 'var(--surface-color)' : 'transparent', 
                        border: isAccessible ? '2px solid var(--accent-teal)' : '2px solid var(--surface-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isAccessible ? 'var(--accent-teal)' : 'var(--text-muted)',
                        boxShadow: isAccessible ? 'var(--glow-teal)' : 'none',
                        backdropFilter: 'blur(10px)'
                      }}>
                        {isAccessible ? <PlayCircle size={24} /> : <Lock size={20} />}
                      </div>

                      <div className="glass-card" style={{ flex: 1, padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div className="tech-text" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                            Day {item.day} • {item.category}
                          </div>
                          <h3 style={{ margin: 0, fontSize: '1.1rem', color: isAccessible ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {item.title}
                          </h3>
                        </div>
                        {item.isFree && !unlocked && (
                          <div className="status-pill verified">FREE</div>
                        )}
                        {!item.isFree && !unlocked && (
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            onClick={() => setShowCheckout(true)}
                          >
                            Unlock
                          </button>
                        )}
                        {unlocked && (
                          <div className="status-pill verified" style={{ background: 'transparent', border: 'none' }}><CheckCircle size={20} /></div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right: Sticky Premium CTA */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <motion.div 
                className="glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ borderTop: '4px solid var(--accent-blue)', boxShadow: 'var(--shadow-glass)' }}
              >
                {!unlocked ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
                      <Unlock size={24} />
                      <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>Pro Access</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      Unlock the remaining 25 days to master SystemVerilog OOP, UVM constraints, and Formal Verification.
                    </p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                      ₹199 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>INR</span>
                    </div>
                    <p style={{ color: 'var(--pcb-green)', fontSize: '0.85rem', marginBottom: '2rem', fontWeight: 600 }}>One-time payment. Lifetime access.</p>
                    
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', padding: '1rem' }}
                      onClick={() => setShowCheckout(true)}
                    >
                      Unlock Full Academy
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--pcb-green)' }}>
                      <ShieldCheck size={28} />
                      <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>Pro Unlocked</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      You now have full access to all 30 days of the Verilog & SystemVerilog curriculum.
                    </p>
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '2rem' }}>
                      Go to Dashboard
                    </button>
                  </>
                )}
              </motion.div>
              
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>
                  <Zap size={18} />
                  <h4 style={{ margin: 0 }}>Hands-on Gamification</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                  Write real RTL code in our browser-based simulator. Pass testbenches to earn points and unlock the next day's module.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <motion.div 
              className="glass-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ width: '100%', maxWidth: '400px', border: '1px solid var(--accent-teal)' }}
            >
              <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', textAlign: 'center' }}>Upgrade to Pro</h2>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>Secure checkout via Stripe</p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ color: 'var(--text-main)' }}>30-Day Academy Access</span>
                <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>₹199.00</span>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
                onClick={handleCheckout}
                disabled={processing}
              >
                {processing ? 'Processing Payment...' : 'Pay ₹199 INR'}
              </button>
              
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', border: 'none' }}
                onClick={() => setShowCheckout(false)}
                disabled={processing}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Academy;
