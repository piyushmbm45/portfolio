import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

import { ThemeContext } from '../../contexts/ThemeContext';

import { AiOutlineFolder } from 'react-icons/ai';

import './Achievement.css';

function AchievementCard({ id, title, details, date, field, image }) {
  const { theme } = useContext(ThemeContext);

  const useStyles = makeStyles((t) => ({
    achievementCard: {
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
      <div key={id} className={`achievement-card ${classes.achievementCard}`}>
        <div className="achievecard-content">
          <div className="achievecard-details1">
            <h2 style={{ color: theme.tertiary }}>{title}</h2>
            <p style={{ color: theme.tertiary80 }}>{details}</p>
          </div>
          <div
            className="achievecard-details2"
            style={{ color: theme.primary }}
          >
            <h5>{date}</h5>
            <div className="achievecard-field">
              <AiOutlineFolder />
              <h5>{field}</h5>
            </div>
          </div>
        </div>
        <div className="achievecard-imgcontainer">
          <img src={image} alt={title} />
        </div>
      </div>
    </motion.div>
  );
}

export default AchievementCard;
