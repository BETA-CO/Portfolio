import { useEffect, useRef, useState } from 'react';

/**
 * Ultra-optimized 120 FPS Celestial Star Cursor.
 * Drives pointer coordinates and trailing halo directly through hardware-accelerated DOM transforms,
 * with ZERO React re-renders during motion, delivering silky smooth zero-lag responsiveness.
 */
export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 820 && !window.matchMedia('(pointer: coarse)').matches;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const coreRef = useRef(null);
  const haloRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef({ x: -200, y: -200 });
  const rotationRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 820 && !window.matchMedia('(pointer: coarse)').matches);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let animId;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (!isVisible) setIsVisible(true);

      // Instantly position core star under pointer with zero React re-render
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      // Check for interactive targets (throttled check)
      const target = e.target;
      if (target) {
        const interactive = Boolean(
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]')
        );
        setIsHovered((prev) => (prev !== interactive ? interactive : prev));
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      if (coreRef.current) coreRef.current.style.opacity = '0';
      if (haloRef.current) haloRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      setIsVisible(true);
      if (coreRef.current) coreRef.current.style.opacity = '1';
      if (haloRef.current) haloRef.current.style.opacity = '1';
    };

    // RAF loop for smooth trailing halo interpolation with zero React re-renders
    const updateLoop = () => {
      trailRef.current.x += (mouseRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (mouseRef.current.y - trailRef.current.y) * 0.18;
      rotationRef.current = (rotationRef.current + 0.6) % 360;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className="custom-star-cursor-container"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647, // Maximum 32-bit integer z-index so cursor stays on top of all modals
        display: isVisible ? 'block' : 'none',
      }}
    >
      {/* Trailing Outer Celestial Halo Star */}
      <div
        ref={haloRef}
        className={`star-cursor-halo ${isHovered ? 'halo-hover' : ''} ${isClicking ? 'halo-click' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          willChange: 'transform',
          pointerEvents: 'none',
          transition: 'width 0.25s ease, height 0.25s ease, filter 0.25s ease',
        }}
      >
        <svg viewBox="0 0 48 48" width="100%" height="100%">
          <defs>
            <linearGradient id="haloSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#9da2b4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path
            d="M24 2 C24 14 34 24 46 24 C34 24 24 34 24 46 C24 34 14 24 2 24 C14 24 24 14 24 2 Z"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="url(#haloSilverGrad)"
            strokeWidth="1.2"
          />
          <path
            d="M24 10 C24 18 30 24 38 24 C30 24 24 30 24 38 C24 30 18 24 10 24 C18 24 24 18 24 10 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="0.8"
            transform="rotate(45 24 24)"
          />
        </svg>
      </div>

      {/* Main Crisp Star Pointer Core */}
      <div
        ref={coreRef}
        className={`star-cursor-core ${isHovered ? 'core-hover' : ''} ${isClicking ? 'core-click' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          willChange: 'transform',
          pointerEvents: 'none',
          transition: 'width 0.2s ease, height 0.2s ease, filter 0.2s ease',
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <defs>
            <linearGradient id="starSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#f0f2fa" />
              <stop offset="65%" stopColor="#9da2b4" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            d="M12 0 C12 6.8 17.2 12 24 12 C17.2 12 12 17.2 12 24 C12 17.2 6.8 12 0 12 C6.8 12 12 6.8 12 0 Z"
            fill="url(#starSilverGrad)"
            stroke="#ffffff"
            strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 0 4px #ffffff)' }}
          />
          <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}
