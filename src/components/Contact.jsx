import { useState } from 'react';
import { Mail, Copy, Check, Send, MessageSquare, Github, Linkedin, Twitter, ExternalLink, ArrowUpRight } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitNotice, setSubmitNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mobile App Development (Flutter / Android)',
    budget: 'Internship / Full-time Role',
    message: '',
  });

  const emailAddress = portfolioData.personal.email;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    `Portfolio Inquiry: ${formData.projectType}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nTopic: ${formData.projectType}\nEngagement: ${formData.budget}\n\nMessage:\n${formData.message || ''}`
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setSubmitError('');
    setSubmitNotice('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
          'Service / Topic': formData.projectType,
          'Engagement Type': formData.budget,
          Message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormSubmitted(true);
        if (result.message && result.message.toLowerCase().includes('activation')) {
          setSubmitNotice('activation_needed');
        } else {
          setSubmitNotice('delivered');
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit request failed, providing fallback:', err);
      // If adblocker or network blocked the request, allow instant mailto fallback
      setSubmitError('Network or browser prevented automatic dispatch. Click below to send directly via your email app.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '7rem 0 5rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        scrollMarginTop: '80px',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="silver-badge">
              <MessageSquare size={14} />
              Get In Touch
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            LET’S WORK <span className="text-chrome">TOGETHER</span>
          </h2>
          <p
            style={{
              maxWidth: '600px',
              margin: '1rem auto 0 auto',
              color: 'var(--silver-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            Have a question, an opportunity, or a project in mind? My inbox is always open.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Left Column: Direct Info Card */}
          <div
            className="glass-panel contact-info-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              borderRadius: '20px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <span className="silver-radar-dot" />
                <span className="font-mono" style={{ fontSize: '0.8rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>

              <h3 className="font-heading" style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.75rem' }}>
                Let’s Connect
              </h3>
              <p style={{ color: 'var(--silver-secondary)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
                I’m currently open to software developer roles, internships, and freelance projects. Feel free to copy my
                email directly or send a message using the form.
              </p>

              {/* Copyable Email Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', minWidth: 0 }}>
                  <Mail size={18} style={{ color: '#ffffff', flexShrink: 0 }} />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--silver-bright)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  style={{
                    background: copied ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                  title="Copy email address"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Status details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--silver-muted)' }}>Response Time</span>
                  <span className="font-mono" style={{ color: '#ffffff' }}>Within 24 Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--silver-muted)' }}>Location</span>
                  <span className="font-mono" style={{ color: '#ffffff' }}>Mumbai, India (IST)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--silver-muted)' }}>Status</span>
                  <span className="font-mono text-chrome" style={{ fontWeight: 600 }}>Open to Roles & Projects</span>
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--silver-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.04em',
                }}
              >
                Find Me Online
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {portfolioData.socials.map((s, i) => {
                  const icons = {
                    Github: <Github size={18} />,
                    Linkedin: <Linkedin size={18} />,
                    Twitter: <Twitter size={17} />,
                  };
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'var(--silver-bright)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--silver-bright)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      title={s.name}
                    >
                      {icons[s.iconType] || <Github size={18} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="glass-panel contact-form-card"
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              position: 'relative',
            }}
          >
            {formSubmitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #8c909e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#07070a',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Check size={32} />
                </div>

                {submitNotice === 'activation_needed' ? (
                  <>
                    <h3 className="font-display text-chrome" style={{ fontSize: '1.65rem', marginBottom: '0.75rem' }}>
                      ONE-TIME ACTIVATION NEEDED
                    </h3>
                    <p style={{ color: 'var(--silver-secondary)', maxWidth: '440px', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                      FormSubmit has sent a 1-click confirmation email to <strong style={{ color: '#ffffff' }}>{emailAddress}</strong>.
                    </p>
                    <div
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        marginBottom: '1.75rem',
                        maxWidth: '440px',
                        textAlign: 'left',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        color: 'var(--silver-bright)',
                      }}
                    >
                      <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>To receive messages in Gmail:</strong>
                      1. Open your inbox at <span style={{ color: '#ffffff', fontWeight: 600 }}>{emailAddress}</span> (check Spam if not in Primary).<br />
                      2. Open the email from FormSubmit and click <strong style={{ color: '#ffffff' }}>&quot;Activate Form&quot;</strong>.<br />
                      3. All future messages from this website will land straight in your inbox!
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-silver"
                        style={{ textDecoration: 'none', padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
                      >
                        <span>Open Gmail</span>
                        <ArrowUpRight size={16} />
                      </a>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setSubmitNotice('');
                        }}
                        className="btn-outline-silver"
                        style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
                      >
                        Back to Form
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-display text-chrome" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                      MESSAGE SENT TO ROHIT
                    </h3>
                    <p style={{ color: 'var(--silver-secondary)', maxWidth: '420px', lineHeight: 1.7, marginBottom: '2rem' }}>
                      Thank you, <strong style={{ color: '#ffffff' }}>{formData.name}</strong>! Your message has been sent directly to <strong style={{ color: '#ffffff' }}>{emailAddress}</strong>. I will reply to you at <strong style={{ color: '#ffffff' }}>{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setSubmitNotice('');
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Mobile App Development (Flutter / Android)',
                          budget: 'Internship / Full-time Role',
                          message: '',
                        });
                      }}
                      className="btn-outline-silver"
                    >
                      Send Another Message
                    </button>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                  Send a Message
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--silver-muted)', marginBottom: '0.5rem' }}>
                  Fill in your details below and it will be sent directly to my Gmail inbox.
                </p>

                {submitError && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      background: 'rgba(255, 75, 75, 0.1)',
                      border: '1px solid rgba(255, 100, 100, 0.3)',
                      color: '#ffc5c5',
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <div>{submitError}</div>
                    <a
                      href={mailtoUrl}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        display: 'inline-block',
                        marginTop: '0.35rem',
                      }}
                    >
                      Click here to send directly via your Mail app &rarr;
                    </a>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--silver-bright)', marginBottom: '0.35rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--silver-bright)', marginBottom: '0.35rem' }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Project Scope & Budget Selectors */}
                <div className="contact-scope-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--silver-bright)', marginBottom: '0.35rem' }}>
                      Topic / Service
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 0.6rem',
                        background: '#0d0d14',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Mobile App Development (Flutter / Android)">Mobile App (Flutter / Android)</option>
                      <option value="UI/UX & Interface Design">UI/UX & App Design</option>
                      <option value="Web Development (React / Full-Stack)">Web Development (React)</option>
                      <option value="Job / Internship Opportunity">Job / Internship Opportunity</option>
                      <option value="General Inquiry / Saying Hello">General Inquiry / Saying Hi</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--silver-bright)', marginBottom: '0.35rem' }}>
                      Engagement Type
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 0.6rem',
                        background: '#0d0d14',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Internship / Full-time Role">Internship / Full-time Role</option>
                      <option value="Freelance / Project">Freelance / Project Work</option>
                      <option value="Collaboration / Mentorship">Technical Collaboration</option>
                      <option value="General Chat / Inquiry">General Question / Chat</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--silver-bright)', marginBottom: '0.35rem' }}>
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me a bit about what you'd like to build or discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-silver"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    fontSize: '0.95rem',
                    marginTop: '0.5rem',
                    opacity: isSending ? 0.75 : 1,
                    cursor: isSending ? 'wait' : 'pointer',
                  }}
                >
                  <Send size={16} />
                  <span>{isSending ? 'Sending to beta.co1257@gmail.com...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 4.5rem 0 3.5rem 0 !important;
            scroll-margin-top: 80px !important;
          }
          #contact h2 {
            font-size: clamp(1.65rem, 6vw, 2.5rem) !important;
            line-height: 1.15 !important;
          }
          #contact p {
            font-size: 0.92rem !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .contact-info-card, .contact-form-card {
            padding: 1.35rem 1.15rem !important;
            border-radius: 18px !important;
          }
          .contact-info-card h3, .contact-form-card h3 {
            font-size: 1.25rem !important;
          }
          .contact-scope-grid {
            grid-template-columns: 1fr !important;
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </section>
  );
}
