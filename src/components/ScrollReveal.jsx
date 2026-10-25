import { useEffect, useRef, useState } from 'react';

/**
 * Single-flow one-time scroll reveal component.
 * Once an element enters the viewport, it smoothly animates into place ONCE
 * and stays permanently revealed. It never re-triggers or disappears on scroll-up,
 * providing a stable, clean, and ultra-fluid single-flow experience.
 */
export default function ScrollReveal({
  children,
  className = '',
  style = {},
  delay = 0,
  distance = 24,
  duration = 0.55,
}) {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // If IntersectionObserver is not supported, reveal immediately
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ONE TIME ONLY: When the element scrolls into view, reveal it once and disconnect
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-box ${isRevealed ? 'is-revealed' : 'is-hidden'} ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isRevealed ? 'auto' : 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
