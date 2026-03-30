import React, { useContext } from 'react';

import './Skills.css';

import { ThemeContext } from '../../contexts/ThemeContext';
import { skillsCategories } from '../../data/skillsData';
import { skillsImage } from '../../utils/skillsImage';
import { motion } from 'framer-motion';

function Skills() {
  const { theme } = useContext(ThemeContext);

  const skillBoxStyle = {
    background: theme.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    border: `1px solid ${theme.primary30}`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const categoryStyle = {
    borderLeft: `3px solid ${theme.primary}`,
  };

  return (
    <div className="skills" id="skills" style={{ backgroundColor: theme.secondary }}>
      <motion.div
        className="skillsHeader"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ color: theme.primary }}>Skills</h2>
      </motion.div>
      <div className="skills-categories">
        {skillsCategories.map((category, catIndex) => (
          <motion.div
            className="skills-category"
            key={category.title}
            style={categoryStyle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <h3 className="category-title" style={{ color: theme.tertiary }}>
              {category.title}
            </h3>
            <div className="category-skills">
              {category.skills.map((skill) => {
                const img = skillsImage(skill);
                return (
                  <div
                    className="skill--box"
                    key={skill}
                    style={skillBoxStyle}
                  >
                    {img && <img src={img} alt={skill} />}
                    <span style={{ color: theme.tertiary }}>{skill}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
