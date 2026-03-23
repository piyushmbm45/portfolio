import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

function WaveDivider({ flip }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: '100%',
        lineHeight: 0,
        overflow: 'hidden',
        transform: flip ? 'rotate(180deg)' : 'none',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '50px', display: 'block' }}
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={theme.secondary}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
