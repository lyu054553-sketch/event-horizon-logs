import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import LetterGlitch from './react-bits/LetterGlitch/LetterGlitch';

export default function Layout({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
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
      <nav className="navbar">
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 3,
            color: 'var(--color-text-bright)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          {'<OBSERVER/>'}
        </Link>

        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              gap: 0,
              background: 'rgba(8,14,20,0.6)',
              border: '1px solid var(--color-border)',
              borderRadius: 2,
              overflow: 'hidden',
              marginRight: '1rem',
            }}
          >
            <button
              onClick={() => setLang('en')}
              style={{
                padding: '0.3rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 1.5,
                color: lang === 'en' ? 'var(--color-text-bright)' : 'var(--color-muted)',
                background: lang === 'en' ? 'rgba(74,141,183,0.12)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLang('zh')}
              style={{
                padding: '0.3rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: 1.5,
                color: lang === 'zh' ? 'var(--color-text-bright)' : 'var(--color-muted)',
                background: lang === 'zh' ? 'rgba(74,141,183,0.12)' : 'transparent',
                border: 'none',
                borderLeft: '1px solid var(--color-border)',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              中文
            </button>
          </div>

          {[
            { path: '/', label: t('nav.home'), sub: '' },
            { path: '/about', label: t('nav.about'), sub: t('nav.about_sub') },
            { path: '/code', label: t('nav.code'), sub: t('nav.code_sub') },
            { path: '/contact', label: t('nav.contact'), sub: t('nav.contact_sub') },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.4rem 0.85rem',
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: isActive(item.path) ? 'var(--color-accent)' : 'var(--color-muted)',
                textDecoration: 'none',
                border: '1px solid transparent',
                borderRadius: 2,
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{ fontWeight: 500, fontSize: 11 }}>{item.label}</span>
              {item.sub && (
                <span style={{ fontSize: 8, opacity: 0.5, marginTop: 1 }}>{item.sub}</span>
              )}
            </Link>
          ))}
        </div>
      </nav>

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
