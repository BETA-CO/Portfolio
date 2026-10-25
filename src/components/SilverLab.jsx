import { Sliders, X, RotateCcw, Sparkles, Check } from './Icons';

export default function SilverLab({ isOpen, onClose, labConfig, setLabConfig, onReset }) {
  if (!isOpen) return null;

  const presets = [
    {
      name: 'Calm Mercury',
      config: { waveSpeed: 0.005, waveAmplitude: 28, waveCount: 3, particleCount: 25, silverIntensity: 0.8 },
    },
    {
      name: 'Silver Tempest',
      config: { waveSpeed: 0.016, waveAmplitude: 65, waveCount: 5, particleCount: 60, silverIntensity: 1.4 },
    },
    {
      name: 'Obsidian Void',
      config: { waveSpeed: 0.004, waveAmplitude: 20, waveCount: 2, particleCount: 15, silverIntensity: 0.5 },
    },
    {
      name: 'Hyper Kinetic',
      config: { waveSpeed: 0.022, waveAmplitude: 80, waveCount: 5, particleCount: 75, silverIntensity: 1.8 },
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(5, 5, 8, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'rgba(13, 13, 19, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '22px',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(220, 230, 255, 0.18)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ffffff 0%, #8e93a6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07070a',
              }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                Silver Fluid Physics Lab
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                Tweak real-time canvas kinematics & shaders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '0.3rem',
            }}
            aria-label="Close Silver Lab"
          >
            <X size={20} />
          </button>
        </div>

        {/* Preset Selector */}
        <div style={{ marginBottom: '1.75rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              color: 'var(--silver-muted)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.6rem',
            }}
          >
            Kinetic Presets
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setLabConfig(preset.config)}
                style={{
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{preset.name}</span>
                <Sparkles size={12} style={{ color: 'var(--silver-secondary)' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Controls Slider List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {/* Wave Speed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#ffffff' }}>Flow Velocity</label>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                {(labConfig.waveSpeed * 1000).toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.002"
              max="0.025"
              step="0.001"
              value={labConfig.waveSpeed}
              onChange={(e) => setLabConfig({ ...labConfig, waveSpeed: parseFloat(e.target.value) })}
              style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
            />
          </div>

          {/* Wave Amplitude */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#ffffff' }}>Liquid Wave Height</label>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                {labConfig.waveAmplitude}px
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="1"
              value={labConfig.waveAmplitude}
              onChange={(e) => setLabConfig({ ...labConfig, waveAmplitude: parseInt(e.target.value) })}
              style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
            />
          </div>

          {/* Wave Layer Count */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#ffffff' }}>Flowing Wave Strata</label>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                {labConfig.waveCount} layers
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="5"
              step="1"
              value={labConfig.waveCount}
              onChange={(e) => setLabConfig({ ...labConfig, waveCount: parseInt(e.target.value) })}
              style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
            />
          </div>

          {/* Silver Intensity */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#ffffff' }}>Silver Specular Bloom</label>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                {labConfig.silverIntensity.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.3"
              max="2.0"
              step="0.1"
              value={labConfig.silverIntensity}
              onChange={(e) => setLabConfig({ ...labConfig, silverIntensity: parseFloat(e.target.value) })}
              style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
            />
          </div>

          {/* Particle Count */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#ffffff' }}>Mercury Dust Particles</label>
              <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--silver-muted)' }}>
                {labConfig.particleCount}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={labConfig.particleCount}
              onChange={(e) => setLabConfig({ ...labConfig, particleCount: parseInt(e.target.value) })}
              style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button
            onClick={onReset}
            className="btn-outline-silver"
            style={{ padding: '0.6rem 1rem', fontSize: '0.84rem' }}
          >
            <RotateCcw size={14} />
            <span>Restore Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="btn-silver"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.84rem' }}
          >
            <Check size={14} />
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
