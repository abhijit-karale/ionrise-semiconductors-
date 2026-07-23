import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Share2, Mail } from 'lucide-react';
import './Roadmap.css';

const RoadmapView = ({ roadmap }) => {
  const [progress, setProgress] = useState({});
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (roadmap?.id) {
      const savedProgress = localStorage.getItem(`roadmap_progress_${roadmap.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [roadmap]);

  if (!roadmap || !roadmap.roadmap_data_json) {
    return <div className="loading-state tech-text">INVALID_ROADMAP_DATA</div>;
  }

  const handleToggle = (monthIndex, milestoneIndex) => {
    const key = `${monthIndex}-${milestoneIndex}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem(`roadmap_progress_${roadmap.id}`, JSON.stringify(newProgress));
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#/roadmap/r/${roadmap.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    if (email) {
      setSaved(true);
      // In a real app, send a PUT request to update user_roadmaps.email_optional
    }
  };

  // Calculate overall completion
  const totalMilestones = roadmap.roadmap_data_json.reduce((acc, month) => acc + month.milestones.length, 0);
  const completedMilestones = Object.values(progress).filter(Boolean).length;
  const percentComplete = totalMilestones === 0 ? 0 : Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="roadmap-view">
      <div className="roadmap-header glass-card">
        <div>
          <h2 style={{ color: 'var(--accent-teal)' }}>Your Personalized Career Roadmap</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Track: {roadmap.intake_answers_json?.role?.toUpperCase()} | Timeline: {roadmap.roadmap_data_json.length} Months
          </p>
        </div>
        
        <div className="roadmap-actions">
          <button className="btn btn-outline" onClick={handleCopyLink}>
            {copied ? <Check size={16} /> : <Share2 size={16} />} 
            {copied ? 'Copied!' : 'Share Link'}
          </button>
        </div>
      </div>

      <div className="roadmap-timeline-container">
        <div className="circuit-trace">
          <div className="circuit-trace-fill" style={{ height: `${percentComplete}%` }}></div>
        </div>

        {roadmap.roadmap_data_json.map((monthData, mIdx) => (
          <motion.div 
            key={mIdx} 
            className="month-card glass-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="month-label tech-text">MONTH {monthData.month}</div>
            <h3 className="month-theme">{monthData.theme}</h3>
            
            <div className="milestones-list">
              {monthData.milestones.map((ms, msIdx) => {
                const isDone = progress[`${mIdx}-${msIdx}`];
                return (
                  <div key={msIdx} className={`milestone-item ${isDone ? 'completed' : ''}`}>
                    <button 
                      className={`checkbox-btn ${isDone ? 'checked' : ''}`}
                      onClick={() => handleToggle(mIdx, msIdx)}
                    >
                      {isDone && <Check size={14} />}
                    </button>
                    <div className="milestone-content">
                      <span className={`milestone-type type-${ms.type}`}>{ms.type}</span>
                      <p>{ms.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        <motion.div 
          className="goal-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 style={{ color: 'var(--accent-gold)' }}>Destination Reached</h3>
          <p>By Month {roadmap.roadmap_data_json.length}, you'll have a GitHub portfolio with verified projects, completed certifications, and interview-ready fundamentals in {roadmap.intake_answers_json?.role?.toUpperCase()}.</p>
          
          {percentComplete === 100 && (
            <div className="completion-badge mt-4">
              <Check size={24} color="var(--bg-main)" />
              <span>ROADMAP_100%_COMPLETE</span>
            </div>
          )}
        </motion.div>
      </div>

      {!saved && (
        <div className="save-bar glass-card mt-5">
          <div>
            <h3>Save your progress</h3>
            <p style={{ color: 'var(--text-muted)' }}>Get a PDF export and monthly check-ins.</p>
          </div>
          <form className="save-form" onSubmit={handleSaveEmail}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary"><Mail size={16} /> Save Roadmap</button>
          </form>
        </div>
      )}
      
      {saved && (
        <div className="save-bar glass-card mt-5" style={{ justifyContent: 'center', color: 'var(--accent-teal)' }}>
          <Check size={20} style={{ marginRight: '0.5rem' }} /> Roadmap linked to your email!
        </div>
      )}
    </div>
  );
};

export default RoadmapView;
