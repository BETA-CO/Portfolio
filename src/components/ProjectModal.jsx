import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Github, Layers, Zap, CheckCircle2, Cpu, Copy, Check, Terminal, Sparkles } from './Icons';

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Save previous body overflow and lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    const shareUrl = project.liveUrl || project.githubUrl || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalContent = (
    <div
      className="modal-overlay-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999, // Unconditionally above the navbar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.25rem',
        backgroundColor: 'rgba(3, 3, 6, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflowY: 'auto',
        animation: 'modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel modal-card-content"
        style={{
          width: '100%',
          maxWidth: '860px',
          backgroundColor: 'rgba(12, 13, 20, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          margin: 'auto 0',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(220, 230, 255, 0.12)',
          animation: 'modalSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle liquid chrome highlight at top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          }}
        />

        {/* Top Header Utility Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span className="silver-badge" style={{ fontSize: '0.72rem' }}>
              <span className="silver-radar-dot" style={{ width: '6px', height: '6px' }} />
              {project.category}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--silver-bright)',
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Action buttons (Share & Close) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                background: copied ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Copy Project Link"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Project Title */}
        <h2
          className="font-display text-chrome"
          style={{
            fontSize: 'clamp(1.6rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </h2>

        {/* Project Tagline */}
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--silver-primary)',
            fontWeight: 400,
            marginBottom: '1.75rem',
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>

        {/* Navigation Tabs */}
        <div
          className="modal-nav-tabs"
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.75rem',
            marginBottom: '1.75rem',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {[
            { id: 'architecture', label: 'System Architecture', icon: Cpu },
            { id: 'innovations', label: 'Key Innovations', icon: Zap },
            { id: 'stack', label: 'Tech Arsenal', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  background: isTabActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  border: isTabActive ? '1px solid #ffffff' : '1px solid transparent',
                  color: isTabActive ? '#ffffff' : 'var(--silver-muted)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.84rem',
                  fontWeight: isTabActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: System Architecture Breakdown */}
        {activeTab === 'architecture' && (
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1.5rem',
              }}
            >
              <h3
                className="font-heading"
                style={{
                  fontSize: '1.15rem',
                  color: '#ffffff',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Cpu size={18} style={{ color: '#ffffff' }} />
                Architectural Engineering & Data Flow
              </h3>
              <p style={{ color: 'var(--silver-secondary)', lineHeight: 1.8, fontSize: '0.96rem', marginBottom: '1.25rem' }}>
                {project.longDescription}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1rem',
                  marginTop: '1.25rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>
                    CLIENT INTERACTION
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--silver-secondary)', lineHeight: 1.5 }}>
                    Zero-latency UI updates designed for mobile touch screens and desktop peripherals.
                  </p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>
                    PERSISTENCE & SYNC
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--silver-secondary)', lineHeight: 1.5 }}>
                    Offline-first SQLite/SharedPreferences caching combined with real-time cloud data pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Key Innovations */}
        {activeTab === 'innovations' && (
          <div style={{ marginBottom: '2rem' }}>
            <h3
              className="font-heading"
              style={{
                fontSize: '1.15rem',
                color: '#ffffff',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Zap size={18} style={{ color: '#ffffff' }} />
              Validated Innovations & Engineering Feats
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.15rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: '#ffffff' }} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--silver-primary)', lineHeight: 1.5 }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Technology Arsenal */}
        {activeTab === 'stack' && (
          <div style={{ marginBottom: '2rem' }}>
            <h3
              className="font-heading"
              style={{
                fontSize: '1.15rem',
                color: '#ffffff',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Layers size={18} style={{ color: '#ffffff' }} />
              Technology Arsenal & Toolchain
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {project.technologies.map((tech, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span className="silver-radar-dot" style={{ width: '4px', height: '4px' }} />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Action Buttons */}
        <div
          className="modal-footer-actions"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-silver"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={16} />
              <span>{project.liveUrlLabel || 'Launch Live Deployment'}</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-silver"
              style={{ textDecoration: 'none' }}
            >
              <Github size={16} />
              <span>{project.githubLabel || 'Inspect Repository'}</span>
            </a>
          )}
          {project.secondaryGithubUrl && (
            <a
              href={project.secondaryGithubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-silver"
              style={{ textDecoration: 'none' }}
            >
              <Github size={16} />
              <span>{project.secondaryGithubLabel || 'Desktop / Web Repo'}</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .modal-overlay-backdrop {
            padding: 1rem 0.65rem !important;
          }
          .modal-card-content {
            padding: 1.35rem 1rem !important;
            border-radius: 18px !important;
          }
          .modal-nav-tabs {
            overflow-x: auto !important;
            padding-bottom: 0.5rem !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .modal-nav-tabs::-webkit-scrollbar {
            display: none !important;
          }
          .modal-footer-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
          }
          .modal-footer-actions a {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
