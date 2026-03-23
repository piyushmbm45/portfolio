import React, { lazy, Suspense } from 'react';
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
import Stats from '../../components/Stats/Stats';
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import WaveDivider from '../../components/WaveDivider/WaveDivider';
import { headerData } from '../../data/headerData';

// Lazy load heavy components
const LazyProjects = lazy(() => import('../../components/Projects/Projects'));
const LazyServices = lazy(() => import('../../components/Services/Services'));

function Main() {
  return (
    <main>
      <ScrollProgress />
      <ThemeSwitcher />
      <PerformanceMonitor />
      <Helmet>
        <title>{headerData.name} - Portfolio</title>
        <meta
          name="description"
          content="Piyush Jain - Assistant Tech Lead | Full Stack Engineer Portfolio"
        />
        <meta
          name="keywords"
          content="assistant tech lead, full stack engineer, node.js, postgresql, distributed databases, system design, portfolio"
        />
        <meta property="og:title" content={`${headerData.name} - Portfolio`} />
        <meta
          property="og:description"
          content="Assistant Tech Lead | Full Stack Engineer Portfolio"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${headerData.name} - Portfolio`} />
        <meta
          name="twitter:description"
          content="Assistant Tech Lead | Full Stack Engineer Portfolio"
        />
        <meta name="author" content="Piyush Jain" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://piyushmbm45.github.io/portfolio/" />
      </Helmet>

      <Navbar />
      <Landing />
      <About />
      <WaveDivider />
      <Stats />
      <WaveDivider flip />
      <Education />
      <Skills />
      <WaveDivider />
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
    </main>
  );
}

export default Main;
