import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateFollower = () => {
      const diffX = mouseX - followerX;
      const diffY = mouseY - followerY;
      
      followerX += diffX * 0.1;
      followerY += diffY * 0.1;

      // Position is already centered via CSS transform
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animateFollower);
    };

    const handleMouseMove = (e) => {
      updateCursor(e);
      
      // Check if hovering over interactive elements
      const target = e.target;
      if (target && typeof target.closest === 'function') {
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('[onclick]') ||
          target.classList?.contains('landing--social') ||
          target.classList?.contains('particles-bg') ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        setIsHovering(isInteractive);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animateFollower();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${
          isClicking ? 'click' : ''
        }`}
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${isHovering ? 'hover' : ''} ${
          isClicking ? 'click' : ''
        }`}
      />
    </>
  );
};

export default CustomCursor;



