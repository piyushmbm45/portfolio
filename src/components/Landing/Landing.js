import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';
import './Landing.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const roles = [
  'Assistant Tech Lead',
  'Full Stack Engineer',
  'System Design Enthusiast',
  'Database Architect',
];

function Landing() {
  const { theme, drawerOpen } = useContext(ThemeContext);

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));
          if (text.length + 1 === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const useStyles = makeStyles((t) => ({
    resumeBtn: {
      color: theme.primary,
      borderRadius: '30px',
      textTransform: 'inherit',
      textDecoration: 'none',
      width: '150px',
      fontSize: '1rem',
      fontWeight: '500',
      height: '50px',
      fontFamily: 'var(--primaryFont)',
      border: `3px solid ${theme.primary}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: theme.tertiary,
        color: theme.secondary,
        border: `3px solid ${theme.tertiary}`,
        boxShadow: `0 0 20px ${theme.primary50}, 0 0 40px ${theme.primary30}`,
        transform: 'translateY(-2px)',
      },
      [t.breakpoints.down('sm')]: {
        width: '180px',
      },
    },
    contactBtn: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      borderRadius: '30px',
      textTransform: 'inherit',
      textDecoration: 'none',
      width: '150px',
      height: '50px',
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: 'var(--primaryFont)',
      border: `3px solid ${theme.primary}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: theme.secondary,
        color: theme.tertiary,
        border: `3px solid ${theme.tertiary}`,
        boxShadow: `0 0 20px ${theme.primary50}, 0 0 40px ${theme.primary30}`,
        transform: 'translateY(-2px)',
      },
      [t.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  return (
    <div className="landing">
      <div className="landing--container">
        <div
          className="landing--container-left"
          style={{
            '--grad-1': theme.primary,
            '--grad-2': theme.primary600,
            '--grad-3': theme.primary400,
          }}
        >
          <motion.div
            className="lcl--content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {socialsData.linkedIn && (
              <a href={socialsData.linkedIn} target="_blank" rel="noreferrer">
                <FaLinkedin
                  className="landing--social"
                  style={{ color: theme.secondary }}
                  aria-label="LinkedIn"
                />
              </a>
            )}
            {socialsData.github && (
              <a href={socialsData.github} target="_blank" rel="noreferrer">
                <FaGithub
                  className="landing--social"
                  style={{ color: theme.secondary }}
                  aria-label="GitHub"
                />
              </a>
            )}
          </motion.div>
        </div>
        <motion.img
          src={headerData.image}
          alt="Piyush Jain - Assistant Tech Lead"
          className="landing--img"
          style={{
            opacity: `${drawerOpen ? '0' : '1'}`,
            borderColor: theme.secondary,
            x: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5, x: '-50%' }}
          animate={{ opacity: drawerOpen ? 0 : 1, scale: 1, x: '-50%' }}
          transition={{ duration: 0.8 }}
        />
        <div className="landing--container-right" style={{ backgroundColor: theme.secondary }}>
          <motion.div
            className="lcr--content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: theme.tertiary }}
          >
            <h6 style={{ minHeight: '1.5em' }}>
              {text}
              <span className="typing-cursor" style={{ color: theme.primary }}>
                |
              </span>
            </h6>
            <h1
              className="gradient-name"
              style={{ '--gradient-start': theme.tertiary, '--gradient-end': theme.primary }}
            >
              {headerData.name}
            </h1>
            <p>{headerData.description}</p>

            <div className="lcr-buttonContainer">
              {headerData.resumePdf && (
                <a
                  href={headerData.resumePdf}
                  download="piyush_full_stack_developer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className={classes.resumeBtn}>Download CV</Button>
                </a>
              )}
              <NavLink to="/#contacts" smooth={true} spy="true" duration={2000}>
                <Button className={classes.contactBtn}>Contact</Button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
