import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import { Reveal, Panel, Tag, PageHeader } from '../components/ui';
import '../styles/contact.css';

type SendStatus = 'idle' | 'sending' | 'sent';

interface LogEntry {
  id: number;
  ts: string;
  text: string;
}

function utcTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LOG_ENTRIES = 5;

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [bgLoaded, setBgLoaded] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const callsign = String(data.get('callsign') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!callsign || !email || !message) {
      setErrorKey('contact.err.required');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorKey('contact.err.email');
      return;
    }

    setErrorKey(null);
    setStatus('sending');

    // Simulated uplink delay, then confirm + log the transmission.
    timers.current.push(
      window.setTimeout(() => {
        form.reset();
        setStatus('sent');
        setLog((prev) => [
          ...prev.slice(-(MAX_LOG_ENTRIES - 1)),
          { id: Date.now(), ts: utcTimestamp(), text: t('contact.sent') },
        ]);
        timers.current.push(window.setTimeout(() => setStatus('idle'), 4500));
      }, 900)
    );
  };

  const channels = [
    {
      icon: '/assets/icons_github.svg',
      label: t('contact.ch1'),
      tag: t('contact.ch1_tag'),
      href: 'https://github.com/lyu054553-sketch',
    },
    {
      icon: '/assets/icons_mail.svg',
      label: t('contact.ch2'),
      tag: t('contact.ch2_tag'),
      href: 'mailto:lyu054553@gmail.com',
    },
    {
      icon: '/assets/icons_wechat.svg',
      label: t('contact.ch3'),
      tag: t('contact.ch3_tag'),
      href: '#',
    },
  ];

  const telemetry: { label: string; value: string; ok?: boolean; mono?: boolean }[] = [
    { label: t('contact.sig1'), value: t('contact.sig1_val'), ok: true },
    { label: t('contact.sig2'), value: t('contact.sig2_val') },
    { label: t('contact.sig3'), value: t('contact.sig3_val') },
    { label: t('contact.sig4'), value: t('contact.sig4_val') },
    { label: t('contact.sig5'), value: '0xAB3F...7D21', mono: true },
  ];

  const fields = [
    { index: '01', id: 'callsign', label: t('contact.callsign'), ph: t('contact.callsign_ph'), type: 'text' },
    { index: '02', id: 'email', label: t('contact.email'), ph: t('contact.email_ph'), type: 'email' },
  ];

  return (
    <div className="contact-page">
      {/* Background image (asset untouched) + vignette overlay */}
      <img
        src="/assets/backgrounds_contact_dark_space_v2.png"
        alt=""
        onLoad={() => setBgLoaded(true)}
        className={`contact-bg${bgLoaded ? ' loaded' : ''}`}
      />
      <div className="contact-vignette" />

      <div className="contact-container">
        <PageHeader label={t('contact.label')} title={t('contact.title')} />

        <div className="contact-grid">
          {/* ── Left: status terminal + compose form + tx log ── */}
          <Reveal className="contact-col">
            <Panel title="transmit.sh">
              <div className="contact-term">
                <p>
                  <span className="term-prompt">$</span> <span className="term-cmd">mq status</span>
                </p>
                <div className="contact-term-gap" />
                <p className="term-output contact-term-ok">{t('contact.term_out1')}</p>
                <p className="term-output">{t('contact.term_out2')}</p>
                <p className="term-output">{t('contact.term_out3')}</p>
                <div className="contact-term-gap" />
                <p>
                  <span className="term-prompt">$</span> <span className="term-cmd">mq send --interactive</span>
                </p>
                <p className="term-output">{t('contact.term_out4')}</p>
                <div className="contact-term-gap" />
                <p>
                  <span className="term-prompt">$</span> <span className="cursor-blink" />
                </p>
              </div>
            </Panel>

            <Panel title="compose.msg">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {fields.map((field) => (
                  <div key={field.id} className="contact-field">
                    <label className="contact-field-label" htmlFor={`contact-${field.id}`}>
                      <span className="contact-field-index">{field.index}</span>
                      <span>{field.label}</span>
                    </label>
                    <div className="contact-input-wrap">
                      <span className="contact-input-prefix">&gt;_</span>
                      <input
                        id={`contact-${field.id}`}
                        className="input"
                        type={field.type}
                        name={field.id}
                        placeholder={field.ph}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className="contact-field">
                  <label className="contact-field-label" htmlFor="contact-message">
                    <span className="contact-field-index">03</span>
                    <span>{t('contact.message')}</span>
                  </label>
                  <div className="contact-input-wrap contact-input-wrap--area">
                    <span className="contact-input-prefix">&gt;_</span>
                    <textarea
                      id="contact-message"
                      className="input contact-textarea"
                      name="message"
                      placeholder={t('contact.message_ph')}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>

                {errorKey && (
                  <p className="contact-error" role="alert">
                    {t(errorKey)}
                  </p>
                )}
              </form>
            </Panel>

            {log.length > 0 && (
              <Panel title={t('contact.log_title')}>
                <div className="contact-log" aria-live="polite">
                  {log.map((entry) => (
                    <p key={entry.id} className="contact-log-line">
                      <span className="contact-log-ts">[{entry.ts}]</span>
                      {entry.text}
                    </p>
                  ))}
                </div>
              </Panel>
            )}
          </Reveal>

          {/* ── Right: channels + telemetry + note.sh ── */}
          <aside className="contact-aside">
            <Reveal delay={140} className="contact-col">
              <Panel title={t('contact.ch_title')} hover>
                <div className="contact-channels">
                  {channels.map((ch) => (
                    <a
                      key={ch.label}
                      className="contact-channel"
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className="contact-channel-icon" src={ch.icon} alt="" />
                      <span className="contact-channel-label">{ch.label}</span>
                      <Tag>{ch.tag}</Tag>
                    </a>
                  ))}
                </div>
              </Panel>

              <Panel title={t('contact.tel_title')} right={<span className="hud">UPLINK</span>}>
                <div className="contact-telemetry">
                  {telemetry.map((row) => (
                    <div key={row.label} className="contact-tel-row">
                      <span className="contact-tel-label">{row.label}</span>
                      <span
                        className={`contact-tel-value${row.ok ? ' contact-tel-value--ok' : ''}${
                          row.mono ? ' contact-tel-value--key' : ''
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="note.sh">
                <div className="contact-term">
                  <p>
                    <span className="term-prompt">$</span> <span className="term-cmd">cat note.txt</span>
                  </p>
                  <div className="contact-term-gap" />
                  <p className="term-output">{t('contact.note1')}</p>
                  <p className="term-output">{t('contact.note2')}</p>
                  <p className="term-output">{t('contact.note3')}</p>
                  <p className="term-output">{t('contact.note4')}</p>
                  <p className="term-output">{t('contact.note5')}</p>
                  <div className="contact-term-gap" />
                  <p className="term-output contact-note-quote">{t('contact.note6')}</p>
                  <p className="term-output contact-note-quote">{t('contact.note7')}</p>
                  <p className="term-output contact-note-quote">{t('contact.note8')}</p>
                  <p className="term-output contact-note-quote">{t('contact.note9')}</p>
                  <p className="term-comment">— J.B.S. Haldane</p>
                  <div className="contact-term-gap" />
                  <p>
                    <span className="term-prompt">$</span> <span className="cursor-blink" />
                  </p>
                </div>
              </Panel>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
