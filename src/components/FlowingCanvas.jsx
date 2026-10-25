import { useEffect, useRef } from 'react';

export default function FlowingCanvas({
  waveSpeed = 0.008,
  waveAmplitude = 45,
  waveCount = 5,
  particleCount = 40,
  silverIntensity = 1,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 220 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initialize floating silver particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      time += waveSpeed;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Dark obsidian clear with subtle trail
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Radial mouse glow in silver
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const mouseGradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius
        );
        mouseGradient.addColorStop(0, `rgba(235, 240, 255, ${0.08 * silverIntensity})`);
        mouseGradient.addColorStop(0.5, `rgba(180, 190, 215, ${0.03 * silverIntensity})`);
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw flowing liquid silver waves
      const waves = [
        { yOffset: height * 0.35, freq: 0.0016, speedMult: 1.0, ampMult: 1.1, baseAlpha: 0.07 },
        { yOffset: height * 0.48, freq: 0.0022, speedMult: 1.3, ampMult: 0.9, baseAlpha: 0.09 },
        { yOffset: height * 0.62, freq: 0.0019, speedMult: 0.8, ampMult: 1.3, baseAlpha: 0.06 },
        { yOffset: height * 0.78, freq: 0.0028, speedMult: 1.5, ampMult: 0.7, baseAlpha: 0.08 },
        { yOffset: height * 0.90, freq: 0.0012, speedMult: 0.9, ampMult: 1.0, baseAlpha: 0.05 },
      ].slice(0, waveCount);

      waves.forEach((w, index) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 12) {
          // Calculate wave height using multi-frequency sines
          const sin1 = Math.sin(x * w.freq + time * w.speedMult);
          const sin2 = Math.cos(x * (w.freq * 1.8) - time * 0.8);
          let y = w.yOffset + (sin1 + sin2 * 0.4) * (waveAmplitude * w.ampMult);

          // Displace by mouse proximity
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const influence = (1 - dist / mouseRef.current.radius) * 35;
            y += Math.sin(dist * 0.04 - time * 2) * influence;
          }

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Silver metallic gradient for each wave layer
        const waveGradient = ctx.createLinearGradient(0, w.yOffset - waveAmplitude, width, height);
        const alpha = w.baseAlpha * silverIntensity;
        waveGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 1.5})`);
        waveGradient.addColorStop(0.3, `rgba(200, 208, 228, ${alpha})`);
        waveGradient.addColorStop(0.7, `rgba(120, 126, 145, ${alpha * 0.5})`);
        waveGradient.addColorStop(1, 'rgba(5, 5, 7, 0.0)');

        ctx.fillStyle = waveGradient;
        ctx.fill();

        // Chrome specular line edge
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const sin1 = Math.sin(x * w.freq + time * w.speedMult);
          const sin2 = Math.cos(x * (w.freq * 1.8) - time * 0.8);
          let y = w.yOffset + (sin1 + sin2 * 0.4) * (waveAmplitude * w.ampMult);

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const influence = (1 - dist / mouseRef.current.radius) * 35;
            y += Math.sin(dist * 0.04 - time * 2) * influence;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineWidth = index % 2 === 0 ? 1.5 : 0.8;
        ctx.strokeStyle = `rgba(240, 245, 255, ${alpha * 2.2})`;
        ctx.stroke();
      });

      // Render floating silver embers / dust
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        // Slight drift towards mouse if close
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        const currentOpacity = p.opacity + Math.sin(time * 2 + p.x) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 240, 255, ${Math.max(0.1, currentOpacity * silverIntensity)})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [waveSpeed, waveAmplitude, waveCount, particleCount, silverIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
