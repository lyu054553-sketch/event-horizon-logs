import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import LetterGlitch from './react-bits/LetterGlitch/LetterGlitch';
import Navbar from './Navbar';
import '../styles/chrome.css';

export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Home page has its own layout
  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Background layers */}
      <div className="bg-starfield" />
      <div className="letter-glitch-layer">
        <LetterGlitch glitchSpeed={80} />
      </div>
      <div className="bg-noise" />
      <div className="bg-scanlines" />
      <div className="scanline-sweep" />

      {/* Navbar */}
      <Navbar />

      {/* Page content — keyed wrapper re-triggers the entry transition per route */}
      <main className="chrome-main">
        <div key={location.pathname} className="page-transition">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="chrome-footer">
        <div className="chrome-footer-inner">
          <span className="chrome-footer-text">{t('footer')}</span>
          <span className="hud chrome-footer-hud">
            <span className="chrome-status-dot" />
            {t('chrome.footer.status')}
          </span>
        </div>
      </footer>
    </>
  );
}
