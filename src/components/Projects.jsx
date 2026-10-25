import { useState } from 'react';
import { Sparkles } from './Icons';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = portfolioData.projects;
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        position: 'relative',
        paddingTop: '8.5rem',
        paddingBottom: '7rem',
        scrollMarginTop: '110px',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal distance={20} duration={0.5}>
          <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <span className="silver-badge">
                <Sparkles size={14} />
                Production Systems & Utilities
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              CURATED <span className="text-chrome">MASTERPIECES</span>
            </h2>
            <p
              style={{
                maxWidth: '640px',
                margin: '1.15rem auto 0 auto',
                color: 'var(--silver-secondary)',
                fontSize: '1.08rem',
                lineHeight: 1.6,
              }}
            >
              Real-world mobile apps, cross-platform messengers, wireless macro engines, and client enterprise portals built for everyday utility.
            </p>

            {/* Filter Bar */}
            <div
              className="projects-filter-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                flexWrap: 'wrap',
                marginTop: '2.5rem',
              }}
            >
              {categories.map((cat) => {
                const isSelected = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="projects-filter-btn"
                    style={{
                      padding: '0.6rem 1.35rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected ? '#07070a' : 'var(--silver-secondary)',
                      background: isSelected
                        ? 'linear-gradient(135deg, #ffffff 0%, #d8dce8 100%)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isSelected ? '0 0 22px rgba(255, 255, 255, 0.4)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      minHeight: '38px',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid with Staggered Bidirectional Flow */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))',
            gap: '2.25rem',
          }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Deep Dive Project Modal with React Portal and Complete Screen Visibility */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .projects-section {
            padding-top: 4.5rem !important;
            padding-bottom: 3.5rem !important;
          }
          .projects-section h2 {
            font-size: clamp(1.65rem, 6vw, 2.5rem) !important;
            line-height: 1.15 !important;
          }
          .projects-section p {
            font-size: 0.92rem !important;
            line-height: 1.55 !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 1.15rem !important;
          }
          .projects-filter-bar {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            gap: 0.5rem !important;
            padding: 4px 0.5rem 10px 0.5rem !important;
            margin: 1.5rem -0.5rem 0 -0.5rem !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
          }
          .projects-filter-bar::-webkit-scrollbar {
            display: none !important;
          }
          .projects-filter-btn {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 0.45rem 1rem !important;
            font-size: 0.8rem !important;
            min-height: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
