import React from 'react';
import PageHeader from '../components/PageHeader';

const GenericPage = ({ title, subtitle, children }) => {
  return (
    <div className="generic-page">
      <PageHeader title={title} subtitle={subtitle} />
      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenericPage;
