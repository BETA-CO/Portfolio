import { Briefcase, Calendar, MapPin, Award } from './Icons';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '7rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="silver-badge">
              <Briefcase size={14} />
              Chronology & Milestones
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            TRAJECTORY & <span className="text-chrome">IMPACT</span>
          </h2>
          <p
            style={{
              maxWidth: '620px',
              margin: '1rem auto 0 auto',
              color: 'var(--silver-secondary)',
              fontSize: '1.05rem',
            }}
          >
            A consistent record of engineering leadership, precision architectures, and award-winning execution.
          </p>
        </div>

        {/* Timeline Container */}
        <div
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            paddingLeft: '2rem',
          }}
        >
          {/* Flowing liquid silver spine */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              bottom: '1rem',
              left: '7px',
              width: '2px',
              background: 'linear-gradient(180deg, #ffffff 0%, #8c909e 50%, rgba(255, 255, 255, 0.1) 100%)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experiences.map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} distance={20} duration={0.5}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                {/* Mercury Node dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '1.5rem',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '3px solid #070709',
                    boxShadow: '0 0 14px #ffffff, 0 0 25px rgba(255, 255, 255, 0.6)',
                  }}
                />

                {/* Experience Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top metadata */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.82rem',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <Calendar size={14} style={{ color: 'var(--silver-secondary)' }} />
                        {exp.period}
                      </span>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--silver-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        color: '#ffffff',
                      }}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  {/* Role Title & Company */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <h4
                    style={{
                      fontSize: '1rem',
                      color: 'var(--silver-secondary)',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    {exp.company}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.96rem',
                      color: 'var(--silver-primary)',
                      lineHeight: 1.7,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {exp.achievements.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                          fontSize: '0.9rem',
                          color: 'var(--silver-secondary)',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#ffffff',
                            marginTop: '8px',
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'var(--silver-muted)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
