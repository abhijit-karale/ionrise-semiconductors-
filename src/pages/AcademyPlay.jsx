import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Terminal, CheckCircle, AlertTriangle } from 'lucide-react';

const challenges = {
  1: {
    title: "Mission 1: The AND Gate",
    briefing: "Welcome to Day 1, Novice. Your first task is to write a basic combinational logic module in Verilog. We need a simple 2-input AND gate to authorize data flow through the bus.",
    instructions: "Write a module named `and_gate` with inputs `a` and `b`, and an output `y`. Use continuous assignment (`assign`) to output the logical AND of the inputs.",
    initialCode: "module and_gate(input a, input b, output y);\n  // Your code here\n\nendmodule",
    requiredKeywords: ["module", "assign", "y", "a", "&", "b", "endmodule"],
    xp: 100
  },
  2: {
    title: "Mission 2: Sequential D-Flip-Flop",
    briefing: "Welcome to Day 2. Combinational logic is fast, but we need memory. You must build a basic D-Flip Flop to synchronize our signals to the clock domain.",
    instructions: "Write a module named `d_ff` with inputs `clk`, `rst_n`, `d`, and output `q`. Use an `always @(posedge clk or negedge rst_n)` block. If reset is low, q=0. Else, q=d.",
    initialCode: "module d_ff(input clk, input rst_n, input d, output reg q);\n  // Your code here\n\nendmodule",
    requiredKeywords: ["always", "posedge", "clk", "negedge", "rst_n", "if", "q", "<=", "d"],
    xp: 100
  }
};

const AcademyPlay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, compiling, success, error

  const dayNum = parseInt(day, 10);
  const challenge = challenges[dayNum] || {
    title: `Mission ${dayNum}: Secure Module Design`,
    briefing: `Welcome to Day ${dayNum}. Today you will implement an advanced RTL architecture based on the specifications detailed in your data manual.`,
    instructions: "Write a module that satisfies the interface requirements. Ensure your logic avoids latches and synthesizes cleanly.",
    initialCode: "// Advanced Challenge Mode\nmodule custom_ip();\n\nendmodule",
    requiredKeywords: ["module", "endmodule"],
    xp: dayNum <= 5 ? 100 : (dayNum <= 15 ? 150 : (dayNum <= 25 ? 200 : (dayNum <= 35 ? 300 : 500)))
  };

  useEffect(() => {
    setCode(challenge.initialCode);
  }, [dayNum]);

  const runSimulation = () => {
    setStatus("compiling");
    setLogs(["[VCS] Starting compilation..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "[VCS] Parsing syntax tree..."]);
      setTimeout(() => {
        const hasKeywords = challenge.requiredKeywords.every(kw => code.includes(kw));
        
        if (hasKeywords) {
          setLogs(prev => [...prev, "[VCS] Elaboration successful.", "[SIM] Running testbench...", "[SIM] Test cases passed: 5/5"]);
          setTimeout(() => setStatus("success"), 800);
        } else {
          setLogs(prev => [...prev, "[VCS] Error: Syntax or logic mismatch detected.", "[VCS] Compilation failed. Missing required structures."]);
          setTimeout(() => setStatus("error"), 800);
        }
      }, 1000);
    }, 800);
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <div style={{ padding: '1rem 2rem', background: 'var(--surface-color)', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/academy')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="tech-text" style={{ margin: 0, fontSize: '1rem' }}>// ACADEMY_TERMINAL</h2>
        </div>
        <div>
          <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>Level {Math.ceil(dayNum/10)} Rank</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Pane: Briefing */}
        <div style={{ width: '400px', background: 'rgba(0,0,0,0.2)', borderRight: '1px solid var(--surface-border)', padding: '2rem', overflowY: 'auto' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{challenge.title}</h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Briefing</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{challenge.briefing}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--accent-teal)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Task</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.95rem' }}>{challenge.instructions}</p>
          </div>

          <div className="glass-card" style={{ padding: '1rem', background: 'rgba(0, 240, 255, 0.05)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>REWARD PENDING</div>
            <div style={{ fontSize: '1.5rem', color: 'var(--accent-teal)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>+{challenge.xp} XP</div>
          </div>
        </div>

        {/* Right Pane: IDE */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#020204' }}>
          
          {/* Editor Area */}
          <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
            <div style={{ width: '40px', background: '#0a0a0f', borderRight: '1px solid #1a1a24', color: '#4a4a5a', fontFamily: 'var(--font-mono)', fontSize: '14px', textAlign: 'right', padding: '1rem 0.5rem', userSelect: 'none' }}>
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1, background: 'transparent', color: '#e2e8f0', fontFamily: 'var(--font-mono)',
                fontSize: '14px', lineHeight: 1.6, padding: '1rem', border: 'none', resize: 'none', outline: 'none'
              }}
              spellCheck="false"
            />
          </div>

          {/* Terminal / Controls */}
          <div style={{ height: '250px', background: '#05060A', borderTop: '1px solid var(--surface-border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <Terminal size={14} /> Output Console
              </div>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                onClick={runSimulation}
                disabled={status === 'compiling'}
              >
                <Play size={14} /> Run Simulation
              </button>
            </div>
            <div style={{ flex: 1, padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {logs.map((log, idx) => (
                <div key={idx} style={{ color: log.includes('Error') || log.includes('failed') ? 'var(--error-red)' : (log.includes('passed') ? 'var(--pcb-green)' : 'var(--text-muted)') }}>
                  {log}
                </div>
              ))}
              
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 255, 102, 0.1)', border: '1px solid var(--pcb-green)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--pcb-green)', fontWeight: 'bold' }}>
                    <CheckCircle size={20} /> MISSION ACCOMPLISHED: +{challenge.xp} XP
                  </div>
                  <button className="btn btn-outline" style={{ borderColor: 'var(--pcb-green)', color: 'var(--pcb-green)', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }} onClick={() => navigate('/academy')}>
                    Return to Map
                  </button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 51, 102, 0.1)', border: '1px solid var(--error-red)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--error-red)', fontWeight: 'bold' }}>
                  <AlertTriangle size={20} /> COMPILATION FAILED. CHECK SYNTAX.
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademyPlay;
