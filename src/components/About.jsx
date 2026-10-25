import { useState } from 'react';
import { Layers, Cpu, Compass, CheckCircle2, Flame, Award, Globe } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('creative');
  const skillCategories = portfolioData.about.categories;

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '7rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="silver-badge">
              <Compass size={14} />
              Philosophy & Capabilities
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
            THE ART OF <span className="text-chrome">OBSIDIAN ENGINEERING</span>
          </h2>
          <p
            style={{
              maxWidth: '650px',
              margin: '1rem auto 0 auto',
              color: 'var(--silver-secondary)',
              fontSize: '1.05rem',
            }}
          >
            Where uncompromising computational rigor meets kinetic liquid beauty.
          </p>
        </div>

        {/* 2-Column Grid: Philosophy Narrative & Interactive Skills Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Narrative Card */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'var(--chrome-gradient)',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={22} style={{ color: '#ffffff' }} />
              </div>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                  {portfolioData.about.philosophyTitle}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--silver-muted)' }}>
                  {portfolioData.about.philosophySubtitle}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--silver-primary)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1rem' }}>
              {portfolioData.about.narrativeP1}
            </p>

            <p style={{ color: 'var(--silver-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.96rem' }}>
              {portfolioData.about.narrativeP2}
            </p>

            {/* Core Tenets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {portfolioData.about.tenets.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.85rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#ffffff', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 600 }}>{item.title}</h4>
                    <p style={{ color: 'var(--silver-muted)', fontSize: '0.84rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Skills Matrix */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
            }}
          >
            {/* Category Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.3rem',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1.75rem',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'creative', label: 'Creative & UI' },
                { id: 'backend', label: 'Cloud & API' },
                { id: 'architecture', label: 'Systems & Perf' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    minWidth: '100px',
                    padding: '0.6rem 0.8rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? '#ffffff' : 'var(--silver-muted)',
                    background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                    boxShadow: activeTab === tab.id ? '0 0 15px rgba(255, 255, 255, 0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--silver-secondary)', marginBottom: '1.5rem' }}>
              {skillCategories[activeTab].description}
            </p>

            {/* Dynamic Animated Skill Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {skillCategories[activeTab].skills.map((skill, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.45rem',
                    }}
                  >
                    <span style={{ fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>{skill.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--silver-muted)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {skill.tag}
                      </span>
                      <span className="font-mono text-chrome" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Flowing liquid progress track */}
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #6e7284 0%, #d8dbe5 60%, #ffffff 100%)',
                        borderRadius: '9999px',
                        boxShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
