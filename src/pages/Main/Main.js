import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import {
  About,
  Achievement,
  Contacts,
  Education,
  Experience,
  Footer,
  Landing,
  Navbar,
  Skills,
} from '../../components';
import PerformanceMonitor from '../../components/PerformanceMonitor/PerformanceMonitor';
import { headerData } from '../../data/headerData';

// Lazy load heavy components
const LazyProjects = lazy(() => import('../../components/Projects/Projects'));
const LazyServices = lazy(() => import('../../components/Services/Services'));

function Main() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    // Set volume
    audio.volume = 0.3;
    audio.loop = true;

    // Function to start playing
    const startPlaying = async () => {
      try {
        // Check if audio is ready
        if (audio.readyState === 0) {
          return;
        }
        await audio.play();
      } catch (error) {
        // Autoplay prevented - will start on user interaction
      }
    };

    // Function to handle user interaction
    const handleUserInteraction = async () => {
      try {
        if (audio.paused && audio.readyState >= 2) {
          await audio.play();
        }
      } catch (err) {
        // Failed to play - user may have blocked audio
      }
    };

    // Set up event listeners for user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousemove'];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Also try when audio is loaded
    const handleLoaded = () => {
      startPlaying();
    };

    const handleCanPlayThrough = () => {
      startPlaying();
    };

    audio.addEventListener('loadeddata', handleLoaded);
    audio.addEventListener('canplay', handleLoaded);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    // Force load
    audio.load();

    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', handleLoaded);
      audio.removeEventListener('canplay', handleLoaded);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  return (
    <div>
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL || ''}/interstellar.mp3`}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      <PerformanceMonitor />
      <Helmet>
        <title>{headerData.name} - Portfolio</title>
        <meta
          name="description"
          content="Piyush Jain - Full Stack Developer Portfolio"
        />
        <meta
          name="keywords"
          content="developer, portfolio, react, javascript, full stack"
        />
        <meta property="og:title" content={`${headerData.name} - Portfolio`} />
        <meta
          property="og:description"
          content="Full Stack Developer Portfolio"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${headerData.name} - Portfolio`} />
        <meta
          name="twitter:description"
          content="Full Stack Developer Portfolio"
        />
      </Helmet>

      <Navbar />
      <Landing />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Suspense
        fallback={
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading...
          </div>
        }
      >
        <LazyProjects />
      </Suspense>
      <Achievement />
      <Suspense
        fallback={
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading...
          </div>
        }
      >
        <LazyServices />
      </Suspense>
      <Contacts />
      <Footer />
    </div>
  );
}

export default Main;
