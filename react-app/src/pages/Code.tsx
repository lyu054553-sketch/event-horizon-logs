import { useState } from 'react';
import { useI18n } from '../i18n';
import { Reveal, Panel, Tag, PageHeader } from '../components/ui';
import '../styles/code.css';

interface Project {
  /** exploration number, e.g. EXP-001 */
  id: string;
  titleKey: string;
  descKey: string;
  updatedKey: string;
  extraKey: string;
  tags: string[];
  thumb: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'EXP-001',
    titleKey: 'code.p1.title',
    descKey: 'code.p1.desc',
    updatedKey: 'code.p1.updated',
    extraKey: 'code.p1.extra',
    tags: ['Web', 'Landing Page', 'Healthcare'],
    thumb: '/assets/thumbnails_medical_companion.png',
    link: '/assets/medical-companion.html',
  },
  {
    id: 'EXP-002',
    titleKey: 'code.p2.title',
    descKey: 'code.p2.desc',
    updatedKey: 'code.p2.updated',
    extraKey: 'code.p2.extra',
    tags: ['Web3', 'Resource', 'Education'],
    thumb: '/assets/thumbnails_web3_hub.png',
    link: '/assets/web3-hub.html',
  },
];

export default function Code() {
  const { t } = useI18n();
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background image — narrative layer, fades in on load */}
      <img
        src="/assets/backgrounds_code_dark_space_v2.png"
        alt=""
        onLoad={() => setBgLoaded(true)}
        className={`code-bg${bgLoaded ? ' is-loaded' : ''}`}
      />
      {/* Vignette overlay */}
      <div className="code-vignette" />

      <div className="code-container">
        <PageHeader
          label={t('code.label')}
          title={t('code.title')}
          desc={t('code.desc')}
        />

        <div className="code-grid">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 140}>
              <Panel className="probe-card">
                {/* ghost exploration number — background layer */}
                <span className="probe-ghost" aria-hidden="true">
                  {project.id}
                </span>

                {/* thumbnail: 16:9 hairline frame, single scanline sweep on hover */}
                <div className="probe-thumb-wrap">
                  <img
                    className="probe-thumb"
                    src={project.thumb}
                    alt={t(project.titleKey)}
                    loading="lazy"
                  />
                </div>

                {/* info layer */}
                <div className="probe-body">
                  <div className="probe-status-row">
                    <Tag tone="ok">{t('code.status.active')}</Tag>
                    <span className="hud">{project.id}</span>
                  </div>

                  <h3 className="probe-title">{t(project.titleKey)}</h3>
                  <p className="probe-desc">{t(project.descKey)}</p>

                  <div className="probe-tags">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  {/* extra telemetry row — hover-revealed on desktop,
                      always visible on touch / mobile */}
                  <p className="probe-extra hud">{t(project.extraKey)}</p>

                  <div className="probe-foot">
                    <div className="probe-meta">
                      <span className="hud">{project.id}</span>
                      <span className="hud probe-meta-dot" aria-hidden="true">
                        ·
                      </span>
                      <span className="hud">{t(project.updatedKey)}</span>
                    </div>
                    <a className="btn" href={project.link}>
                      {t('code.btn')}
                    </a>
                  </div>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
