import { useEffect, useRef, useState, type JSX, type ReactNode } from 'react';

/* ── usePrefersReducedMotion ─────────────────────────────────────── */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/* ── Reveal ──────────────────────────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Panel ───────────────────────────────────────────────────────── */

export function Panel({
  title,
  right,
  children,
  className = '',
  hover = false,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  hover?: boolean;
}): JSX.Element {
  return (
    <div
      className={`panel${hover ? ' panel-hover' : ''}${className ? ` ${className}` : ''}`}
    >
      {title !== undefined && (
        <div className="panel-header">
          <span>{title}</span>
          {right !== undefined && <span>{right}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ── Tag ─────────────────────────────────────────────────────────── */

export function Tag({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'ok';
}): JSX.Element {
  const toneClass = tone === 'accent' ? ' tag-accent' : tone === 'ok' ? ' tag-ok' : '';
  return <span className={`tag${toneClass}`}>{children}</span>;
}

/* ── PageHeader ──────────────────────────────────────────────────── */

export function PageHeader({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc?: string;
}): JSX.Element {
  return (
    <header>
      <p className="section-label">{label}</p>
      <h1 className="page-title">{title}</h1>
      <hr className="title-rule" />
      {desc !== undefined && (
        <p
          style={{
            color: 'var(--color-muted)',
            fontSize: '13px',
            maxWidth: '620px',
            margin: 0,
          }}
        >
          {desc}
        </p>
      )}
    </header>
  );
}
