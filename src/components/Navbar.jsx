import { useState, useEffect } from 'react';
import { Menu, X } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className="navbar-header"
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
      }}
    >
      <nav
        className="navbar-capsule"
        style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '9999px',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.94)'
            : 'rgba(14, 14, 20, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: scrolled
            ? '0 14px 40px -5px rgba(0, 0, 0, 0.9), 0 0 28px rgba(220, 230, 255, 0.09)'
            : '0 6px 26px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            className="navbar-logo-orb"
            style={{
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff 0%, #8c909e 50%, #15161c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(255, 255, 255, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              flexShrink: 0,
            }}
          >
            <div
              className="navbar-logo-core"
              style={{
                borderRadius: '50%',
                backgroundColor: '#070709',
                boxShadow: 'inset 0 0 5px #ffffff',
              }}
            />
          </div>
          <span
            className="font-display text-chrome navbar-brand-name"
            style={{
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            {portfolioData.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.68rem 1.55rem',
                  fontSize: '1.02rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--silver-secondary)',
                  background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.26)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.15)' : 'none',
                  lineHeight: 1,
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '44px',
            minHeight: '44px',
          }}
          className="mobile-hamburger"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 48,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '3.6rem',
              left: '0.65rem',
              right: '0.65rem',
              background: 'rgba(12, 13, 20, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '20px',
              padding: '1rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 35px rgba(220, 230, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 49,
              animation: 'modalSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '0.75rem 1.15rem',
                    fontSize: '0.98rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#ffffff' : 'var(--silver-secondary)',
                    background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '44px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 8px #ffffff',
                      }}
                    />
                  )}
                </a>
              );
            })}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                marginTop: '0.3rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--silver-muted)', fontFamily: 'var(--font-mono)' }}>
                MUMBAI, INDIA (IST)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                OPEN TO ROLES
              </span>
            </div>
          </div>
        </>
      )}

      {/* Inline styles for media queries */}
      <style>{`
        @media (min-width: 821px) {
          .navbar-capsule {
            padding: 9px 9px 9px 24px !important;
          }
          .navbar-logo-orb {
            width: 42px !important;
            height: 42px !important;
          }
          .navbar-logo-core {
            width: 15px !important;
            height: 15px !important;
          }
          .navbar-brand-name {
            font-size: 1.45rem !important;
          }
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 820px) {
          .navbar-header {
            top: 0.65rem !important;
            padding: 0 0.65rem !important;
          }
          .navbar-capsule {
            padding: 6px 12px 6px 14px !important;
          }
          .navbar-logo-orb {
            width: 30px !important;
            height: 30px !important;
          }
          .navbar-logo-core {
            width: 10px !important;
            height: 10px !important;
          }
          .navbar-brand-name {
            font-size: 1.05rem !important;
            letter-spacing: 0.05em !important;
          }
          .desktop-nav { display: none !important; }
          .mobile-hamburger {
            display: flex !important;
            min-width: 40px !important;
            min-height: 40px !important;
            padding: 0.35rem !important;
          }
        }
      `}</style>
    </header>
  );
}
