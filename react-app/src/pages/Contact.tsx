import { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
        {t('contact.label')}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: 'var(--color-text-bright)', letterSpacing: 2, marginBottom: '1rem' }}>
        {t('contact.title')}
      </h2>
      <div style={{ width: 60, height: 1, background: 'var(--color-accent)', marginBottom: '2rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Terminal + Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Terminal status */}
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
            <span style={{ position: 'absolute', top: 6, left: 12, fontSize: 10, letterSpacing: 2, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              transmit.sh
            </span>
            <div style={{ marginTop: 20 }}>
              <p><span className="term-prompt">$</span> <span className="term-cmd">mq status</span></p>
              <br />
              <p className="term-output" style={{ color: '#4ade80' }}>{t('contact.term_out1')}</p>
              <p className="term-output">{t('contact.term_out2')}</p>
              <p className="term-output">{t('contact.term_out3')}</p>
              <br />
              <p><span className="term-prompt">$</span> <span className="term-cmd">mq send --interactive</span></p>
              <p className="term-output">{t('contact.term_out4')}</p>
              <br />
              <p><span className="term-prompt">$</span> <span className="cursor-blink" /></p>
            </div>
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            whileHover={{ borderColor: 'var(--color-border-hover)' }}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 3,
              padding: '2rem',
              backdropFilter: 'blur(6px)',
            }}
          >
            {[
              { id: 'callsign', label: t('contact.callsign'), ph: t('contact.callsign_ph'), type: 'text' },
              { id: 'email', label: t('contact.email'), ph: t('contact.email_ph'), type: 'email' },
            ].map((field) => (
              <div key={field.id} style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.4rem' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.ph}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--color-text)',
                    background: 'rgba(5, 10, 15, 0.8)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 2,
                    outline: 'none',
                    transition: 'border-color 0.25s ease',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.4rem' }}>
                {t('contact.message')}
              </label>
              <textarea
                placeholder={t('contact.message_ph')}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--color-text)',
                  background: 'rgba(5, 10, 15, 0.8)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 2,
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: 120,
                  transition: 'border-color 0.25s ease',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.3rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-text-bright)',
                background: 'rgba(74, 141, 183, 0.12)',
                border: '1px solid var(--color-accent)',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {t('contact.send')}
            </button>

            {sent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 11, color: '#4ade80', marginTop: '0.75rem', textAlign: 'center' }}
              >
                {t('contact.sent')}
              </motion.p>
            )}
          </motion.form>
        </motion.div>

        {/* Right: Channels + Telemetry + Note */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ position: 'sticky', top: '1.5rem' }}>
          {/* Channels */}
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 3, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 3, color: 'var(--color-accent)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              {t('contact.ch_title')}
            </h3>
            {[
              { icon: '🐙', label: t('contact.ch1'), tag: t('contact.ch1_tag'), href: 'https://github.com/lyu054553-sketch' },
              { icon: '📧', label: t('contact.ch2'), tag: t('contact.ch2_tag'), href: 'mailto:lyu054553@gmail.com' },
              { icon: '💬', label: t('contact.ch3'), tag: t('contact.ch3_tag'), href: '#' },
            ].map((ch, i) => (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0',
                  borderBottom: i < 2 ? '1px solid rgba(154,178,199,0.08)' : 'none',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  fontSize: 12,
                  transition: 'color 0.25s ease',
                }}
              >
                <span style={{ fontSize: 16, opacity: 0.6 }}>{ch.icon}</span>
                <span>{ch.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--color-muted)', letterSpacing: 1.5 }}>
                  {ch.tag}
                </span>
              </a>
            ))}
          </div>

          {/* Telemetry */}
          <div
            className="glow-pulse"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 3,
              padding: '1rem',
              fontSize: 11,
              marginBottom: '1.5rem',
            }}
          >
            {[
              { label: t('contact.sig1'), value: t('contact.sig1_val'), color: '#4ade80' },
              { label: t('contact.sig2'), value: t('contact.sig2_val') },
              { label: t('contact.sig3'), value: t('contact.sig3_val') },
              { label: t('contact.sig4'), value: t('contact.sig4_val') },
              { label: t('contact.sig5'), value: '0xAB3F...7D21' },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.35rem 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(154,178,199,0.08)' : 'none',
                }}
              >
                <span style={{ color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 9 }}>
                  {row.label}
                </span>
                <span style={{ color: row.color || 'var(--color-text-bright)', fontWeight: 500, fontSize: row.label === t('contact.sig5') ? 10 : undefined }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Note terminal */}
          <div
            style={{
              background: 'rgba(5, 10, 15, 0.9)',
              border: '1px solid var(--color-border)',
              borderRadius: 3,
              padding: '1.5rem',
              fontSize: 13,
              lineHeight: 1.8,
              position: 'relative',
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
            <span style={{ position: 'absolute', top: 6, left: 12, fontSize: 10, letterSpacing: 2, color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              note.sh
            </span>
            <div style={{ marginTop: 20 }}>
              <p><span className="term-prompt">$</span> <span className="term-cmd">cat note.txt</span></p>
              <br />
              <p className="term-output">{t('contact.note1')}</p>
              <p className="term-output">{t('contact.note2')}</p>
              <p className="term-output">{t('contact.note3')}</p>
              <p className="term-output">{t('contact.note4')}</p>
              <p className="term-output">{t('contact.note5')}</p>
              <br />
              <p className="term-output" style={{ fontStyle: 'italic' }}>{t('contact.note6')}</p>
              <p className="term-output" style={{ fontStyle: 'italic' }}>{t('contact.note7')}</p>
              <p className="term-output" style={{ fontStyle: 'italic' }}>{t('contact.note8')}</p>
              <p className="term-output" style={{ fontStyle: 'italic' }}>{t('contact.note9')}</p>
              <p className="term-comment">— J.B.S. Haldane</p>
              <br />
              <p><span className="term-prompt">$</span> <span className="cursor-blink" /></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
