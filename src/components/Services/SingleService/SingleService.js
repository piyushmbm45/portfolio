import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { ThemeContext } from '../../../contexts/ThemeContext';

import './SingleService.css';

function SingleService({ id, title, icon }) {
  const { theme } = useContext(ThemeContext);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        key={id}
        className="single-service"
        style={{
          background: theme.type === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : theme.primary400,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${theme.primary30}`,
        }}
      >
        <div className="service-content" style={{ color: theme.tertiary }}>
          <i className="service-icon">{icon}</i>
          <h4 style={{ color: theme.tertiary }}>{title}</h4>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleService;
