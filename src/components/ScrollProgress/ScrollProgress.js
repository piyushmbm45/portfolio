import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

function ScrollProgress() {
  const { theme } = useContext(ThemeContext);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollWidth(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollWidth}%`,
        height: '4px',
        background: `linear-gradient(90deg, ${theme.primary}, ${theme.primary400})`,
        zIndex: 1000,
        transition: 'width 0.1s linear',
      }}
    />
  );
}

export default ScrollProgress;
