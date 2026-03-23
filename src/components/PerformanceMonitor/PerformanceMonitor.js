import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          // LCP tracked
        }
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            // CLS tracked
          }
        }
      }
    });

    try {
      observer.observe({
        entryTypes: ['largest-contentful-paint', 'layout-shift'],
      });
    } catch (e) {
      // PerformanceObserver not supported
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
