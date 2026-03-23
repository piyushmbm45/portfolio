import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { ThemeContext } from '../../contexts/ThemeContext';

import expImgWhite from '../../assets/svg/experience/expImgWhite.svg';
import expImgBlack from '../../assets/svg/experience/expImgBlack.svg';

import './Experience.css';

function ExperienceCard({ id, company, jobtitle, startYear, endYear }) {
  const { theme } = useContext(ThemeContext);

  const useStyles = makeStyles((t) => ({
    experienceCard: {
      background: theme.type === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : `${theme.primary30}`,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: `1px solid ${theme.primary30}`,
      '&:hover': {
        background: theme.type === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : `${theme.primary50}`,
        boxShadow: `0 8px 32px ${theme.primary30}`,
      },
    },
  }));

  const classes = useStyles();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div key={id} className={`experience-card ${classes.experienceCard}`}>
        <div className="expcard-img" style={{ backgroundColor: theme.primary }}>
          <img
            src={theme.type === 'light' ? expImgBlack : expImgWhite}
            alt={`${company} - ${jobtitle}`}
          />
        </div>
        <div className="experience-details">
          <h6 style={{ color: theme.primary }}>
            {startYear}-{endYear}
          </h6>
          <h4 style={{ color: theme.tertiary }}>{jobtitle}</h4>
          <h5 style={{ color: theme.tertiary80 }}>{company}</h5>
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
