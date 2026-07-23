import React from 'react';
import './PageHeader.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <div className="glow-bg" style={{ top: '30%', opacity: 0.5 }}></div>
      <div className="container">
        <h1 className="page-title animate-fade-in">{title}</h1>
        {subtitle && <p className="page-subtitle animate-fade-in delay-100">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
