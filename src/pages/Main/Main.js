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
      console.error('Audio element not found');
      return;
    }

    console.log('Audio element found, initializing...');
    console.log('Audio src:', audio.src);

    // Set volume
    audio.volume = 0.3;
    audio.loop = true;

    // Handle audio errors
    const handleError = (e) => {
      console.error('Audio error:', e);
      console.error('Error code:', audio.error?.code);
      console.error('Error message:', audio.error?.message);
      console.error('Current src:', audio.src);
      console.error('Network state:', audio.networkState);
      console.error('Ready state:', audio.readyState);
    };

    audio.addEventListener('error', handleError);

    // Function to start playing
    const startPlaying = async () => {
      try {
        // Check if audio is ready
        if (audio.readyState === 0) {
          console.log('Audio not loaded yet, waiting...');
          return;
        }
        console.log('Attempting to play audio...');
        console.log('Ready state:', audio.readyState);
        await audio.play();
        console.log('✅ Music started successfully!');
      } catch (error) {
        console.warn('❌ Autoplay prevented:', error.message);
        console.log('Music will start on first user interaction');
      }
    };

    // Function to handle user interaction
    const handleUserInteraction = async () => {
      try {
        if (audio.paused && audio.readyState >= 2) {
          console.log('User interacted, attempting to play...');
          await audio.play();
          console.log('✅ Music started on user interaction!');
        } else if (audio.readyState < 2) {
          console.log('Audio not ready yet, readyState:', audio.readyState);
        }
      } catch (err) {
        console.error('Failed to play audio on interaction:', err);
        console.error('Error details:', {
          code: err.code,
          message: err.message,
          readyState: audio.readyState,
          networkState: audio.networkState,
          src: audio.src,
        });
      }
    };

    // Set up event listeners for user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousemove'];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Also try when audio is loaded
    const handleLoaded = () => {
      console.log('Audio loaded, readyState:', audio.readyState);
      console.log('Attempting to play...');
      startPlaying();
    };

    const handleCanPlayThrough = () => {
      console.log('Audio can play through, readyState:', audio.readyState);
      startPlaying();
    };

    audio.addEventListener('loadeddata', handleLoaded);
    audio.addEventListener('canplay', handleLoaded);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    // Force load
    console.log('Loading audio...');
    audio.load();

    // Cleanup
    return () => {
      audio.removeEventListener('error', handleError);
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
