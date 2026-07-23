import React from 'react';

const DuotoneImage = ({ src, alt, style = {}, className = '' }) => {
  return (
    <div 
      className={`duotone-container ${className}`} 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#0A0E14', 
        ...style 
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
          mixBlendMode: 'screen'
        }}
      />
      {/* Duotone Overlay layer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#00E5C0', // Circuit Teal
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          opacity: 0.8
        }}
      />
      {/* Secondary accent layer for deeper shadows */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#0A0E14', // Dark Base
          mixBlendMode: 'lighten',
          pointerEvents: 'none',
          opacity: 0.2
        }}
      />
    </div>
  );
};

export default DuotoneImage;
