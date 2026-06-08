import { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const projects = [
  { title: 'Medical Companion · 安心陪诊', desc: '一人就医，双向安心。全流程陪诊服务产品页面，包含用户痛点分析、服务流程、功能演示与竞品对比。', tags: ['Web', 'Landing Page', 'Healthcare'], status: 'Active', statusColor: '#4ade80', thumb: '/assets/thumbnails_medical_companion.png', link: '/assets/medical-companion.html' },
  { title: 'Web3 Resource Hub · 学习资源大全', desc: '精选全球80+优质Web3学习资源，覆盖入门、DeFi、安全、钱包、工具等8大分类，中英双语，支持搜索与筛选。', tags: ['Web3', 'Resource', 'Education'], status: 'Active', statusColor: '#4ade80', thumb: '/assets/thumbnails_web3_hub.png', link: '/assets/web3-hub.html' },
];

export default function Code() {
  const { t } = useI18n();
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background image */}
      <img
        src="/assets/backgrounds_code_dark_space_v2.png"
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
        {t('code.label')}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, color: 'var(--color-text-bright)', letterSpacing: 2, marginBottom: '1rem' }}>
        {t('code.title')}
      </h2>
      <div style={{ width: 60, height: 1, background: 'var(--color-accent)', marginBottom: '2rem' }} />
      <p style={{ color: 'var(--color-muted)', fontSize: 13, maxWidth: 600, marginBottom: '3rem' }}>
        {t('code.desc')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px var(--color-accent-glow)' }}
            style={{
              background: 'rgba(5, 10, 15, 0.55)',
              border: '1px solid rgba(160, 180, 200, 0.16)',
              borderRadius: 20,
              padding: '1.5rem',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              transition: 'all 0.35s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
          >
            <img
              src={project.thumb}
              alt={project.title}
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 14, border: '1px solid rgba(160, 180, 200, 0.16)', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span
                style={{
                  padding: '0.15rem 0.5rem',
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: project.statusColor,
                  border: `1px solid ${project.statusColor}33`,
                  borderRadius: 2,
                  background: `${project.statusColor}0a`,
                }}
              >
                {project.status}
              </span>
            </div>
            <h3 style={{ fontSize: 14, color: 'var(--color-text-bright)', marginBottom: '0.5rem' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              {project.desc}
            </p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.15rem 0.5rem',
                    fontSize: 9,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.3rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 2,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
            >
              {t('code.btn')}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}
