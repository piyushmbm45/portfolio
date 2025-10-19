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
import { headerData } from '../../data/headerData';

// Lazy load heavy components
const LazyProjects = lazy(() => import('../../components/Projects/Projects'));
const LazyServices = lazy(() => import('../../components/Services/Services'));

function Main() {
  return (
    <div>
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
