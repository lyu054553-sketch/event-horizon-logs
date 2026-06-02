import { useState, useEffect, useRef, useCallback } from 'react';
import LeoMark from '../components/LeoMark';
import Starfield from '../components/Starfield';
import Navbar from '../components/Navbar';

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  // Load animations
  useEffect(() => {
    const bgTimer = setTimeout(() => setBgLoaded(true), 100);
    const titleTimer = setTimeout(() => setTitleLoaded(true), 600);
    if (heroVideoRef.current) {
      heroVideoRef.current.playbackRate = 0.5;
    }
    return () => {
      clearTimeout(bgTimer);
      clearTimeout(titleTimer);
    };
  }, []);

  // Intersection observer for video section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate(${mousePos.x * factor}px, ${mousePos.y * factor}px)`,
  });

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page-wrapper" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <div ref={containerRef} className="home-container">
        {/* Background layers */}
        <Starfield />
        <video
          ref={heroVideoRef}
          className={`home-bg-video ${bgLoaded ? 'loaded' : ''}`}
          src="/assets/backgrounds_home_dark_space.mp4"
          muted
          loop
          playsInline
          autoPlay
          style={parallaxStyle(8)}
        />
        <div className="home-vignette" />
        <div className="home-noise" />
        <div className="home-scanlines" />
        <div className="home-horizon-line" />

      {/* Header */}
      <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
        <Navbar />
      </div>

      {/* Central LEO mark */}
      <div
        className={`home-hero-title ${titleLoaded ? 'loaded' : ''}`}
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * -5}px), calc(-50% + ${mousePos.y * -5}px))`,
        }}
      >
        <LeoMark />
      </div>

      {/* Bottom arrow */}
      <div className="home-bottom-arrow" onClick={scrollToVideo} style={{ cursor: 'pointer' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    {/* Video Background Section */}
    <div
      ref={videoSectionRef}
      className={`home-video-section ${videoVisible ? 'visible' : ''}`}
    >
      <video
        ref={videoRef}
        className="home-video-bg"
        src="/assets/backgrounds_astronaut_falling.mp4"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="home-video-overlay" />
      <div className="home-video-content">
        <div className="home-video-label">// BEYOND THE HORIZON</div>
        <h2 className="home-video-title">Exploring the Cosmos</h2>
        <p className="home-video-desc">
          Drifting through the infinite expanse, where light bends around massive bodies
          and time stretches into eternity. Every star a story, every void a possibility.
        </p>
      </div>
      <div className="home-video-terminal-float">
        <div className="home-vt-line"><span className="home-terminal-cmd">$</span> navigate --deep-space</div>
        <div className="home-vt-line home-vt-output">Initiating stellar drift sequence...</div>
        <div className="home-vt-line home-vt-output">Coordinates locked: ∞, ∞, ∞</div>
        <div className="home-vt-line"><span className="home-terminal-cmd">$</span> <span className="home-terminal-cursor" /></div>
      </div>
    </div>
    </div>
  );
}
