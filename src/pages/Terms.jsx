import React from 'react';
import PageHeader from '../components/PageHeader';

const Terms = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="legal-page">
      <PageHeader 
        title="Terms of Service" 
        subtitle="Ionrise Semiconductors Terms & Conditions" 
      />
      
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', color: 'var(--text-muted)' }}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            <p className="mb-4"><strong>Effective Date:</strong> {currentDate}</p>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>1. Services</h3>
            <p className="mb-4">
              Ionrise provides RTL design, verification, and related engineering services on a project or contract basis, as agreed in a separate statement of work with each client.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>2. Free Tools</h3>
            <p className="mb-4">
              The Playground compiler, Gate Rush game, Code Reviewer, Interview Coach, and Career Roadmap Generator are provided free of charge, "as is," for educational and evaluation purposes. Ionrise makes no warranty regarding the accuracy or completeness of AI-generated feedback from these tools.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>3. User-submitted content</h3>
            <p className="mb-4">
              By submitting code to the Playground or review tools, you confirm you have the right to share it and grant Ionrise a limited license to process it solely to return results to you.
            </p>

            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>4. Intellectual property</h3>
            <p className="mb-4">
              Portfolio projects, site content, and Ionrise branding are the property of Ionrise Semiconductors unless otherwise noted. Open-source components used in tools retain their original licenses.
            </p>
            
            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>5. Limitation of liability</h3>
            <p className="mb-4">
              Ionrise is not liable for any damages arising from use of the free tools, including reliance on AI-generated code review or interview feedback for professional decisions.
            </p>
            
            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>6. Changes</h3>
            <p className="mb-4">
              These terms may be updated; continued use of the site constitutes acceptance of the current version.
            </p>
            
            <h3 className="mt-5 mb-3" style={{ color: 'var(--text-main)' }}>7. Contact</h3>
            <p className="mb-4">
              Questions about these terms: <a href="mailto:hello@ionrise-semiconductors.com" style={{color: 'var(--accent-teal)'}}>hello@ionrise-semiconductors.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
