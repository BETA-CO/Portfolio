import { useEffect, useRef } from 'react';
import { sounds } from '../utils/soundEffects';

/**
 * ClickSparks: Spawns glowing liquid silver mercury droplets wherever the user clicks.
 * Droplets have physical velocity, gravity, elasticity, and specular sheen.
 */
export default function ClickSparks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClick = (e) => {
      // Play tactile click sound
      sounds.playClick();

      const x = e.clientX;
      const y = e.clientY;
      const count = 12;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 5 + 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          radius: Math.random() * 3.5 + 2,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          gravity: 0.15,
        });
      }
    };

    window.addEventListener('pointerdown', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;
        p.radius *= 0.98;

        if (p.alpha <= 0 || p.radius <= 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        // Liquid silver gradient for each drop
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, '#e0e5f2');
        grad.addColorStop(0.8, '#8c93a8');
        grad.addColorStop(1, 'rgba(50, 55, 70, 0.2)');

        ctx.fillStyle = grad;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999998,
      }}
    />
  );
}
