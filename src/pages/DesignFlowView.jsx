import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Activity, Box, Cpu, HardDrive } from 'lucide-react';

const icons = [Box, Activity, CheckCircle, Cpu, HardDrive, Cpu]; // fallback mapping

const DesignFlowView = ({ flowData, flowId }) => {
  // Load saved progress
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`flow_${flowId}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`flow_${flowId}`, JSON.stringify(progress));
  }, [progress, flowId]);

  const toggleTask = (stageId, taskId) => {
    setProgress(prev => {
      const stageProgress = prev[stageId] || {};
      return {
        ...prev,
        [stageId]: {
          ...stageProgress,
          [taskId]: !stageProgress[taskId]
        }
      };
    });
  };

  const getStageCompletion = (stageId, tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedCount = tasks.filter(t => progress[stageId]?.[t.id]).length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', padding: '2rem 0' }}>
      {/* Background trace line */}
      <div style={{ position: 'absolute', left: '24px', top: '0', bottom: '0', width: '2px', background: 'var(--surface-border)', zIndex: 0 }} />

      {flowData.stages.map((stage, index) => {
        const completion = getStageCompletion(stage.id, stage.tasks);
        const isComplete = completion === 100;
        const Icon = icons[index % icons.length];
        
        return (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            style={{ position: 'relative', paddingLeft: '60px', marginBottom: '3rem', zIndex: 1 }}
          >
            {/* The Node */}
            <div 
              className={isComplete ? '' : 'waveform-pulse'}
              style={{
                position: 'absolute',
                left: '8px',
                top: '0',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: isComplete ? 'var(--pcb-green)' : 'var(--bg-color)',
                border: `2px solid ${isComplete ? 'var(--pcb-green)' : 'var(--accent-teal)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isComplete ? 'var(--bg-color)' : 'var(--accent-teal)',
                boxShadow: isComplete ? '0 0 10px rgba(46, 204, 113, 0.4)' : '0 0 10px rgba(0, 229, 192, 0.4)',
                zIndex: 2
              }}
            >
              <Icon size={16} />
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', borderLeftColor: isComplete ? 'var(--pcb-green)' : 'var(--accent-teal)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: isComplete ? 'var(--text-main)' : 'var(--accent-teal)' }}>
                  {stage.name}
                </h3>
                <div className="tech-text" style={{ fontSize: '0.8rem', color: isComplete ? 'var(--pcb-green)' : 'var(--accent-gold)' }}>
                  {completion}% COMPLETED
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>EST: {stage.duration}</p>

              {stage.riskFlag && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error-red)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ color: 'var(--error-red)', marginTop: '2px' }}>⚠️</div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--error-red)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>VERIFICATION RISK AUTO-INJECTED</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{stage.riskFlag}</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {stage.tasks.map(task => {
                  const isTaskDone = progress[stage.id]?.[task.id];
                  return (
                    <label key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!isTaskDone} 
                        onChange={() => toggleTask(stage.id, task.id)}
                        style={{ marginTop: '5px', accentColor: 'var(--pcb-green)' }}
                      />
                      <span style={{ 
                        color: isTaskDone ? 'var(--text-muted)' : 'var(--text-main)',
                        textDecoration: isTaskDone ? 'line-through' : 'none'
                      }}>
                        {task.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DesignFlowView;
