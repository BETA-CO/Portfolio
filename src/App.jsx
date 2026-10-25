import FlowingCanvas from './components/FlowingCanvas';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-obsidian text-silver selection:bg-silver selection:text-black">
      {/* Liquid silver custom cursor */}
      <CustomCursor />

      {/* Real-time liquid silver scroll progress bar */}
      <ScrollProgressBar />

      {/* Interactive flowing liquid silver canvas background */}
      <FlowingCanvas
        waveSpeed={0.008}
        waveAmplitude={45}
        waveCount={4}
        particleCount={40}
        silverIntensity={1.0}
      />

      {/* Floating glassmorphic navigation capsule */}
      <Navbar />

      {/* Main page content sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Atmospheric footer */}
      <Footer />
    </div>
  );
}
