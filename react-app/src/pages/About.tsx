import { useState, type CSSProperties, type ReactNode } from 'react';
import { useI18n } from '../i18n';
import { Reveal, Panel, Tag, PageHeader } from '../components/ui';
import LeoMark from '../components/LeoMark';
import '../styles/about.css';

/* ── Terminal line — staggers in via CSS animation-delay (--i) ──── */
function TermLine({
  i,
  className = '',
  children,
}: {
  i: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`about-term-line${className ? ` ${className}` : ''}`}
      style={{ '--i': i } as CSSProperties}
    >
      {children}
    </p>
  );
}

/* ── Terminal module — unified panel, header = FILE no. + filename ─ */
function TermPanel({
  title,
  right,
  base,
  children,
}: {
  title: string;
  right: string;
  base: number;
  children: ReactNode;
}) {
  return (
    <Panel title={title} right={right}>
      <div
        className="about-term-body"
        style={{ '--line-base': `${base}ms` } as CSSProperties}
      >
        {children}
      </div>
    </Panel>
  );
}

interface SpecRow {
  label: string;
  value: string;
  tone?: 'accent' | 'ok';
}

export default function About() {
  const { t } = useI18n();
  const [bgLoaded, setBgLoaded] = useState(false);

  const tags = [
    t('about.tag1'),
    t('about.tag2'),
    t('about.tag3'),
    t('about.tag4'),
    t('about.tag5'),
    t('about.tag6'),
  ];

  const specRows: SpecRow[] = [
    { label: t('about.mbti'), value: t('about.mbti_val'), tone: 'accent' },
    { label: t('about.focus_label'), value: t('about.focus_val') },
    { label: t('about.routine'), value: t('about.routine_val') },
    { label: t('about.status'), value: t('about.status_val'), tone: 'ok' },
  ];

  return (
    <div className="about-page">
      {/* Background image (fade-in preserved) */}
      <img
        src="/assets/backgrounds_about_dark_space.png"
        alt=""
        onLoad={() => setBgLoaded(true)}
        className={`about-bg${bgLoaded ? ' is-loaded' : ''}`}
      />
      {/* Vignette + faint scanlines above the photo */}
      <div className="about-vignette" />
      <div className="about-scanlines" />

      <div className="about-wrap">
        <PageHeader label={t('about.label')} title={t('about.title')} />

        {/* Dossier meta bar */}
        <Reveal>
          <div className="about-dossier-bar hud">
            <span>{t('about.dossier_no')}</span>
            <span>{t('about.clearance')}</span>
          </div>
        </Reveal>

        <div className="about-grid">
          {/* ── LEFT — FILE 01 IDENTITY + FILE 02 SPEC ── */}
          <div className="about-col">
            <Reveal delay={0}>
              <Panel title={t('about.file_identity')} right={t('about.identity_no')}>
                <div className="about-identity-body">
                  <div className="about-leo">
                    <LeoMark />
                  </div>
                  <div className="about-identity-rule" />
                  <p className="about-role">{t('about.role')}</p>
                  <p className="about-bio">{t('about.bio')}</p>
                  <div className="about-tags">
                    {tags.map((tag) => (
                      <Tag key={tag} tone="accent">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={120}>
              <Panel title={t('about.file_spec')} right={t('about.spec_right')}>
                <div className="about-spec-rows">
                  {specRows.map((row) => (
                    <div className="about-spec-row" key={row.label}>
                      <span className="about-spec-label">{row.label}</span>
                      <span
                        className={`about-spec-value${
                          row.tone === 'accent'
                            ? ' is-accent'
                            : row.tone === 'ok'
                              ? ' is-ok'
                              : ''
                        }`}
                      >
                        {row.tone === 'ok' && (
                          <span className="about-status-dot" aria-hidden="true" />
                        )}
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </div>

          {/* ── RIGHT — FILE 03–05 terminal modules ── */}
          <div className="about-col">
            <Reveal delay={240}>
              <TermPanel
                title={t('about.file_whoami')}
                right={t('about.term1_right')}
                base={380}
              >
                <TermLine i={0}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="term-cmd">whoami</span>
                </TermLine>
                <TermLine i={1} className="term-output">
                  {t('about.whoami1')}
                </TermLine>
                <TermLine i={2} className="term-output">
                  {t('about.whoami2')}
                </TermLine>
                <br />
                <TermLine i={3}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="term-cmd">cat motto.md</span>
                </TermLine>
                <TermLine i={4} className="term-output">
                  {t('about.motto1')}
                </TermLine>
                <TermLine i={5} className="term-output">
                  {t('about.motto2')}
                </TermLine>
                <br />
                <TermLine i={6}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="cursor-blink" />
                </TermLine>
              </TermPanel>
            </Reveal>

            <Reveal delay={360}>
              <TermPanel
                title={t('about.file_tools')}
                right={t('about.term2_right')}
                base={500}
              >
                <TermLine i={0}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="term-cmd">env | grep TOOLS</span>
                </TermLine>
                <br />
                <TermLine i={1} className="term-output">
                  {t('about.tools1')}
                </TermLine>
                <TermLine i={2} className="term-output">
                  {t('about.tools2')}
                </TermLine>
                <TermLine i={3} className="term-output">
                  {t('about.tools3')}
                </TermLine>
                <TermLine i={4} className="term-output">
                  {t('about.tools4')}
                </TermLine>
                <TermLine i={5} className="term-output">
                  {t('about.tools5')}
                </TermLine>
                <br />
                <TermLine i={6}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="cursor-blink" />
                </TermLine>
              </TermPanel>
            </Reveal>

            <Reveal delay={480}>
              <TermPanel
                title={t('about.file_domains')}
                right={t('about.term3_right')}
                base={620}
              >
                <TermLine i={0}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="term-cmd">jq '.domains' manifest.json</span>
                </TermLine>
                <br />
                <TermLine i={1} className="term-output">
                  [
                </TermLine>
                <TermLine i={2} className="term-output">
                  {'  '}
                  {t('about.dom1')}
                </TermLine>
                <TermLine i={3} className="term-output">
                  {'  '}
                  {t('about.dom2')}
                </TermLine>
                <TermLine i={4} className="term-output">
                  {'  '}
                  {t('about.dom3')}
                </TermLine>
                <TermLine i={5} className="term-output">
                  {'  '}
                  {t('about.dom4')}
                </TermLine>
                <TermLine i={6} className="term-output">
                  {'  '}
                  {t('about.dom5')}
                </TermLine>
                <TermLine i={7} className="term-output">
                  {'  '}
                  {t('about.dom6')}
                </TermLine>
                <TermLine i={8} className="term-output">
                  ]
                </TermLine>
                <br />
                <TermLine i={9}>
                  <span className="term-prompt">$</span>{' '}
                  <span className="cursor-blink" />
                </TermLine>
              </TermPanel>
            </Reveal>
          </div>
        </div>

        {/* Record footer */}
        <Reveal delay={600}>
          <p className="about-end-record hud">{t('about.end_record')}</p>
        </Reveal>
      </div>
    </div>
  );
}
