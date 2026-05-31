import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import LetterGlitch from './react-bits/LetterGlitch/LetterGlitch';
import Navbar from './Navbar';

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

      {/* Page content */}
      <main style={{ paddingTop: 56, minHeight: '100vh' }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          padding: '3rem 0 2rem',
          borderTop: '1px solid var(--color-border)',
          marginTop: '4rem',
          textAlign: 'center',
          fontSize: 10,
          letterSpacing: 3,
          color: 'var(--color-muted)',
          textTransform: 'uppercase',
        }}
      >
        {t('footer')}
      </footer>
    </>
  );
}
