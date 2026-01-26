import React from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  return (
    <div className="space-background" aria-hidden="true">
      {/* Static Physics Symbols - Subtle, non-distracting */}
      <div className="physics-symbol" style={{ top: '12%', right: '20%' }}>π</div>
      <div className="physics-symbol" style={{ top: '42%', left: '5%' }}>θ</div>
      <div className="physics-symbol" style={{ top: '72%', right: '15%' }}>λ</div>
      <div className="physics-symbol" style={{ top: '28%', left: '15%' }}>α</div>
      <div className="physics-symbol" style={{ top: '82%', left: '22%' }}>Δ</div>
      <div className="physics-symbol" style={{ top: '48%', right: '5%' }}>∑</div>
      <div className="physics-symbol" style={{ top: '65%', left: '8%' }}>Ω</div>
      <div className="physics-symbol" style={{ top: '35%', right: '28%' }}>μ</div>

      {/* Static Physics Formulas - Very subtle */}
      <div className="physics-formula" style={{ top: '22%', left: '3%' }}>E=mc²</div>
      <div className="physics-formula" style={{ top: '68%', right: '3%' }}>F=ma</div>
      <div className="physics-formula" style={{ top: '38%', right: '32%' }}>v=u+at</div>
      <div className="physics-formula" style={{ top: '55%', left: '2%' }}>E=hν</div>
      <div className="physics-formula" style={{ top: '15%', left: '30%' }}>F=Gm₁m₂/r²</div>
      <div className="physics-formula" style={{ top: '78%', left: '12%' }}>p=mv</div>

      {/* Static Atomic Structures - Simple, non-animated */}
      <div className="atom atom--hydrogen" style={{ top: '18%', left: '22%' }}>
        <div className="atom-nucleus"></div>
        <div className="atom-orbit orbit-1">
          <div className="atom-electron"></div>
        </div>
      </div>

      <div className="atom atom--helium" style={{ top: '58%', right: '28%' }}>
        <div className="atom-nucleus"></div>
        <div className="atom-orbit orbit-1">
          <div className="atom-electron"></div>
          <div className="atom-electron" style={{ transform: 'translateX(-50%) rotate(180deg) translateY(-28px)' }}></div>
        </div>
      </div>

      <div className="atom atom--carbon" style={{ top: '38%', right: '12%' }}>
        <div className="atom-nucleus"></div>
        <div className="atom-orbit orbit-1">
          <div className="atom-electron"></div>
          <div className="atom-electron" style={{ transform: 'translateX(-50%) rotate(180deg) translateY(-25px)' }}></div>
        </div>
        <div className="atom-orbit orbit-2">
          <div className="atom-electron"></div>
          <div className="atom-electron" style={{ transform: 'translateX(-50%) rotate(120deg) translateY(-35px)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SpaceBackground;

