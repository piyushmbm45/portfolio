import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext, useState, useEffect } from 'react';
import { FaUser, FaBriefcase, FaCode } from 'react-icons/fa';
import { IoHomeSharp, IoMenuSharp } from 'react-icons/io5';
import { MdPhone, MdSchool } from 'react-icons/md';
import { motion } from 'framer-motion';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home', icon: IoHomeSharp },
  { to: '/#about', label: 'About', icon: FaUser },
  { to: '/#resume', label: 'Education', icon: MdSchool },
  { to: '/#experience', label: 'Experience', icon: FaBriefcase },
  { to: '/#projects', label: 'Projects', icon: FaCode },
  { to: '/#contacts', label: 'Contact', icon: MdPhone },
];

function Navbar() {
  const { theme, setHandleDrawer } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setHandleDrawer();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setHandleDrawer();
  };

  const useStyles = makeStyles((t) => ({
    navMenu: {
      fontSize: '2rem',
      color: theme.tertiary,
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: theme.primary,
      },
    },
    MuiDrawer: {
      padding: '0em 1.8em',
      width: '14em',
      fontFamily: 'var(--primaryFont)',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '24px',
      background: theme.secondary,
      overflow: 'hidden',
      borderTopRightRadius: '40px',
      borderBottomRightRadius: '40px',
      [t.breakpoints.down('sm')]: {
        width: '12em',
      },
    },
    closebtnIcon: {
      fontSize: '2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: theme.primary,
      position: 'absolute',
      right: 40,
      top: 40,
      transition: 'color 0.2s',
      '&:hover': {
        color: theme.tertiary,
      },
      [t.breakpoints.down('sm')]: {
        right: 20,
        top: 20,
      },
    },
    drawerItem: {
      margin: '2rem auto',
      borderRadius: '78.8418px',
      background: theme.secondary,
      color: theme.primary,
      width: '85%',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: '0 30px',
      boxSizing: 'border-box',
      border: '2px solid',
      borderColor: theme.primary,
      transition: 'background-color 0.2s, color 0.2s',
      '&:hover': {
        background: theme.primary,
        color: theme.secondary,
      },
      [t.breakpoints.down('sm')]: {
        width: '100%',
        padding: '0 25px',
        height: '55px',
      },
    },
    drawerLinks: {
      fontFamily: 'var(--primaryFont)',
      width: '50%',
      fontSize: '1.3rem',
      fontWeight: 600,
      [t.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    drawerIcon: {
      fontSize: '1.6rem',
      [t.breakpoints.down('sm')]: {
        fontSize: '1.385rem',
      },
    },
  }));

  const classes = useStyles();

  const shortname = (name) => {
    if (name.length > 12) {
      return name.split(' ')[0];
    } else {
      return name;
    }
  };

  return (
    <div
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      style={
        scrolled
          ? {
              backgroundColor: theme.secondary,
              boxShadow: `0 2px 20px ${theme.primary30}`,
            }
          : {}
      }
    >
      <div className="navbar--container">
        <NavLink to="/" smooth={true} spy="true" duration={2000} style={{ textDecoration: 'none' }}>
          <h1 style={{ color: scrolled ? theme.tertiary : theme.secondary }}>
            {shortname(headerData.name)}
          </h1>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="navbar--links-desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              smooth={true}
              spy="true"
              duration={2000}
              className="navbar--link"
              style={{ color: scrolled ? theme.tertiary : theme.secondary }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <IoMenuSharp
          className={`${classes.navMenu} navbar--hamburger`}
          onClick={handleDrawerOpen}
          aria-label="Menu"
          style={{ color: scrolled ? theme.tertiary : theme.secondary }}
        />
      </div>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleDrawerClose();
          } else if (reason !== 'escapeKeyDown') {
            handleDrawerClose();
          }
        }}
        anchor="left"
        open={open}
        classes={{ paper: classes.MuiDrawer }}
        className="drawer"
        disableScrollLock={true}
      >
        <div className="div-closebtn">
          <CloseIcon
            onClick={handleDrawerClose}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleDrawerClose();
              }
            }}
            className={classes.closebtnIcon}
            role="button"
            tabIndex="0"
            aria-label="Close"
          />
        </div>
        <br />

        <div onClick={handleDrawerClose}>
          <div className="navLink--container">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <NavLink to={link.to} smooth={true} spy="true" duration={2000}>
                    <div className={classes.drawerItem}>
                      <Icon className={classes.drawerIcon} />
                      <span className={classes.drawerLinks}>{link.label}</span>
                    </div>
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
