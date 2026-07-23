import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { generateRoadmap } from '../services/api';
import './Roadmap.css';

const RoadmapIntake = ({ onGenerate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    status: '',
    role: '',
    skills: [],
    commitment: '',
    timeline: ''
  });

  const updateAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill) => {
    setAnswers(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        // Enforce supported tracks
        const targetRole = ['rtl', 'uvm', 'embedded'].includes(answers.role) ? answers.role : 'rtl';
        const targetTimeline = ['6', '12'].includes(answers.timeline) ? parseInt(answers.timeline) : 6;
        
        const data = await generateRoadmap({
          role: targetRole,
          timeline: targetTimeline,
          intakeAnswers: answers
        });
        
        onGenerate(data.id);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1: return !answers.status;
      case 2: return !answers.role;
      case 3: return answers.skills.length === 0;
      case 4: return !answers.commitment;
      case 5: return !answers.timeline;
      default: return false;
    }
  };

  const supportedRoles = ['rtl', 'uvm', 'embedded'];
  const supportedTimelines = ['6', '12'];

  return (
    <div className="roadmap-intake">
      <div className="intake-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
        <div className="step-count tech-text">STEP_0{step}/05</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
            <h2>What is your current status?</h2>
            <div className="options-grid">
              {['Student (Undergrad/Masters)', 'Recent Graduate', 'Working Professional (Pivoting to VLSI)', 'Working Engineer (Leveling up)'].map(opt => (
                <button 
                  key={opt} 
                  className={`option-btn ${answers.status === opt ? 'selected' : ''}`}
                  onClick={() => updateAnswer('status', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
            <h2>Which role are you targeting?</h2>
            <div className="options-grid">
              {[
                { id: 'rtl', label: 'RTL Design' },
                { id: 'uvm', label: 'Verification (UVM)' },
                { id: 'embedded', label: 'Embedded Firmware' },
                { id: 'formal', label: 'Formal Verification' },
                { id: 'pd', label: 'Physical Design' },
                { id: 'analog', label: 'Analog Design' }
              ].map(role => (
                <button 
                  key={role.id} 
                  className={`option-btn ${answers.role === role.id ? 'selected' : ''}`}
                  onClick={() => updateAnswer('role', role.id)}
                >
                  {role.label}
                  {!supportedRoles.includes(role.id) && <span className="coming-soon">Coming Soon</span>}
                </button>
              ))}
            </div>
            {!supportedRoles.includes(answers.role) && answers.role !== '' && (
              <div className="alert-box">
                <AlertCircle size={16} /> <span>This track is in development. We'll generate a related fallback roadmap for now.</span>
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
            <h2>Select your current skills:</h2>
            <div className="options-grid">
              {['Verilog Basics', 'SystemVerilog', 'UVM', 'FSM Design', 'CDC', 'Formal/SVA', 'EDA Tools', 'C/C++ Programming', 'None Yet'].map(skill => (
                <button 
                  key={skill} 
                  className={`option-btn ${answers.skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
            <h2>Time commitment per week?</h2>
            <div className="options-grid">
              {['< 5 hours', '5 - 10 hours', '10 - 20 hours', 'Full-time focus'].map(opt => (
                <button 
                  key={opt} 
                  className={`option-btn ${answers.commitment === opt ? 'selected' : ''}`}
                  onClick={() => updateAnswer('commitment', opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container">
            <h2>Timeline goal?</h2>
            <div className="options-grid">
              {[
                { id: '3', label: '3 Months (Aggressive)' },
                { id: '6', label: '6 Months (Recommended)' },
                { id: '12', label: '12 Months (Paced)' },
                { id: 'none', label: 'No Deadline' }
              ].map(t => (
                <button 
                  key={t.id} 
                  className={`option-btn ${answers.timeline === t.id ? 'selected' : ''}`}
                  onClick={() => updateAnswer('timeline', t.id)}
                >
                  {t.label}
                  {!supportedTimelines.includes(t.id) && <span className="coming-soon">Coming Soon</span>}
                </button>
              ))}
            </div>
            {!supportedTimelines.includes(answers.timeline) && answers.timeline !== '' && (
              <div className="alert-box">
                <AlertCircle size={16} /> <span>This exact timeline is in development. We'll map you to the closest available track.</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="intake-actions">
        {step > 1 && (
          <button className="btn btn-outline" onClick={handleBack} disabled={loading}>
            <ChevronLeft size={18} /> Back
          </button>
        )}
        <button 
          className="btn btn-primary" 
          onClick={handleNext} 
          disabled={isNextDisabled() || loading}
          style={{ marginLeft: 'auto' }}
        >
          {loading ? 'COMPILING...' : (step === 5 ? 'GENERATE ROADMAP' : 'NEXT')} 
          {!loading && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default RoadmapIntake;
