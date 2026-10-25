import { useState, useEffect } from 'react';

/**
 * Custom hook for ultra-smooth 120 FPS bidirectional scroll animations.
 * Provides real-time scroll position, normalized progress (0-100%),
 * scroll direction ('down' | 'up'), and scroll velocity for dynamic kinetic effects.
 */
export function useScrollFlow() {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    scrollVelocity: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastTime = performance.now();

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const timeDelta = Math.max(currentTime - lastTime, 16);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max((currentScrollY / docHeight) * 100, 0), 100) : 0;
      
      const deltaY = currentScrollY - lastScrollY;
      const direction = deltaY >= 0 ? 'down' : 'up';
      const velocity = Math.min(Math.abs(deltaY) / (timeDelta / 16), 50);

      setScrollState({
        scrollY: currentScrollY,
        scrollProgress: progress,
        scrollDirection: direction,
        scrollVelocity: velocity,
      });

      // Update root CSS custom properties for bidirectional CSS animations
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      document.documentElement.style.setProperty('--scroll-direction', direction === 'down' ? '1' : '-1');
      document.documentElement.style.setProperty('--scroll-velocity', `${velocity}`);

      lastScrollY = currentScrollY;
      lastTime = currentTime;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollState;
}
