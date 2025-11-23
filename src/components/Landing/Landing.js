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
  const [showParticles, setShowParticles] = useState(false);

  const themedParticlesOptions = useMemo(() => {
    const primary = theme.primary;
    const secondary = theme.secondary;
    const tertiary = theme.tertiary;

    const base = { ...options };
    base.particles = base.particles || {};
    base.particles.links = base.particles.links || {};
    base.particles.move = base.particles.move || {};

    const isMobile =
      typeof window !== 'undefined' ? window.innerWidth < 900 : false;
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 40 : 100;
    const particleSpeed = prefersReducedMotion ? 0 : isMobile ? 0.6 : 1.1;

    return {
      ...base,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        ...base.particles,
        number: { value: particleCount, density: { enable: true, area: 900 } },
        color: { value: [tertiary, primary, secondary] },
        links: {
          ...base.particles.links,
          enable: true,
          color: tertiary,
          opacity: 0.25,
          distance: 140,
          width: 1,
        },
        opacity: { value: 0.7 },
        size: { value: { min: 1, max: 4 } },
        move: {
          ...base.particles.move,
          enable: true,
          speed: particleSpeed,
          warp: true,
          attract: { enable: true, rotateX: 600, rotateY: 1200 },
        },
      },
      absorbers: {
        orbits: true,
        destroy: false,
        color: primary,
        size: { value: 8, limit: 60, density: 1500 },
        position: { x: 50, y: 50 },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'attract' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          attract: { distance: 200, duration: 0.3, speed: 1 },
          push: { quantity: 4 },
          repulse: { distance: 150, duration: 0.4 },
        },
      },
      detectRetina: true,
    };
  }, [theme]);

  useEffect(() => {
    // Pass theme colors into CSS variables for animated gradient and floating shapes
    if (containerRef.current) {
      const root = containerRef.current;
      root.style.setProperty('--landingGrad1', theme.secondary);
      root.style.setProperty('--landingGrad2', theme.tertiary);
      root.style.setProperty('--landingGrad3', theme.primary);
      root.style.setProperty('--floatGrad1', theme.primary);
      root.style.setProperty('--floatGrad2', theme.tertiary);
      root.style.setProperty('--floatGrad3', theme.secondary);
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

  useEffect(() => {
    // Defer loading particles to improve TTI
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReducedMotion) {
      setShowParticles(false);
      return;
    }
    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setShowParticles(true), {
        timeout: 1000,
      });
    } else {
      const t = setTimeout(() => setShowParticles(true), 700);
      idleId = { cancel: () => clearTimeout(t) };
    }
    return () => {
      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        // @ts-ignore
        window.cancelIdleCallback(idleId);
      } else if (idleId && idleId.cancel) {
        idleId.cancel();
      }
    };
  }, []);
  return (
    <div className="landing" ref={containerRef}>
      <div className="landing--container">
        {/* Particles background */}
        <div className="particles-bg" aria-hidden="true">
          {showParticles && (
            <Suspense fallback={null}>
              <LazyParticles
                id="tsparticles"
                init={async (engine) => {
                  await loadFull(engine);
                }}
                options={themedParticlesOptions}
                style={{ pointerEvents: 'none' }}
              />
            </Suspense>
          )}
        </div>
        {/* Decorative floating shapes */}
        <div className="floating floating--one" aria-hidden="true" />
        <div className="floating floating--two" aria-hidden="true" />
        <div className="floating floating--three" aria-hidden="true" />
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
          src={headerData.image}
          alt=""
          className="landing--img reveal"
          ref={imgRef}
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
