import { useEffect, useRef } from 'react';

/**
 * High-performance 120 FPS GPU-accelerated scroll progress bar.
 * Updates directly via transform: scaleX() with zero React re-renders and zero delay,
 * staying 100% locked and perfectly synced to user scroll.
 */
export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateBar = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateBar();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 100000,
        pointerEvents: 'none',
        background: 'rgba(255, 255, 255, 0.04)',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #7c8195 0%, #d2d6e4 60%, #ffffff 100%)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
          boxShadow: '0 0 12px rgba(255, 255, 255, 0.65)',
        }}
      />
    </div>
  );
}
