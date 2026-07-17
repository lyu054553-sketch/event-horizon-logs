import { useState, useEffect, useRef, useCallback } from 'react';
import LeoMark from '../components/LeoMark';
import Starfield from '../components/Starfield';
import Navbar from '../components/Navbar';
import { Reveal, usePrefersReducedMotion } from '../components/ui';
import { useI18n } from '../i18n';
import '../styles/home.css';

export default function Home() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const [bgLoaded, setBgLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [utcNow, setUtcNow] = useState('--:--:--');
  const [depth, setDepth] = useState(0);
  const [finePointer, setFinePointer] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero background fade-in + half-speed playback
  useEffect(() => {
    const bgTimer = window.setTimeout(() => setBgLoaded(true), 100);
    if (heroVideoRef.current) {
      heroVideoRef.current.playbackRate = 0.5;
    }
    return () => window.clearTimeout(bgTimer);
  }, []);

  // Live UTC clock (HUD), cleaned up on unmount
  useEffect(() => {
    const tick = () => setUtcNow(new Date().toISOString().slice(11, 19));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Scroll depth readout (percent of first viewport), rAF-throttled
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        setDepth(Math.min(100, Math.max(0, Math.round((window.scrollY / h) * 100))));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  // Mouse parallax only on fine (non-touch) pointers
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    const update = () => setFinePointer(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Intersection observer for video section play/pause
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

  const parallaxOn = finePointer && !reduced;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const scrollToVideo = useCallback(() => {
    videoSectionRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  return (
    <div className="home-page-wrapper" onMouseMove={parallaxOn ? handleMouseMove : undefined}>
      {/* ── HERO / OBSERVATION DECK ── */}
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
          style={
            parallaxOn
              ? {
                  transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px) scale(1.03)`,
                }
              : undefined
          }
        />
        <div className="home-vignette" />
        <div className="home-noise" />
        <div className="home-scanlines" />
        <div className="home-horizon-line" />
        <div className="hero-frame" aria-hidden="true" />

        {/* Header */}
        <div style={{ animation: 'fadeInUp 0.8s ease backwards' }}>
          <Navbar />
        </div>

        {/* HUD data layer (decorative) */}
        <div className="hero-hud" aria-hidden="true">
          <div className="hero-hud-cell hero-hud-tl hud">
            <span className="hero-hud-station">{t('home.hud.station')}</span>
            <span className="hero-hud-link">
              <i className="hero-hud-dot" />
              {t('home.hud.link')}
            </span>
          </div>
          <div className="hero-hud-cell hero-hud-bl hud">
            <span className="hero-hud-coords">{t('home.hud.coords')}</span>
            <span className="hero-hud-clock">{utcNow} UTC</span>
          </div>
          <div className="hero-hud-cell hero-hud-br hud">
            <span>{t('home.hud.log')}</span>
            <span>
              {t('home.hud.depth')} {String(depth).padStart(3, '0')}%
            </span>
          </div>
        </div>

        {/* Central LEO mark (draw-in choreography lives in LeoMark/home.css) */}
        <div
          className="hero-mark"
          style={
            parallaxOn
              ? {
                  transform: `translate(calc(-50% + ${mousePos.x * -4}px), calc(-50% + ${mousePos.y * -4}px))`,
                }
              : undefined
          }
        >
          <LeoMark />
        </div>

        {/* Descend cue */}
        <button
          type="button"
          className="hero-cue"
          onClick={scrollToVideo}
          aria-label={`${t('home.scroll')} / ${t('home.scroll.alt')}`}
        >
          <span className="hero-cue-label">{t('home.scroll')}</span>
          <span className="hero-cue-line" aria-hidden="true" />
          <span className="hero-cue-sub">{t('home.scroll.alt')}</span>
          <svg
            className="hero-cue-tri"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {/* ── LOG 002 / FREE FALL ── */}
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

        {/* Chapter rail */}
        <div className="video-rail" aria-hidden="true">
          <span className="video-rail-item">001</span>
          <span className="video-rail-item is-current">002</span>
          <span className="video-rail-item">003</span>
        </div>

        <div className="home-video-content">
          <Reveal>
            <div className="home-video-label">{t('home.video.label')}</div>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="home-video-title">{t('home.video.title')}</h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="home-video-desc">{t('home.video.desc')}</p>
          </Reveal>
        </div>

        <div className="home-video-terminal-float" aria-hidden="true">
          <div className="home-vt-line">
            <span className="home-terminal-cmd">$</span> {t('home.video.t1')}
          </div>
          <div className="home-vt-line home-vt-output">{t('home.video.t2')}</div>
          <div className="home-vt-line home-vt-output">{t('home.video.t3')}</div>
          <div className="home-vt-line home-vt-output">{t('home.video.t4')}</div>
          <div className="home-vt-line">
            <span className="home-terminal-cmd">$</span>{' '}
            <span className="home-terminal-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
}
