import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Zap, Award, Volume2, VolumeX } from './Icons';
import { sounds } from '../utils/soundEffects';

export default function ArcadeModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('rohit_arcade_highscore') || '0', 10);
  });
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameover, won
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // References to keep game loop running without React state lag
  const stateRef = useRef({
    score: 0,
    lives: 3,
    paddleX: 250,
    paddleWidth: 90,
    paddleHeight: 12,
    ballX: 300,
    ballY: 350,
    ballVx: 4,
    ballVy: -4,
    ballRadius: 7,
    bricks: [],
    particles: [],
    gameState: 'ready',
    canvasWidth: 600,
    canvasHeight: 460,
  });

  const initGame = () => {
    const s = stateRef.current;
    s.score = 0;
    s.lives = 3;
    s.ballX = s.canvasWidth / 2;
    s.ballY = s.canvasHeight - 60;
    s.ballVx = (Math.random() > 0.5 ? 1 : -1) * 4.5;
    s.ballVy = -4.5;
    s.paddleX = s.canvasWidth / 2 - s.paddleWidth / 2;
    s.particles = [];
    s.gameState = 'playing';

    // Generate bricks grid (4 rows x 8 cols)
    const rows = 4;
    const cols = 8;
    const padding = 8;
    const brickWidth = (s.canvasWidth - 40 - (cols - 1) * padding) / cols;
    const brickHeight = 18;
    const bricks = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: 20 + c * (brickWidth + padding),
          y: 50 + r * (brickHeight + padding),
          width: brickWidth,
          height: brickHeight,
          status: 1,
          color: r === 0 ? '#ffffff' : r === 1 ? '#d6dae8' : r === 2 ? '#9ca2ba' : '#696f88',
        });
      }
    }
    s.bricks = bricks;

    setScore(0);
    setLives(3);
    setGameState('playing');
    sounds.playChime();
  };

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const s = stateRef.current;
    s.canvasWidth = canvas.width;
    s.canvasHeight = canvas.height;
    s.paddleX = s.canvasWidth / 2 - s.paddleWidth / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      s.paddleX = Math.max(0, Math.min(s.canvasWidth - s.paddleWidth, mouseX - s.paddleWidth / 2));
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        s.paddleX = Math.max(0, Math.min(s.canvasWidth - s.paddleWidth, touchX - s.paddleWidth / 2));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Game Loop
    const loop = () => {
      ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < s.canvasWidth; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, s.canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y < s.canvasHeight; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(s.canvasWidth, y);
        ctx.stroke();
      }

      if (s.gameState === 'playing') {
        // Move Ball
        s.ballX += s.ballVx;
        s.ballY += s.ballVy;

        // Wall collisions
        if (s.ballX - s.ballRadius <= 0) {
          s.ballX = s.ballRadius;
          s.ballVx = Math.abs(s.ballVx);
          sounds.playBounce();
        } else if (s.ballX + s.ballRadius >= s.canvasWidth) {
          s.ballX = s.canvasWidth - s.ballRadius;
          s.ballVx = -Math.abs(s.ballVx);
          sounds.playBounce();
        }

        if (s.ballY - s.ballRadius <= 0) {
          s.ballY = s.ballRadius;
          s.ballVy = Math.abs(s.ballVy);
          sounds.playBounce();
        }

        // Bottom collision (Missed paddle)
        if (s.ballY + s.ballRadius >= s.canvasHeight) {
          s.lives -= 1;
          setLives(s.lives);

          if (s.lives <= 0) {
            s.gameState = 'gameover';
            setGameState('gameover');
            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem('rohit_arcade_highscore', s.score.toString());
            }
          } else {
            // Reset ball position
            s.ballX = s.canvasWidth / 2;
            s.ballY = s.canvasHeight - 60;
            s.ballVx = (Math.random() > 0.5 ? 1 : -1) * 4.5;
            s.ballVy = -4.5;
          }
        }

        // Paddle collision
        const paddleY = s.canvasHeight - 30;
        if (
          s.ballY + s.ballRadius >= paddleY &&
          s.ballY - s.ballRadius <= paddleY + s.paddleHeight &&
          s.ballX >= s.paddleX &&
          s.ballX <= s.paddleX + s.paddleWidth
        ) {
          s.ballVy = -Math.abs(s.ballVy);
          // Angle modifier depending on where ball hit paddle
          const hitPoint = (s.ballX - (s.paddleX + s.paddleWidth / 2)) / (s.paddleWidth / 2);
          s.ballVx = hitPoint * 5.5;
          sounds.playBounce();

          // Spawn paddle spark particles
          for (let i = 0; i < 6; i++) {
            s.particles.push({
              x: s.ballX,
              y: paddleY,
              vx: (Math.random() - 0.5) * 4,
              vy: -Math.random() * 3 - 1,
              radius: Math.random() * 2 + 1,
              alpha: 1,
            });
          }
        }

        // Brick collisions
        let remainingBricks = 0;
        s.bricks.forEach((b) => {
          if (b.status === 1) {
            remainingBricks++;
            if (
              s.ballX + s.ballRadius > b.x &&
              s.ballX - s.ballRadius < b.x + b.width &&
              s.ballY + s.ballRadius > b.y &&
              s.ballY - s.ballRadius < b.y + b.height
            ) {
              s.ballVy = -s.ballVy;
              b.status = 0;
              s.score += 10;
              setScore(s.score);
              sounds.playScore();

              // Spawn brick explosion particles
              for (let i = 0; i < 10; i++) {
                s.particles.push({
                  x: b.x + b.width / 2,
                  y: b.y + b.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  radius: Math.random() * 3 + 1,
                  alpha: 1,
                });
              }
            }
          }
        });

        if (remainingBricks === 0) {
          s.gameState = 'won';
          setGameState('won');
          sounds.playChime();
          if (s.score > highScore) {
            setHighScore(s.score);
            localStorage.setItem('rohit_arcade_highscore', s.score.toString());
          }
        }
      }

      // Render Bricks
      s.bricks.forEach((b) => {
        if (b.status === 1) {
          ctx.save();
          ctx.fillStyle = b.color;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.width, b.height, 4);
          ctx.fill();
          ctx.restore();
        }
      });

      // Render Paddle
      const paddleY = s.canvasHeight - 30;
      ctx.save();
      const paddleGrad = ctx.createLinearGradient(s.paddleX, 0, s.paddleX + s.paddleWidth, 0);
      paddleGrad.addColorStop(0, '#8c93a8');
      paddleGrad.addColorStop(0.5, '#ffffff');
      paddleGrad.addColorStop(1, '#8c93a8');
      ctx.fillStyle = paddleGrad;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.roundRect(s.paddleX, paddleY, s.paddleWidth, s.paddleHeight, 6);
      ctx.fill();
      ctx.restore();

      // Render Ball (Liquid Silver Orb)
      ctx.save();
      const ballGrad = ctx.createRadialGradient(s.ballX - 2, s.ballY - 2, 1, s.ballX, s.ballY, s.ballRadius);
      ballGrad.addColorStop(0, '#ffffff');
      ballGrad.addColorStop(0.6, '#d0d5e5');
      ballGrad.addColorStop(1, '#686e82');
      ctx.fillStyle = ballGrad;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Render Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        if (p.alpha <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSound = () => {
    const enabled = sounds.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(5, 5, 8, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '660px',
          backgroundColor: 'rgba(12, 12, 18, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '24px',
          padding: '1.75rem',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(220, 230, 255, 0.15)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 10px #ffffff',
              }}
            />
            <h3 className="font-display text-chrome" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              MERCURY BREAKER // ARCADE
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.45rem',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.45rem',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 1rem',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <div>
            <span style={{ color: 'var(--silver-muted)', marginRight: '0.5rem' }}>SCORE:</span>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>{score}</span>
          </div>

          <div>
            <span style={{ color: 'var(--silver-muted)', marginRight: '0.5rem' }}>HIGH SCORE:</span>
            <span style={{ color: 'var(--silver-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{highScore}</span>
          </div>

          <div>
            <span style={{ color: 'var(--silver-muted)', marginRight: '0.5rem' }}>LIVES:</span>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '2px' }}>
              {'● '.repeat(Math.max(0, lives))}
            </span>
          </div>
        </div>

        {/* Canvas Arena */}
        <div
          style={{
            position: 'relative',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: '#07070b',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{
              width: '100%',
              maxHeight: '400px',
              display: 'block',
              cursor: 'crosshair',
            }}
          />

          {/* Overlay Screen for Ready / Game Over / Won */}
          {gameState !== 'playing' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(8, 8, 12, 0.88)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              {gameState === 'ready' && (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <Zap size={36} style={{ color: '#ffffff', filter: 'drop-shadow(0 0 10px #ffffff)' }} />
                  </div>
                  <h4 className="font-display text-chrome" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    READY TO PLAY?
                  </h4>
                  <p style={{ color: 'var(--silver-secondary)', fontSize: '0.9rem', maxWidth: '360px', marginBottom: '1.5rem' }}>
                    Control the liquid silver paddle with your mouse or finger to bounce the mercury orb and destroy all cyber bricks!
                  </p>
                  <button onClick={initGame} className="btn-silver" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                    START GAME
                  </button>
                </>
              )}

              {gameState === 'gameover' && (
                <>
                  <h4 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    GAME OVER
                  </h4>
                  <p style={{ color: 'var(--silver-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    Final Score: <strong style={{ color: '#ffffff' }}>{score}</strong>
                  </p>
                  <button onClick={initGame} className="btn-silver" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                    PLAY AGAIN
                  </button>
                </>
              )}

              {gameState === 'won' && (
                <>
                  <Award size={36} style={{ color: '#ffffff', marginBottom: '0.5rem' }} />
                  <h4 className="font-display text-chrome" style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    VICTORY! ALL BRICKS CLEARED
                  </h4>
                  <p style={{ color: 'var(--silver-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    Outstanding reflex! Score: <strong style={{ color: '#ffffff' }}>{score}</strong>
                  </p>
                  <button onClick={initGame} className="btn-silver" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                    PLAY AGAIN
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer controls hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1rem',
            fontSize: '0.78rem',
            color: 'var(--silver-muted)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <span>DRAG MOUSE OR SLIDE TO MOVE PADDLE</span>
          <span>BUILT WITH NATIVE HTML5 CANVAS & WEB AUDIO</span>
        </div>
      </div>
    </div>
  );
}
