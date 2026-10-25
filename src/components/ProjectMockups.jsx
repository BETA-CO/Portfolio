import { useState } from 'react';
import { Wifi, Volume2, VolumeX, Shield, Lock, Radio, FileText, Check, Sparkles, Terminal, Play, Cpu, ArrowUpRight } from './Icons';

/**
 * 1. SwiftDock Interactive Macro Deck Mockup
 */
export function SwiftDockMockup({ isExpanded = false }) {
  const [activeKey, setActiveKey] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(65);

  const keys = [
    { id: 'mute', label: isMuted ? 'UNMUTE' : 'MUTE PC', icon: isMuted ? VolumeX : Volume2, hotkey: 'Fn+F1' },
    { id: 'vscode', label: 'VS CODE', icon: Terminal, hotkey: 'Ctrl+Shift+P' },
    { id: 'play', label: 'PLAY / PAUSE', icon: Play, hotkey: 'MediaKey' },
    { id: 'discord', label: 'DISCORD', icon: Radio, hotkey: 'Ctrl+M' },
    { id: 'matrix', label: 'HOTKEY A', icon: Cpu, hotkey: 'Alt+Tab' },
    { id: 'chrome', label: 'DEV BROWSER', icon: Sparkles, hotkey: 'F12 Console' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isExpanded ? '1.5rem' : '1rem',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top telemetry bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span className="silver-radar-dot" style={{ width: '6px', height: '6px' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.05em' }}>
            WI-FI SOCKET LINK
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--silver-bright)',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
            }}
          >
            12ms Latency
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--silver-muted)' }}>
            WIN-11-PC
          </span>
        </div>
      </div>

      {/* Interactive 6-Key Macro Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: isExpanded ? '0.75rem' : '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        {keys.map((k) => {
          const IconComponent = k.icon;
          const isActive = activeKey === k.id;
          return (
            <button
              key={k.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveKey(k.id);
                if (k.id === 'mute') setIsMuted(!isMuted);
                setTimeout(() => setActiveKey(null), 300);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: isExpanded ? '0.85rem 0.5rem' : '0.55rem 0.35rem',
                borderRadius: '8px',
                background: isActive
                  ? 'linear-gradient(135deg, #ffffff 0%, #cbd0dd 100%)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? '0 0 15px rgba(255, 255, 255, 0.6)' : 'none',
                color: isActive ? '#050507' : 'var(--silver-primary)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <IconComponent size={isExpanded ? 18 : 14} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: isExpanded ? '0.7rem' : '0.62rem', fontWeight: 600 }}>
                {k.label}
              </span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>{k.hotkey}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom volume preview slider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.4rem 0.65rem',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--silver-muted)' }}>
          MASTER VOL
        </span>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', position: 'relative' }}>
          <div
            style={{
              width: `${isMuted ? 0 : volume}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8f95a6, #ffffff)',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
            }}
          />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--silver-bright)' }}>
          {isMuted ? 'MUTED' : `${volume}%`}
        </span>
      </div>
    </div>
  );
}

/**
 * 2. ChatX Interactive Private Messenger Mockup
 */
export function ChatXMockup({ isExpanded = false }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isExpanded ? '1.5rem' : '1rem',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(18, 19, 28, 0.95) 0%, rgba(9, 10, 14, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Messenger Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff, #6d7285)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.65rem',
            }}
          >
            X
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff' }}>Direct Encrypted Peer</span>
              <Lock size={11} style={{ color: '#ffffff' }} />
            </div>
            <span style={{ fontSize: '0.62rem', color: 'var(--silver-muted)', fontFamily: 'var(--font-mono)' }}>
              Permission ID: 0x8F4A...B9
            </span>
          </div>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          PERMISSION GRANTED
        </span>
      </div>

      {/* Message Bubbles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '0.75rem' }}>
        {/* Received */}
        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: '85%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px 10px 10px 2px',
            padding: '0.5rem 0.75rem',
          }}
        >
          <p style={{ fontSize: '0.74rem', color: 'var(--silver-primary)', lineHeight: 1.4 }}>
            Direct handshake accepted. Zero spam relay enabled.
          </p>
          <span style={{ display: 'block', textAlign: 'right', fontSize: '0.58rem', color: 'var(--silver-muted)', marginTop: '2px' }}>
            22:04 • AES-256
          </span>
        </div>

        {/* Sent */}
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '85%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(200, 210, 230, 0.08) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '10px 10px 2px 10px',
            padding: '0.5rem 0.75rem',
          }}
        >
          <p style={{ fontSize: '0.74rem', color: '#ffffff', lineHeight: 1.4 }}>
            Syncing in real-time across Flutter Mobile and React Web.
          </p>
          <span style={{ display: 'block', textAlign: 'right', fontSize: '0.58rem', color: 'var(--silver-bright)', marginTop: '2px' }}>
            22:05 ✓✓
          </span>
        </div>
      </div>

      {/* Typing indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0.35rem 0.65rem',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff', animation: 'pulse-glow 1.2s infinite' }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff', animation: 'pulse-glow 1.2s infinite 0.2s' }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff', animation: 'pulse-glow 1.2s infinite 0.4s' }} />
          <span style={{ fontSize: '0.62rem', color: 'var(--silver-muted)', marginLeft: '0.3rem' }}>Firestore Sync</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--silver-muted)' }}>
          E2E SECURED
        </span>
      </div>
    </div>
  );
}

/**
 * 3. SheRise Women Safety Mockup
 */
export function SheRiseMockup({ isExpanded = false }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isExpanded ? '1.5rem' : '1rem',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(22, 20, 32, 0.95) 0%, rgba(11, 10, 16, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Alert Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Shield size={14} style={{ color: '#ffffff' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.05em' }}>
            EMERGENCY DEFENSE ENGINE
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--silver-bright)',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
          }}
        >
          STANDBY READY
        </span>
      </div>

      {/* Central Pulsing SOS Button Simulation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isExpanded ? '1.5rem 0' : '0.85rem 0',
          position: 'relative',
        }}
      >
        {/* Concentric silver shockwave rings */}
        <div
          style={{
            position: 'absolute',
            width: isExpanded ? '120px' : '90px',
            height: isExpanded ? '120px' : '90px',
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            animation: 'radar-ping 2.5s infinite',
          }}
        />
        <div
          style={{
            width: isExpanded ? '84px' : '64px',
            height: isExpanded ? '84px' : '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #a4a9bd 60%, #1a1b24 100%)',
            border: '2px solid #ffffff',
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#060608',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
        >
          <span style={{ fontSize: isExpanded ? '1.1rem' : '0.9rem', letterSpacing: '0.05em' }}>SOS</span>
          <span style={{ fontSize: '0.52rem', fontWeight: 600 }}>ONE-TAP</span>
        </div>
      </div>

      {/* Telemetry pill row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.45rem 0.65rem',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--silver-primary)' }}>
          GPS: 19.0760° N, 72.8777° E
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#ffffff' }}>
          HOME WIDGET ACTIVE
        </span>
      </div>
    </div>
  );
}

/**
 * 4. CricScore 2.0 Live Scoring & Canvas PDF Mockup
 */
export function CricScoreMockup({ isExpanded = false }) {
  const balls = ['4', '1', '6', '0', '4', 'W'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isExpanded ? '1.5rem' : '1rem',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(20, 22, 28, 0.95) 0%, rgba(10, 11, 15, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Match header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 600 }}>
          IND vs ENG • FINALS
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--silver-bright)',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
          }}
        >
          18.4 OVERS
        </span>
      </div>

      {/* Scoreboard numbers */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div>
          <span className="text-chrome font-display" style={{ fontSize: isExpanded ? '2rem' : '1.5rem', fontWeight: 800 }}>
            184/3
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--silver-muted)', marginLeft: '0.4rem', fontFamily: 'var(--font-mono)' }}>
            CRR 9.85
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 600, display: 'block' }}>
            Rohit* 78 (42b)
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--silver-muted)', fontFamily: 'var(--font-mono)' }}>
            4s: 8 • 6s: 4
          </span>
        </div>
      </div>

      {/* Ball by ball sequence chips */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {balls.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.25rem 0',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 700,
              background: b === '6' || b === '4' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: b === '6' || b === '4' ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
              color: b === 'W' ? '#ffffff' : b === '6' ? '#ffffff' : 'var(--silver-primary)',
            }}
          >
            {b}
          </div>
        ))}
      </div>

      {/* Bottom vector PDF export pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.35rem 0.65rem',
          borderRadius: '6px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--silver-muted)' }}>
          PdfDocument API
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#ffffff' }}>
          Vector PDF Canvas Export
        </span>
      </div>
    </div>
  );
}

/**
 * 5. Mahendra Enterprises Industrial Steel Portal Mockup
 */
export function MahendraSteelMockup({ isExpanded = false }) {
  const specs = ['SS 304L', 'SS 316L', 'INCONEL', 'TITANIUM'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isExpanded ? '1.5rem' : '1rem',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(20, 21, 26, 0.95) 0%, rgba(10, 11, 14, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enterprise Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', fontWeight: 600 }}>
          MAHENDRA ENTERPRISES
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          ISO 9001:2015
        </span>
      </div>

      {/* Industrial Warehouse Metrics */}
      <div style={{ marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--silver-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
          WAREHOUSING CAPACITY
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span className="text-chrome font-display" style={{ fontSize: isExpanded ? '1.6rem' : '1.25rem', fontWeight: 800 }}>
            10,000+ SQ. FT.
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--silver-bright)', fontFamily: 'var(--font-mono)' }}>
            MUMBAI CENTRAL
          </span>
        </div>
      </div>

      {/* Metallurgy Grade Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {specs.map((spec, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--silver-bright)',
            }}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Bottom Quotation Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '0.35rem 0.65rem',
          borderRadius: '6px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--silver-muted)' }}>
          RFQ Quotation Pipeline
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#ffffff' }}>
          ASTM / ASME Ready
        </span>
      </div>
    </div>
  );
}

/**
 * Mockup selector based on project id
 */
export function ProjectMockupView({ projectId, isExpanded = false }) {
  switch (projectId) {
    case 'swiftdock':
      return <SwiftDockMockup isExpanded={isExpanded} />;
    case 'chatx':
      return <ChatXMockup isExpanded={isExpanded} />;
    case 'sherise':
      return <SheRiseMockup isExpanded={isExpanded} />;
    case 'cricScore':
    case 'cricscore':
      return <CricScoreMockup isExpanded={isExpanded} />;
    case 'mesteel':
      return <MahendraSteelMockup isExpanded={isExpanded} />;
    default:
      return <SwiftDockMockup isExpanded={isExpanded} />;
  }
}
