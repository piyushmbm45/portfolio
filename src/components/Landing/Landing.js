import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy,
  Suspense,
} from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';
import './Landing.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { loadFull } from 'tsparticles';
import options from './bg';
const LazyParticles = lazy(() => import('react-tsparticles'));

function Landing() {
  const { theme, drawerOpen } = useContext(ThemeContext);

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
      transition: 'all 150ms ease-out',
      '&:hover': {
        backgroundColor: theme.tertiary,
        color: theme.secondary,
        border: `3px solid ${theme.tertiary}`,
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        transform: 'translateY(-1px)',
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
      transition: 'all 150ms ease-out',
      '&:hover': {
        backgroundColor: theme.secondary,
        color: theme.tertiary,
        border: `3px solid ${theme.tertiary}`,
        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
        transform: 'translateY(-1px)',
      },
      [t.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);
  const [showParticles, setShowParticles] = useState(false); // Disabled to reduce distraction
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(headerData.image);

  const themedParticlesOptions = useMemo(() => {
    // Space-themed colors
    const spaceColors = [
      '#ffffff', // Bright stars
      '#e0e7ff', // Light blue stars
      '#a5b4fc', // Blue stars
      '#818cf8', // Purple-blue
      '#6366f1', // Indigo
      '#8b5cf6', // Purple
      '#06b6d4', // Cyan
      '#22d3ee', // Sky blue
      '#67e8f9', // Light cyan
    ];

    const base = { ...options };
    base.particles = base.particles || {};
    base.particles.links = base.particles.links || {};
    base.particles.move = base.particles.move || {};
    base.particles.opacity = base.particles.opacity || {};

    const isMobile =
      typeof window !== 'undefined' ? window.innerWidth < 900 : false;
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 60 : 150;
    const particleSpeed = prefersReducedMotion ? 0 : isMobile ? 0.4 : 0.8;

    return {
      ...base,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        ...base.particles,
        number: { value: particleCount, density: { enable: true, area: 800 } },
        color: { value: spaceColors },
        links: {
          ...base.particles.links,
          enable: true,
          color: '#818cf8',
          opacity: 0.4,
          distance: 120,
          width: 1,
        },
        opacity: {
          value: { min: 0.3, max: 1 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
            minimumValue: 0.3,
          },
        },
        size: {
          value: { min: 0.5, max: 8 }, // Increased max for planets
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.5,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        move: {
          ...base.particles.move,
          enable: true,
          speed: particleSpeed,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      absorbers: {
        orbits: true,
        destroy: false,
        color: '#1e1b4b', // Deep space blue
        size: { value: 10, limit: 80, density: 1500 },
        position: { x: 50, y: 50 },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.4,
            },
          },
          push: { quantity: 4 },
          repulse: { distance: 150, duration: 0.4 },
        },
      },
      detectRetina: true,
    };
  }, []);

  useEffect(() => {
    // Pass space theme colors into CSS variables for animated gradient and floating shapes
    if (containerRef.current) {
      const root = containerRef.current;
      // Lighter space blues for better visibility
      root.style.setProperty('--landingGrad1', '#1a1f3a'); // Lighter space
      root.style.setProperty('--landingGrad2', '#2d3561'); // Medium blue
      root.style.setProperty('--landingGrad3', '#3b4a7a'); // Lighter blue
      root.style.setProperty('--landingGrad4', '#1e1b4b'); // Purple-blue
      // Floating shapes with space colors
      root.style.setProperty('--floatGrad1', '#6366f1'); // Indigo
      root.style.setProperty('--floatGrad2', '#8b5cf6'); // Purple
      root.style.setProperty('--floatGrad3', '#06b6d4'); // Cyan
    }

    // Simple intersection observer for scroll-reveal
    const elements = [contentRef.current, imgRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target === imgRef.current) {
              entry.target.classList.add('glow');
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [theme]);

  // Particles disabled to reduce distraction
  useEffect(() => {
    setShowParticles(false);
  }, []);
  return (
    <div className="landing" ref={containerRef}>
      <div className="landing--container">
        {/* Particles and floating shapes disabled to reduce distraction */}
        <div
          className="landing--container-left"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="lcl--content">
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
          </div>
        </div>
        <img
          src={imageError ? headerData.fallbackImage : imageSrc}
          alt={headerData.imageAlt || `${headerData.name} - ${headerData.title}`}
          className="landing--img reveal"
          ref={imgRef}
          onError={() => {
            if (!imageError) {
              setImageError(true);
              setImageSrc(headerData.fallbackImage);
            }
          }}
          onLoad={() => {
            // Image loaded successfully
            if (imgRef.current) {
              imgRef.current.classList.add('glow');
            }
          }}
          style={{
            opacity: `${drawerOpen ? '0' : '1'}`,
            borderColor: theme.secondary,
            borderWidth: '8px',
            borderStyle: 'solid',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div
          className="landing--container-right"
          style={{ backgroundColor: theme.secondary }}
        >
          <div
            className="lcr--content reveal"
            ref={contentRef}
            style={{ color: theme.tertiary }}
          >
            <h6>{headerData.title}</h6>
            <h1>{headerData.name}</h1>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
