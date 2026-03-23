import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Education.css';
import EducationCard from './EducationCard';

import { educationData } from '../../data/educationData';
import { motion } from 'framer-motion';

function Education() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="education" id="resume" style={{ backgroundColor: theme.secondary }}>
      <div className="education-body">
        <motion.div
          className="education-description"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ color: theme.primary }}>Education</h1>
          {educationData.map((edu) => (
            <EducationCard
              key={edu.id}
              id={edu.id}
              institution={edu.institution}
              course={edu.course}
              startYear={edu.startYear}
              endYear={edu.endYear}
            />
          ))}
        </motion.div>
        <motion.div
          className="education-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={theme.eduimg} alt="Education background" />
        </motion.div>
      </div>
    </div>
  );
}

export default Education;
