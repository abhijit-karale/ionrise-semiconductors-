import React from 'react';
import PageHeader from '../components/PageHeader';

const Privacy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="legal-page">
      <PageHeader 
        title="Privacy Policy" 
        subtitle="Ionrise Semiconductors Privacy Policy" 
      />
      
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', color: 'var(--text-muted)' }}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            <p className="mb-4"><strong>Effective Date:</strong> {currentDate}</p>
            
            <p className="mb-4">
              Ionrise Semiconductors ("we," "us") operates ionrise-semiconductors.com. 
              This policy explains what data we collect and how we use it.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>Information we collect:</h3>
            <ul className="mb-4" style={{ paddingLeft: '1.5rem', listStyleType: 'circle' }}>
              <li>Contact form submissions (name, email, message content)</li>
              <li>Optional email signups (Playground progress saving, Roadmap tool, newsletter)</li>
              <li>Anonymous usage analytics (pages visited, tool usage counts) — no personally identifying data unless voluntarily submitted</li>
              <li>Code submitted to the RTL Code Reviewer or Playground tools is processed to generate results and is not stored beyond the session unless the user explicitly opts in to save it</li>
            </ul>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>How we use it:</h3>
            <ul className="mb-4" style={{ paddingLeft: '1.5rem', listStyleType: 'circle' }}>
              <li>Responding to inquiries submitted via the contact form</li>
              <li>Sending optional progress/roadmap emails (only if the user opts in)</li>
              <li>Improving site tools based on aggregate, anonymized usage patterns</li>
            </ul>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>Third parties:</h3>
            <ul className="mb-4" style={{ paddingLeft: '1.5rem', listStyleType: 'circle' }}>
              <li>We do not sell or share personal data with third parties for marketing</li>
              <li>AI-powered tools (Code Reviewer, Interview Coach) send submitted code/text to Anthropic's API for processing; this data is subject to Anthropic's own API data handling terms (<a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noreferrer" style={{color: 'var(--accent-teal)'}}>Anthropic Privacy Policy</a>).</li>
            </ul>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>Data retention & deletion:</h3>
            <p className="mb-4">
              Users may request deletion of any stored data (email signups, saved progress) by contacting <a href="mailto:hello@ionrise-semiconductors.com" style={{color: 'var(--accent-teal)'}}>hello@ionrise-semiconductors.com</a>.
            </p>
            
            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>Cookies:</h3>
            <p className="mb-4">
              We use browser local storage only, to save your Playground and Roadmap progress locally on your device. We do not use tracking cookies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
