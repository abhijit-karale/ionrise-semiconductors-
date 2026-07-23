import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesignIntake = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    projectType: '',
    protocol: '',
    features: [],
    timing: '',
    verification: ''
  });

  const handleSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature) => {
    setAnswers(prev => {
      const exists = prev.features.includes(feature);
      if (exists) return { ...prev, features: prev.features.filter(f => f !== feature) };
      return { ...prev, features: [...prev.features, feature] };
    });
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else onComplete(answers);
  };

  const isStepValid = () => {
    if (step === 1) return answers.projectType !== '';
    if (step === 2) return answers.protocol !== '';
    if (step === 3) return answers.features.length > 0;
    if (step === 4) return answers.timing !== '';
    if (step === 5) return answers.verification !== '';
    return true;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', minHeight: '400px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            style={{ 
              width: '18%', 
              height: '4px', 
              background: i <= step ? 'var(--pcb-green)' : 'var(--surface-border)',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-4">1. Project Type</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['New IP Core', 'SoC Integration', 'Verification-only Engagement', 'Custom ASIC'].map(opt => (
                <button 
                  key={opt}
                  className={`btn ${answers.projectType === opt ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleSelect('projectType', opt)}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-4">2. Target Protocol / Standard</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['AMBA APB', 'AXI4-Lite', 'UART / I2C / SPI', 'Custom / Proprietary'].map(opt => (
                <button 
                  key={opt}
                  className={`btn ${answers.protocol === opt ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleSelect('protocol', opt)}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-4">3. Required Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['Low-power mode', 'Interrupt support', 'DFT / Scan chains', 'Error handling', 'FIFOs', 'Clock Domain Crossing (CDC)'].map(opt => (
                <button 
                  key={opt}
                  className={`btn ${answers.features.includes(opt) ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => toggleFeature(opt)}
                  style={{ fontSize: '0.8rem', padding: '0.75rem' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-4">4. Target Timing constraints</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Low speed (< 100MHz)', 'Medium (100MHz - 500MHz)', 'High Performance (> 500MHz)'].map(opt => (
                <button 
                  key={opt}
                  className={`btn ${answers.timing === opt ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleSelect('timing', opt)}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="mb-4">5. Verification Depth</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Basic self-checking TB', 'UVM with Functional Coverage', 'Formal Verification + UVM'].map(opt => (
                <button 
                  key={opt}
                  className={`btn ${answers.verification === opt ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleSelect('verification', opt)}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        {step > 1 ? (
          <button className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>
        ) : <div/>}
        <button className="btn btn-primary" onClick={nextStep} disabled={!isStepValid()}>
          {step === 5 ? 'Generate Pipeline' : 'Next Stage'}
        </button>
      </div>
    </div>
  );
};

export default DesignIntake;
