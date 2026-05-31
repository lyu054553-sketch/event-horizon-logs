import { useState, useEffect, useRef, useCallback } from 'react';
import LeoMark from '../components/LeoMark';
import Starfield from '../components/Starfield';
import Navbar from '../components/Navbar';
import { useI18n } from '../i18n';

export default function Home() {
  const { t } = useI18n();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load animations
  useEffect(() => {
    const bgTimer = setTimeout(() => setBgLoaded(true), 100);
    const titleTimer = setTimeout(() => setTitleLoaded(true), 600);
    const cardsTimer = setTimeout(() => setCardsLoaded(true), 1200);
    return () => {
      clearTimeout(bgTimer);
      clearTimeout(titleTimer);
      clearTimeout(cardsTimer);
    };
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

  return (
    <div
      ref={containerRef}
      className="home-container"
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <Starfield />
      <div
        className={`home-bg ${bgLoaded ? 'loaded' : ''}`}
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

      {/* Left side info */}
      <div
        className="home-side-info"
        style={{
          left: 38,
          top: 182,
          animation: 'fadeInUp 0.8s ease 0.3s both',
        }}
      >
        <div className="home-side-label">// STATUS</div>
        <div className="home-side-value">ONLINE</div>
      </div>

      <div
        className="home-side-info"
        style={{
          left: 38,
          top: 408,
          animation: 'fadeInUp 0.8s ease 0.5s both',
        }}
      >
        <div className="home-side-label">// UPTIME</div>
        <div className="home-side-value">182D 14H</div>
      </div>

      <div
        className="home-side-info"
        style={{
          left: 38,
          top: 650,
          animation: 'fadeInUp 0.8s ease 0.7s both',
        }}
      >
        <div className="home-side-label">// PROTOCOL</div>
        <div className="home-side-value">v2.7.0</div>
      </div>

      {/* Left scale line */}
      <div
        className="home-scale-line"
        style={{ left: 36, top: 260, height: 340 }}
      >
        {[0, 52, 104, 156, 208, 260, 312].map((offset) => (
          <div key={offset} className="home-scale-tick" style={{ top: offset }} />
        ))}
        <div className="home-scale-dot" style={{ top: 170 }} />
      </div>

      {/* Right side info */}
      <div
        className="home-side-info"
        style={{
          right: 44,
          top: 194,
          textAlign: 'right',
          animation: 'fadeInUp 0.8s ease 0.4s both',
        }}
      >
        <div className="home-side-value" style={{ letterSpacing: '0.14em' }}>
          23° 26′ 12″ N
        </div>
      </div>

      <div
        className="home-side-info"
        style={{
          right: 44,
          top: 648,
          textAlign: 'right',
          animation: 'fadeInUp 0.8s ease 0.6s both',
        }}
      >
        <div className="home-side-value" style={{ letterSpacing: '0.14em' }}>
          113° 15′ 30″ E
        </div>
      </div>

      {/* Right scale line */}
      <div
        className="home-scale-line"
        style={{ right: 38, top: 260, height: 340 }}
      >
        {[0, 170, 340].map((offset) => (
          <div key={offset} className="home-scale-dot" style={{ top: offset }} />
        ))}
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

      {/* Bottom cards */}
      <div className="home-cards-container">
        {/* Card 1 */}
        <div
          className={`home-card ${cardsLoaded ? 'loaded' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="home-card-number">01</div>
          <div className="home-card-category">/ {t('home.card1.tag1')}</div>
          <div className="home-card-title">{t('home.card1.title')}</div>
          <div className="home-card-subtitle">{t('home.card1.time')}</div>
          <div className="home-card-arrow">→</div>
        </div>

        {/* Card 2 */}
        <div
          className={`home-card ${cardsLoaded ? 'loaded' : ''}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="home-card-number">02</div>
          <div className="home-card-category">/ {t('home.card2.tag1')}</div>
          <div className="home-card-title">{t('home.card2.title')}</div>
          <div className="home-card-subtitle">{t('home.card2.time')}</div>
          <div className="home-card-arrow">→</div>
        </div>

        {/* Card 3 - Terminal */}
        <div
          className={`home-card ${cardsLoaded ? 'loaded' : ''}`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className="home-card-number">03</div>
          <div className="home-card-category">/ TERMINAL</div>
          <div className="home-terminal">
            <div><span className="home-terminal-cmd">$</span> whoami</div>
            <div className="home-terminal-output">{t('home.card3.line2')}</div>
            <div><span className="home-terminal-cmd">$</span> cat status.log</div>
            <div className="home-terminal-output">
              {t('home.card3.line4')}<span className="home-terminal-cursor" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom arrow */}
      <div className="home-bottom-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
