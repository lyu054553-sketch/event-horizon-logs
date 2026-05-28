import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import LeoMark from '../components/LeoMark';

function TerminalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'rgba(5, 10, 15, 0.9)',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
        padding: '1.5rem',
        fontSize: 13,
        lineHeight: 1.8,
        position: 'relative',
        marginBottom: '1.5rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 28,
          background: 'rgba(8,14,20,0.8)',
          borderBottom: '1px solid var(--color-border)',
          borderRadius: '3px 3px 0 0',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 6, left: 12,
          fontSize: 10,
          letterSpacing: 2,
          color: 'var(--color-muted)',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </span>
      <div style={{ marginTop: 20 }}>{children}</div>
    </div>
  );
}

function TelemetryPanel({ rows }: { rows: { label: string; value: string; color?: string }[] }) {
  return (
    <div
      className="glow-pulse"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
        padding: '1rem',
        fontSize: 11,
      }}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.35rem 0',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(154,178,199,0.08)' : 'none',
          }}
        >
          <span style={{ color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 9 }}>
            {row.label}
          </span>
          <span style={{ color: row.color || 'var(--color-text-bright)', fontWeight: 500 }}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { t } = useI18n();

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
        {t('about.label')}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: 'var(--color-text-bright)', letterSpacing: 2, marginBottom: '1rem' }}>
        {t('about.title')}
      </h2>
      <div style={{ width: 60, height: 1, background: 'var(--color-accent)', marginBottom: '2rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <LeoMark />
          </div>

          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 3, padding: '1.5rem', backdropFilter: 'blur(6px)', textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: 'var(--color-accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '1rem' }}>
              {t('about.role')}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-muted)', lineHeight: 1.8 }}>
              {t('about.bio')}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.2rem', justifyContent: 'center' }}>
            {[t('about.tag1'), t('about.tag2'), t('about.tag3'), t('about.tag4'), t('about.tag5'), t('about.tag6')].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ borderColor: 'rgba(74,141,183,0.5)', background: 'rgba(74,141,183,0.12)', boxShadow: '0 0 12px rgba(74,141,183,0.15)' }}
                style={{
                  padding: '0.25rem 0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(74,141,183,0.25)',
                  borderRadius: 2,
                  background: 'rgba(74,141,183,0.06)',
                  backdropFilter: 'blur(4px)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <TelemetryPanel
              rows={[
                { label: t('about.mbti'), value: t('about.mbti_val'), color: 'var(--color-accent)' },
                { label: t('about.focus_label'), value: t('about.focus_val') },
                { label: t('about.routine'), value: t('about.routine_val') },
                { label: t('about.status'), value: t('about.status_val'), color: '#4ade80' },
              ]}
            />
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <TerminalBlock title="whoami.sh">
            <p><span className="term-prompt">$</span> <span className="term-cmd">whoami</span></p>
            <p className="term-output">{t('about.whoami1')}</p>
            <p className="term-output">{t('about.whoami2')}</p>
            <br />
            <p><span className="term-prompt">$</span> <span className="term-cmd">cat motto.md</span></p>
            <p className="term-output">{t('about.motto1')}</p>
            <p className="term-output">{t('about.motto2')}</p>
            <br />
            <p><span className="term-prompt">$</span> <span className="cursor-blink" /></p>
          </TerminalBlock>

          <TerminalBlock title="tools.env">
            <p><span className="term-prompt">$</span> <span className="term-cmd">env | grep TOOLS</span></p>
            <br />
            <p className="term-output">{t('about.tools1')}</p>
            <p className="term-output">{t('about.tools2')}</p>
            <p className="term-output">{t('about.tools3')}</p>
            <p className="term-output">{t('about.tools4')}</p>
            <p className="term-output">{t('about.tools5')}</p>
            <br />
            <p><span className="term-prompt">$</span> <span className="cursor-blink" /></p>
          </TerminalBlock>

          <TerminalBlock title="domains.json">
            <p><span className="term-prompt">$</span> <span className="term-cmd">jq '.domains' manifest.json</span></p>
            <br />
            <p className="term-output">[</p>
            <p className="term-output">  {t('about.dom1')}</p>
            <p className="term-output">  {t('about.dom2')}</p>
            <p className="term-output">  {t('about.dom3')}</p>
            <p className="term-output">  {t('about.dom4')}</p>
            <p className="term-output">  {t('about.dom5')}</p>
            <p className="term-output">  {t('about.dom6')}</p>
            <p className="term-output">]</p>
            <br />
            <p><span className="term-prompt">$</span> <span className="cursor-blink" /></p>
          </TerminalBlock>
        </motion.div>
      </div>
    </div>
  );
}
