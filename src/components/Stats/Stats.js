import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Stats.css';

function useCountUp(end, duration, startCounting) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!startCounting) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };
    countRef.current = requestAnimationFrame(animate);
    return () => {
      if (countRef.current) cancelAnimationFrame(countRef.current);
    };
  }, [end, duration, startCounting]);

  return count;
}

function StatCard({ number, suffix, label, theme, delay, startCounting }) {
  const count = useCountUp(number, 2, startCounting);

  return (
    <motion.div
      className="stat-card"
      style={{
        backgroundColor: theme.secondary,
        border: `2px solid ${theme.primary30}`,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="stat-number" style={{ color: theme.primary }}>
        {count.toLocaleString()}{suffix}
      </h2>
      <p className="stat-label" style={{ color: theme.tertiary80 }}>
        {label}
      </p>
    </motion.div>
  );
}

function Stats() {
  const { theme } = useContext(ThemeContext);
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 4, suffix: '+', label: 'Years of Experience' },
    { number: 23, suffix: 'M+', label: 'Records Managed' },
    { number: 500, suffix: 'K+', label: 'Daily Transactions' },
    { number: 3000, suffix: '+', label: 'KYC Onboardings/Day' },
  ];

  return (
    <div
      className="stats"
      id="stats"
      ref={sectionRef}
      style={{ backgroundColor: theme.secondary }}
    >
      <motion.h2
        className="stats-header"
        style={{ color: theme.primary }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Impact at Scale
      </motion.h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            number={stat.number}
            suffix={stat.suffix}
            label={stat.label}
            theme={theme}
            delay={index * 0.15}
            startCounting={startCounting}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
