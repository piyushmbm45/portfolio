import React from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  return (
    <div className="space-background" aria-hidden="true">
      {/* Real Stars */}
      <div className="star star--small" style={{ top: '15%', left: '10%' }} />
      <div className="star star--medium" style={{ top: '25%', left: '20%' }} />
      <div className="star star--large" style={{ top: '35%', left: '5%' }} />
      <div className="star star--small" style={{ top: '45%', left: '15%' }} />
      <div className="star star--medium" style={{ top: '55%', left: '8%' }} />
      <div className="star star--small" style={{ top: '65%', left: '12%' }} />
      <div className="star star--large" style={{ top: '75%', left: '18%' }} />
      <div className="star star--medium" style={{ top: '85%', left: '6%' }} />
      
      <div className="star star--small" style={{ top: '10%', right: '15%' }} />
      <div className="star star--large" style={{ top: '20%', right: '8%' }} />
      <div className="star star--medium" style={{ top: '30%', right: '22%' }} />
      <div className="star star--small" style={{ top: '40%', right: '12%' }} />
      <div className="star star--medium" style={{ top: '50%', right: '18%' }} />
      <div className="star star--large" style={{ top: '60%', right: '5%' }} />
      <div className="star star--small" style={{ top: '70%', right: '25%' }} />
      <div className="star star--medium" style={{ top: '80%', right: '10%' }} />
      <div className="star star--small" style={{ top: '90%', right: '20%' }} />
    </div>
  );
};

export default SpaceBackground;

