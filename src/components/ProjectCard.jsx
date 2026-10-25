import { Eye, ArrowUpRight, Github, Sparkles } from './Icons';
import ScrollReveal from './ScrollReveal';

export default function ProjectCard({ project, index, onSelect }) {
  return (
    <ScrollReveal delay={(index % 3) * 0.08} distance={24} duration={0.45}>
      <div
        className="glass-panel clean-project-card"
        onClick={() => onSelect(project)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          cursor: 'pointer',
          height: '100%',
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
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          }}
        />

        {/* Top Content */}
        <div>
          {/* Header Row: Category & Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.74rem',
                letterSpacing: '0.08em',
                color: 'var(--silver-muted)',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span className="silver-radar-dot" style={{ width: '5px', height: '5px' }} />
              {project.category}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--silver-bright)',
                letterSpacing: '0.04em',
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display project-card-title"
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          {/* Tagline */}
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--silver-secondary)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
            }}
          >
            {project.tagline}
          </p>

          {/* Architectural Metric Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.95rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--silver-bright)', flexShrink: 0 }} />
            <span
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: '#ffffff',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {project.metric}
            </span>
          </div>

          {/* Tech Stack Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              marginBottom: '1.75rem',
            }}
          >
            {project.technologies.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="font-mono"
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--silver-muted)',
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span
                className="font-mono"
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.5rem',
                  color: 'var(--silver-bright)',
                }}
              >
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="project-card-footer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.25rem',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="project-inspect-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              padding: '0.4rem 0',
              minHeight: '44px',
            }}
          >
            <Eye size={16} />
            <span>Inspect Architecture</span>
          </button>

          <div className="project-card-links" style={{ display: 'flex', gap: '0.55rem', flexShrink: 0 }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                title={project.liveUrlLabel || 'Live Deployment'}
              >
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                title={project.githubLabel || 'Source Repository'}
              >
                <Github size={16} />
              </a>
            )}
            {project.secondaryGithubUrl && (
              <a
                href={project.secondaryGithubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                title={project.secondaryGithubLabel || 'Secondary Repository'}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .clean-project-card {
            padding: 1.25rem 1.05rem !important;
            border-radius: 18px !important;
          }
          .project-card-title {
            font-size: clamp(1.2rem, 5vw, 1.35rem) !important;
            line-height: 1.25 !important;
            margin-bottom: 0.5rem !important;
            letter-spacing: -0.01em !important;
          }
          .project-card-footer {
            padding-top: 1rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 0.5rem !important;
          }
          .project-inspect-btn {
            font-size: 0.82rem !important;
            padding: 0.45rem 0.75rem !important;
            border-radius: 8px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            min-height: 38px !important;
            white-space: nowrap !important;
          }
          .project-card-links a {
            width: 36px !important;
            height: 36px !important;
            border-radius: 8px !important;
          }
        }
      `}</style>
    </ScrollReveal>
  );
}
