import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="home-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div className="home-lang-toggle">
          <button
            className="home-lang-btn"
            onClick={() => setLang('en')}
            style={{
              background: lang === 'en' ? 'rgba(100, 190, 230, 0.12)' : 'transparent',
              color: lang === 'en' ? 'var(--color-text-bright)' : 'var(--color-muted)',
            }}
          >
            EN
          </button>
          <button
            className="home-lang-btn"
            onClick={() => setLang('zh')}
            style={{
              background: lang === 'zh' ? 'rgba(100, 190, 230, 0.12)' : 'transparent',
              color: lang === 'zh' ? 'var(--color-text-bright)' : 'var(--color-muted)',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            中文
          </button>
        </div>

        <nav className="home-nav">
          {[
            { path: '/', label: t('nav.home'), sub: 'HOME' },
            { path: '/about', label: t('nav.about'), sub: 'BIO_FUNC()' },
            { path: '/code', label: t('nav.code'), sub: 'REPOS && SNIPPETS' },
            { path: '/contact', label: t('nav.contact'), sub: 'MESSAGE_QUEUE' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`home-nav-item ${isActive(item.path) ? 'active' : ''}`}
              style={{ color: isActive(item.path) ? 'var(--color-text-bright)' : 'var(--color-muted)' }}
            >
              <span className="home-nav-label">{item.label}</span>
              <span className="home-nav-sub">{item.sub}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
