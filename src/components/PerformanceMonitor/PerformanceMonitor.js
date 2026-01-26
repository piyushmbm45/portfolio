import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals (only in development)
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
              console.log('CLS:', entry.value);
            }
          }
        }
      });

      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      });

      // Monitor page load time
      window.addEventListener('load', () => {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
