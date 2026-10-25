import { Code, Globe, Cpu, Sparkles, Shield, Rocket, Quote } from './Icons';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  const iconMap = {
    Globe: <Globe size={26} style={{ color: '#ffffff' }} />,
    Sparkles: <Sparkles size={26} style={{ color: '#ffffff' }} />,
    Cpu: <Cpu size={26} style={{ color: '#ffffff' }} />,
    Shield: <Shield size={26} style={{ color: '#ffffff' }} />,
  };

  const services = portfolioData.services.map((s) => ({
    ...s,
    icon: iconMap[s.iconType] || <Globe size={26} style={{ color: '#ffffff' }} />,
  }));

  const testimonials = portfolioData.testimonials;

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        padding: '7rem 0',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="silver-badge">
              <Rocket size={14} />
              Elite Capabilities
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
            SERVICES OF <span className="text-chrome">DISTINCTION</span>
          </h2>
          <p
            style={{
              maxWidth: '620px',
              margin: '1rem auto 0 auto',
              color: 'var(--silver-secondary)',
              fontSize: '1.05rem',
            }}
          >
            Specialized engineering and design practices tailored for visionary leaders and ambitious ventures.
          </p>
        </div>

        {/* 4-Card Service Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem',
          }}
        >
          {services.map((srv, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.12} distance={38} parallaxFactor={0.02}>
              <div
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />

              <div>
                {/* Icon box */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                >
                  {srv.icon}
                </div>

                <h3
                  className="font-heading"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.35rem',
                  }}
                >
                  {srv.title}
                </h3>
                <h4
                  className="font-mono"
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--silver-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  {srv.subtitle}
                </h4>

                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--silver-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '1.75rem',
                  }}
                >
                  {srv.description}
                </p>
              </div>

              {/* Deliverables list */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.25rem',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--silver-muted)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.65rem',
                  }}
                >
                  Signature Deliverables
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {srv.deliverables.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.84rem',
                        color: 'var(--silver-bright)',
                      }}
                    >
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                        }}
                      />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>

        {/* Endorsements / Testimonials Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3
            className="font-display text-chrome"
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
            }}
          >
            VERIFIED ENDORSEMENTS
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                position: 'relative',
              }}
            >
              <Quote
                size={28}
                style={{
                  color: 'rgba(255, 255, 255, 0.2)',
                  marginBottom: '1rem',
                }}
              />
              <p
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--silver-primary)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem',
                }}
              >
                "{t.quote}"
              </p>
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1rem',
                }}
              >
                <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>{t.author}</h4>
                <p style={{ color: 'var(--silver-muted)', fontSize: '0.8rem' }}>
                  {t.role} • {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
