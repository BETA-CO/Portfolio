import { GraduationCap, MapPin, CheckCircle2, Calendar } from './Icons';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Education() {
  const educationList = portfolioData.education || [];

  return (
    <section
      id="education"
      style={{
        position: 'relative',
        padding: '7rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        scrollMarginTop: '80px',
      }}
    >
      <div className="container-custom" style={{ maxWidth: '1100px' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '4.5rem', textAlign: 'center' }} className="education-header">
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                letterSpacing: '0.04em',
              }}
            >
              <GraduationCap size={16} />
              <span>Academic Background</span>
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            ACADEMIC <span className="text-chrome">JOURNEY</span>
          </h2>

          <p
            style={{
              maxWidth: '580px',
              margin: '1rem auto 0 auto',
              color: 'var(--silver-secondary)',
              fontSize: '1.08rem',
              lineHeight: 1.6,
            }}
          >
            Chronological academic progression from schooling to polytechnic diploma and current engineering studies.
          </p>
        </div>

        {/* Spacious Chronological Matrix (Past to Current) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            position: 'relative',
          }}
        >
          {educationList.map((edu, idx) => {
            const isCurrent = edu.status === 'Currently Studying';
            return (
              <ScrollReveal key={edu.id || idx} delay={idx * 0.12} distance={25} duration={0.45}>
                <div
                  className={`education-row-card glass-panel ${isCurrent ? 'edu-card-current' : ''}`}
                  style={{
                    padding: '2.4rem 2.6rem',
                    borderRadius: '24px',
                    position: 'relative',
                    border: isCurrent
                      ? '1px solid rgba(255, 255, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isCurrent
                      ? 'linear-gradient(135deg, rgba(24, 24, 36, 0.9) 0%, rgba(12, 12, 18, 0.95) 100%)'
                      : 'rgba(14, 14, 20, 0.75)',
                    boxShadow: isCurrent
                      ? '0 16px 45px -8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.08)'
                      : '0 8px 30px -5px rgba(0, 0, 0, 0.5)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(180px, 220px) 1fr minmax(200px, 240px)',
                    alignItems: 'center',
                    gap: '2rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Left Column: Step & Timeline Year */}
                  <div className="edu-col-step" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        className="font-display text-chrome edu-step-num"
                        style={{
                          fontSize: '2.5rem',
                          fontWeight: 800,
                          lineHeight: 1,
                        }}
                      >
                        {edu.step}
                      </span>
                      <span
                        className="edu-step-badge"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: isCurrent ? '#ffffff' : 'var(--silver-muted)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          background: isCurrent
                            ? 'rgba(255, 255, 255, 0.15)'
                            : 'rgba(255, 255, 255, 0.04)',
                          border: isCurrent
                            ? '1px solid rgba(255, 255, 255, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        {isCurrent && (
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#ffffff',
                              boxShadow: '0 0 6px #ffffff',
                            }}
                          />
                        )}
                        {isCurrent ? 'CURRENT' : `STAGE ${edu.step}`}
                      </span>
                    </div>

                    <div
                      className="edu-timeline"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.9rem',
                        color: isCurrent ? '#ffffff' : 'var(--silver-secondary)',
                        fontWeight: 500,
                      }}
                    >
                      <Calendar size={15} style={{ opacity: 0.8 }} />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Middle Column: Qualification & Institution */}
                  <div className="edu-col-main" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3
                      className="font-heading edu-course-title"
                      style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {edu.course}
                    </h3>

                    <div
                      className="edu-school-line"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        fontSize: '1.05rem',
                        color: 'var(--silver-primary)',
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ color: '#ffffff' }}>{edu.institution}</span>
                      <span style={{ color: 'var(--silver-muted)' }}>•</span>
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--silver-muted)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <MapPin size={13} style={{ opacity: 0.7 }} />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Score / Status Badge */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      textAlign: 'right',
                      paddingLeft: '1.5rem',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    className="education-score-col"
                  >
                    <div className="education-score-wrap">
                      <div
                        className="font-display text-chrome education-score-num"
                        style={{
                          fontSize: edu.score.includes('%') ? '3rem' : '2.2rem',
                          fontWeight: 800,
                          lineHeight: 1,
                          marginBottom: '0.35rem',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {edu.score}
                      </div>

                      <div
                        className="education-score-lbl"
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--silver-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                          marginBottom: '0.65rem',
                        }}
                      >
                        {edu.scoreLabel}
                      </div>
                    </div>

                    <span
                      className="edu-status-pill"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '0.28rem 0.85rem',
                        borderRadius: '9999px',
                        color: isCurrent ? '#ffffff' : '#a0a6b8',
                        background: isCurrent
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(255, 255, 255, 0.04)',
                        border: isCurrent
                          ? '1px solid rgba(255, 255, 255, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {isCurrent ? (
                        <span
                          style={{
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 0 8px #ffffff',
                          }}
                        />
                      ) : (
                        <CheckCircle2 size={13} style={{ color: '#ffffff' }} />
                      )}
                      {edu.status}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Responsive layout styles for mobile & tablet */}
      <style>{`
        @media (max-width: 860px) {
          #education {
            padding: 4.5rem 0 3.5rem 0 !important;
            scroll-margin-top: 80px !important;
          }
          .education-header {
            margin-bottom: 2.5rem !important;
          }
          #education h2 {
            font-size: clamp(1.65rem, 6vw, 2.4rem) !important;
            line-height: 1.15 !important;
          }
          #education p {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
          }
          .education-row-card {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
            padding: 1.35rem 1.15rem !important;
            border-radius: 18px !important;
            gap: 0.9rem !important;
            text-align: left !important;
            align-items: stretch !important;
          }
          .edu-col-step {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            padding-bottom: 0.55rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
          }
          .edu-step-num {
            display: none !important;
          }
          .edu-step-badge {
            font-size: 0.72rem !important;
            padding: 0.2rem 0.55rem !important;
          }
          .edu-timeline {
            font-size: 0.8rem !important;
          }
          .edu-col-main {
            gap: 0.35rem !important;
            text-align: left !important;
          }
          .edu-course-title {
            font-size: 1.18rem !important;
            line-height: 1.25 !important;
            text-align: left !important;
          }
          .edu-school-line {
            font-size: 0.88rem !important;
            gap: 0.35rem !important;
            text-align: left !important;
            color: var(--silver-secondary) !important;
          }
          .education-score-col {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-left: 0 !important;
            padding-top: 0.85rem !important;
            margin-top: 0.15rem !important;
            width: 100% !important;
            gap: 0.75rem !important;
            flex-wrap: wrap !important;
          }
          .education-score-wrap {
            display: flex !important;
            flex-direction: row !important;
            align-items: baseline !important;
            gap: 0.45rem !important;
            flex-shrink: 0 !important;
          }
          .education-score-num {
            font-size: 1.45rem !important;
            line-height: 1 !important;
            margin-bottom: 0 !important;
            font-weight: 800 !important;
          }
          .education-score-lbl {
            font-size: 0.75rem !important;
            margin-bottom: 0 !important;
            font-family: var(--font-mono) !important;
          }
          .edu-status-pill {
            font-size: 0.74rem !important;
            padding: 0.25rem 0.65rem !important;
            flex-shrink: 0 !important;
          }
        }
        @media (max-width: 360px) {
          .education-score-col {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
