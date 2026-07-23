import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DesignIntake from './DesignIntake';
import DesignFlowView from './DesignFlowView';
import { generateDesignFlow, getDesignFlow } from '../services/api';

const DesignFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowData, setFlowData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadFlow(id);
    } else {
      setFlowData(null);
    }
  }, [id]);

  const loadFlow = async (flowId) => {
    setLoading(true);
    try {
      const data = await getDesignFlow(flowId);
      setFlowData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load design flow. The link might be invalid.");
    } finally {
      setLoading(false);
    }
  };

  const handleIntakeComplete = async (answers) => {
    setLoading(true);
    try {
      const result = await generateDesignFlow(answers);
      navigate(`/design-flow/f/${result.id}`);
    } catch (err) {
      console.error("Failed to generate flow", err);
      setError("Failed to generate pipeline. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="RTL-to-GDSII Visualizer" 
        subtitle="Generate a bespoke IC design pipeline based on your architectural requirements." 
      />
      
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          {!flowData && !loading && (
            <div style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Every custom silicon project is unique. A deeply embedded IoT sensor requires a vastly different verification strategy than a multi-core AI accelerator. Use the interactive questionnaire below to define your architectural constraints. Based on your inputs, our engine will automatically generate a custom RTL-to-GDSII project pipeline, highlighting the specific verification risks, necessary EDA tools, and estimated timelines for your bespoke IP.
              </p>
            </div>
          )}

          {error && (
            <div className="glass-card" style={{ padding: '1rem', borderLeftColor: 'var(--error-red)', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--error-red)', margin: 0 }}>{error}</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setError(null); navigate('/design-flow'); }}>
                Start Over
              </button>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div className="waveform-pulse" style={{ width: '40px', height: '40px', background: 'var(--accent-teal)', margin: '0 auto', borderRadius: '50%' }} />
              <p className="tech-text" style={{ marginTop: '1rem' }}>// COMPILING_PIPELINE...</p>
            </div>
          ) : flowData ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>Shareable ID: <span className="tech-text">{id}</span></p>
                <button className="btn btn-outline mt-3" onClick={() => navigate('/design-flow')}>Create New Flow</button>
              </div>
              <DesignFlowView flowData={flowData} flowId={id} />
            </div>
          ) : (
            <DesignIntake onComplete={handleIntakeComplete} />
          )}
        </div>
      </section>
    </div>
  );
};

export default DesignFlow;
