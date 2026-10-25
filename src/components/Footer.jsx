import { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Terminal, Heart, Github, Linkedin, Twitter } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '4.5rem 0 3rem 0',
        backgroundColor: '#050508',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        zIndex: 10,
      }}
    >
      <div className="container-custom">
        {/* Top Tier: Logo & Back to top */}
        <div
          className="footer-top-tier"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffffff 0%, #8e93a6 50%, #050507 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#07070a',
                }}
              />
            </div>
            <div>
              <span className="font-display text-chrome" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {portfolioData.personal.name}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--silver-muted)',
                }}
              >
                MOBILE APP DEVELOPER & UI/UX DESIGNER
              </span>
            </div>
          </div>

          {/* Live System Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 8px #ffffff',
              }}
            />
            <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--silver-primary)' }}>
              LOCAL TIME // {time || 'SYNCHRONIZING...'}
            </span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="btn-outline-silver"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              minHeight: '40px',
            }}
          >
            <span>Ascend</span>
            <ArrowUp size={15} />
          </button>
        </div>

        {/* Middle Tier: Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            marginBottom: '2rem',
          }}
        >
          <div className="footer-nav-links" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#hero" style={{ color: 'var(--silver-muted)', textDecoration: 'none', fontSize: '0.88rem', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>
              Home
            </a>
            <a href="#projects" style={{ color: 'var(--silver-muted)', textDecoration: 'none', fontSize: '0.88rem', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>
              Projects
            </a>
            <a href="#education" style={{ color: 'var(--silver-muted)', textDecoration: 'none', fontSize: '0.88rem', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>
              Education
            </a>
            <a href="#contact" style={{ color: 'var(--silver-muted)', textDecoration: 'none', fontSize: '0.88rem', minHeight: '40px', display: 'inline-flex', alignItems: 'center' }}>
              Contact
            </a>
          </div>

          <div className="footer-social-links" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            {portfolioData.socials.map((s, idx) => {
              const icons = {
                Github: <Github size={16} />,
                Linkedin: <Linkedin size={16} />,
                Twitter: <Twitter size={15} />,
              };
              return (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--silver-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--silver-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  title={s.name}
                >
                  {icons[s.iconType] || <Github size={16} />}
                </a>
              );
            })}
          </div>

          <span className="font-mono footer-meta-line" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
            MUMBAI, INDIA • BUILT FOR EVERYDAY UTILITY
          </span>
        </div>

        {/* Bottom Tier: Legal & Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--silver-muted)',
          }}
        >
          <p>© 2026 {portfolioData.personal.name}. All Rights Reserved. Sculpted in Obsidian & Liquid Silver.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Constructed with React 19 & Fluid Canvas Physics</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer {
            padding: 2.5rem 0 2rem 0 !important;
          }
          .footer-top-tier {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.15rem !important;
            margin-bottom: 1.75rem !important;
          }
          .footer-nav-links {
            gap: 0.85rem !important;
          }
          .footer-meta-line {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
