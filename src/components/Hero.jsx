import { useState, useEffect } from 'react';
import { ArrowDown, Code2, Terminal, Zap, Sparkles, ShieldCheck, ChevronRight } from './Icons';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const roles = portfolioData.personal.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFading(false);
      }, 350);
    }, 3200);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Background glow and subtle mesh */}
      <div className="flowing-grid" />
      <div
        className="liquid-spotlight"
        style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Monumental Headline */}
        <h1
          className="font-display hero-main-title"
          style={{
            fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          <span className="hero-title-line1" style={{ display: 'block', color: 'var(--silver-secondary)' }}>
            {portfolioData.personal.headline.line1}
          </span>
          <span className="text-chrome-animated hero-title-line2" style={{ display: 'block' }}>
            {portfolioData.personal.headline.highlight}
          </span>
          <span
            className="hero-title-line3"
            style={{
              display: 'block',
              color: '#ffffff',
              fontSize: 'clamp(1.75rem, 5.5vw, 5rem)',
              fontWeight: 700,
            }}
          >
            {portfolioData.personal.headline.line3}
          </span>
        </h1>

        {/* Dynamic Role Subtitle */}
        <div
          className="hero-role-wrapper"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            padding: '0.45rem 1.25rem',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px)',
            marginBottom: '2rem',
            maxWidth: '100%',
          }}
        >
          <span
            className="hero-role-label"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--silver-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            Specialization //
          </span>
          <span
            className="font-heading hero-role-title"
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#ffffff',
              textAlign: 'center',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              opacity: isFading ? 0.2 : 1,
              transform: isFading ? 'translateY(4px)' : 'translateY(0)',
            }}
          >
            {roles[currentRoleIndex]}
          </span>
        </div>

        {/* Philosophical elevator pitch */}
        <p
          className="hero-pitch"
          style={{
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            fontSize: '1.12rem',
            color: 'var(--silver-secondary)',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {portfolioData.personal.elevatorPitch}
        </p>

        {/* Call-to-Action Buttons */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '4.5rem',
          }}
        >
          <a href="#projects" className="btn-silver">
            <Zap size={18} />
            <span>Explore Work</span>
          </a>

          <a href="#contact" className="btn-outline-silver">
            <span>Direct Inquiries</span>
            <ChevronRight size={17} />
          </a>
        </div>

        {/* Metric Cards Showcase */}
        <ScrollReveal distance={20} duration={0.5}>
          <div
            className="hero-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              maxWidth: '1050px',
              margin: '0 auto',
            }}
          >
            {portfolioData.stats.map((item, idx) => {
              const icons = {
                Terminal: <Terminal size={18} style={{ color: '#ffffff' }} />,
                Code2: <Code2 size={18} style={{ color: '#ffffff' }} />,
                ShieldCheck: <ShieldCheck size={18} style={{ color: '#ffffff' }} />,
                Zap: <Zap size={18} style={{ color: '#ffffff' }} />,
              };
              return (
                <div
                  key={idx}
                  className="glass-panel hero-stats-card"
                  style={{
                    padding: '1.5rem',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle top silver highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <span
                      className="font-mono text-chrome hero-stats-metric"
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                      }}
                    >
                      {item.metric}
                    </span>
                    <div
                      className="hero-stats-icon-box"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {icons[item.iconType] || <Zap size={18} style={{ color: '#ffffff' }} />}
                    </div>
                  </div>
                  <h3
                    className="font-heading hero-stats-label"
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="hero-stats-sub"
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--silver-muted)',
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <div
          className="hero-scroll-indicator"
          style={{
            marginTop: '3.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0.6,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--silver-secondary)',
            }}
          >
            DESCENT INTO THE WORK
          </span>
          <div className="animate-float">
            <ArrowDown size={18} style={{ color: 'var(--silver-primary)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #hero {
            padding-top: 5rem !important;
            padding-bottom: 2.5rem !important;
            min-height: auto !important;
          }
          .hero-main-title {
            font-size: clamp(1.8rem, 7vw, 2.45rem) !important;
            margin-bottom: 0.85rem !important;
            letter-spacing: -0.02em !important;
            line-height: 1.15 !important;
          }
          .hero-title-line1 {
            font-size: clamp(1.1rem, 4.5vw, 1.45rem) !important;
            letter-spacing: 0.08em !important;
            color: var(--silver-secondary) !important;
            font-weight: 700 !important;
            margin-bottom: 0.25rem !important;
          }
          .hero-title-line2 {
            font-size: clamp(2rem, 8vw, 2.75rem) !important;
            font-weight: 800 !important;
            line-height: 1.08 !important;
          }
          .hero-title-line3 {
            font-size: clamp(1.15rem, 4.6vw, 1.55rem) !important;
            font-weight: 600 !important;
            margin-top: 0.35rem !important;
            color: #ffffff !important;
          }
          .hero-role-wrapper {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 0.4rem !important;
            padding: 0.35rem 0.85rem !important;
            margin-bottom: 1.25rem !important;
            max-width: 95% !important;
          }
          .hero-role-label {
            font-size: 0.75rem !important;
          }
          .hero-role-title {
            font-size: 0.88rem !important;
            color: #ffffff !important;
          }
          .hero-pitch {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1.75rem !important;
            padding: 0 0.25rem !important;
            max-width: 95% !important;
          }
          .hero-cta-group {
            flex-direction: row !important;
            width: 100% !important;
            align-items: center !important;
            gap: 0.65rem !important;
            max-width: 360px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 2.25rem !important;
          }
          .hero-cta-group a {
            flex: 1 !important;
            width: auto !important;
            padding: 0.75rem 0.6rem !important;
            font-size: 0.85rem !important;
            justify-content: center !important;
            min-height: 44px !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
            max-width: 360px !important;
          }
          .hero-stats-card {
            padding: 0.85rem 0.8rem !important;
            border-radius: 14px !important;
            min-height: 108px !important;
            display: flex !important;
            flex-direction: column !important;
            justifyContent: space-between !important;
          }
          .hero-stats-metric {
            font-size: 1.45rem !important;
            line-height: 1 !important;
          }
          .hero-stats-icon-box {
            width: 30px !important;
            height: 30px !important;
            border-radius: 8px !important;
          }
          .hero-stats-label {
            font-size: 0.82rem !important;
            line-height: 1.25 !important;
          }
          .hero-stats-sub {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
          }
          .hero-scroll-indicator {
            margin-top: 1.5rem !important;
          }
        }
        @media (max-width: 340px) {
          .hero-cta-group {
            flex-direction: column !important;
          }
          .hero-cta-group a {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
