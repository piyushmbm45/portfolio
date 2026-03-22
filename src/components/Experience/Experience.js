import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Experience.css';

import { experienceData } from '../../data/experienceData';
import ExperienceCard from './ExperienceCard';
import { motion } from 'framer-motion';

function Experience() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className="experience"
      id="experience"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="experience-body">
        <motion.div className="experience-description"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ color: theme.primary }}>Experience</h1>
          {experienceData.map((exp) => (
            <ExperienceCard
              key={exp.id}
              id={exp.id}
              jobtitle={exp.jobtitle}
              company={exp.company}
              startYear={exp.startYear}
              endYear={exp.endYear}
            />
          ))}
        </motion.div>
        <motion.div className="experience-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={theme.expimg} alt="Professional experience" />
        </motion.div>
      </div>
    </div>
  );
}

export default Experience;
