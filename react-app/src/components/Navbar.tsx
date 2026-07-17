import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import '../styles/chrome.css';

const NAV_ITEMS = [
  { path: '/', num: '01', labelKey: 'nav.home', subKey: 'chrome.nav.home.sub' },
  { path: '/about', num: '02', labelKey: 'nav.about', subKey: 'chrome.nav.about.sub' },
  { path: '/code', num: '03', labelKey: 'nav.code', subKey: 'chrome.nav.code.sub' },
  { path: '/contact', num: '04', labelKey: 'nav.contact', subKey: 'chrome.nav.contact.sub' },
];

function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`chrome-lang${className ? ` ${className}` : ''}`} role="group" aria-label="Language">
      <button
        className={`chrome-lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        className={`chrome-lang-btn${lang === 'zh' ? ' active' : ''}`}
        onClick={() => setLang('zh')}
      >
        中文
      </button>
    </div>
  );
}

function StationMark() {
  const { t } = useI18n();
  return (
    <Link to="/" className="chrome-station" aria-label={t('site.title')}>
      <span className="chrome-status-dot" />
      <span className="chrome-station-texts">
        <span className="chrome-station-id">{t('chrome.station')}</span>
        <span className="chrome-station-sub">{t('chrome.station.sub')}</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Deepen header background after scrolling past the hero threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll, close on Esc, move focus into the dialog
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const headerClass = [
    'chrome-header',
    isHome ? 'chrome-header--home' : '',
    scrolled ? 'scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClass}>
        <StationMark />

        <div className="chrome-right">
          <nav className="chrome-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`chrome-nav-item${isActive(item.path) ? ' active' : ''}`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span className="chrome-nav-num">{item.num}</span>
                <span className="chrome-nav-texts">
                  <span className="chrome-nav-label">{t(item.labelKey)}</span>
                  <span className="chrome-nav-sub">{t(item.subKey)}</span>
                </span>
              </Link>
            ))}
          </nav>

          <LangToggle />

          <button
            className="chrome-menu-btn"
            aria-label={t('chrome.menu.aria')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            {t('chrome.menu')}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="chrome-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t('chrome.menu.aria')}
        >
          <div className="chrome-overlay-top">
            <StationMark />
            <button
              ref={closeRef}
              className="chrome-overlay-close"
              aria-label={t('chrome.close.aria')}
              onClick={() => setMenuOpen(false)}
            >
              {t('chrome.close')}
            </button>
          </div>

          <p className="hud chrome-overlay-section">{t('chrome.overlay.label')}</p>

          <nav className="chrome-overlay-nav" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`chrome-overlay-item${isActive(item.path) ? ' active' : ''}`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span className="chrome-overlay-num">{item.num}</span>
                <span className="chrome-overlay-label">{t(item.labelKey)}</span>
                <span className="chrome-overlay-sub">{t(item.subKey)}</span>
              </Link>
            ))}
          </nav>

          <div className="chrome-overlay-bottom">
            <LangToggle />
            <span className="hud">{t('chrome.footer.status')}</span>
          </div>
        </div>
      )}
    </>
  );
}
