import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [bgLoaded, setBgLoaded] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const callsign = String(data.get('callsign') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!callsign || !email || !message) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background image */}
      <img
        src="/assets/backgrounds_contact_dark_space_v2.png"
        alt=""
        onLoad={() => setBgLoaded(true)}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: bgLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
      {/* Vignette overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(3,7,11,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />
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
              background: 'rgba(5, 10, 15, 0.65)',
              border: '1px solid rgba(160, 180, 200, 0.16)',
              borderRadius: 20,
              padding: '1.5rem',
              fontSize: 13,
              lineHeight: 1.8,
              position: 'relative',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
          >
            <span style={{ display: 'block', fontSize: 10, letterSpacing: 2, color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
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
            whileHover={{ borderColor: 'rgba(160, 180, 200, 0.35)' }}
            style={{
              background: 'rgba(5, 10, 15, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(160, 180, 200, 0.16)',
              borderRadius: 20,
              padding: '2rem',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
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
                  name={field.id}
                  placeholder={field.ph}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--color-text)',
                    background: 'rgba(5, 10, 15, 0.45)',
                    border: '1px solid rgba(160, 180, 200, 0.16)',
                    borderRadius: 14,
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
                name="message"
                placeholder={t('contact.message_ph')}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--color-text)',
                  background: 'rgba(5, 10, 15, 0.45)',
                  border: '1px solid rgba(160, 180, 200, 0.16)',
                  borderRadius: 14,
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
                background: 'rgba(100, 190, 230, 0.15)',
                border: '1px solid rgba(100, 190, 230, 0.3)',
                borderRadius: 14,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {t('contact.send')}
            </button>

            {error && (
              <p style={{ fontSize: 11, color: '#f87171', marginTop: '0.75rem', textAlign: 'center' }}>
                {error}
              </p>
            )}
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
          <div style={{ background: 'rgba(5, 10, 15, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(160, 180, 200, 0.16)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 3, color: 'var(--color-accent)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              {t('contact.ch_title')}
            </h3>
            {[
              { icon: '/assets/icons_github.svg', label: t('contact.ch1'), tag: t('contact.ch1_tag'), href: 'https://github.com/lyu054553-sketch' },
              { icon: '/assets/icons_mail.svg', label: t('contact.ch2'), tag: t('contact.ch2_tag'), href: 'mailto:lyu054553@gmail.com' },
              { icon: '/assets/icons_wechat.svg', label: t('contact.ch3'), tag: t('contact.ch3_tag'), href: '#' },
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
                <img src={ch.icon} alt="" style={{ width: 18, height: 18, opacity: 0.6 }} />
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
              background: 'rgba(5, 10, 15, 0.55)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(160, 180, 200, 0.16)',
              borderRadius: 20,
              padding: '1rem',
              fontSize: 11,
              marginBottom: '1.5rem',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
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
              background: 'rgba(5, 10, 15, 0.65)',
              border: '1px solid rgba(160, 180, 200, 0.16)',
              borderRadius: 20,
              padding: '1.5rem',
              fontSize: 13,
              lineHeight: 1.8,
              position: 'relative',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
          >
            <span style={{ display: 'block', fontSize: 10, letterSpacing: 2, color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              note.sh
            </span>
            <div style={{ marginTop: 0 }}>
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
    </div>
  );
}
