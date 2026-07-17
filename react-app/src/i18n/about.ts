/* ─────────────────────────────────────────────────────────────────
   ABOUT PAGE (bio_func) — i18n sub-package · About_Designer scope
   Merged into the root dictionary by the i18n integrator.
   Do NOT edit src/i18n.tsx from this worker.
   Existing about.* keys (role/bio/tags/terminal content) live in the
   root dictionary; only NEW dossier chrome copy is declared here.
   ───────────────────────────────────────────────────────────────── */

const strings: Record<'en' | 'zh', Record<string, string>> = {
  en: {
    /* dossier meta bar (below page header) */
    'about.dossier_no': 'PERSONNEL DOSSIER // LEO-001',
    'about.clearance': 'CLEARANCE: PUBLIC // REV 2026.1',

    /* module headers (panel titles) */
    'about.file_identity': 'FILE 01 — IDENTITY',
    'about.file_spec': 'FILE 02 — SPEC',
    'about.file_whoami': 'FILE 03 — WHOAMI.SH',
    'about.file_tools': 'FILE 04 — TOOLS.ENV',
    'about.file_domains': 'FILE 05 — DOMAINS.JSON',

    /* panel header right slots */
    'about.identity_no': 'ID: OBSERVER-LEO',
    'about.spec_right': 'TELEMETRY · SYNCED',
    'about.term1_right': 'TTY · SESSION OPEN',
    'about.term2_right': 'ENV · LOADED',
    'about.term3_right': 'JSON · VALID',

    /* record footer */
    'about.end_record': '— END OF RECORD —',
  },
  zh: {
    /* 档案元信息条（页头下方） */
    'about.dossier_no': '人员档案 // LEO-001',
    'about.clearance': '密级：公开 // 版本 2026.1',

    /* 模块标题（面板头部） */
    'about.file_identity': '档案 01 — 身份',
    'about.file_spec': '档案 02 — 参数',
    'about.file_whoami': '档案 03 — WHOAMI.SH',
    'about.file_tools': '档案 04 — TOOLS.ENV',
    'about.file_domains': '档案 05 — DOMAINS.JSON',

    /* 面板头部右侧插槽 */
    'about.identity_no': '编号：OBSERVER-LEO',
    'about.spec_right': '遥测 · 已同步',
    'about.term1_right': '终端 · 会话开启',
    'about.term2_right': '环境 · 已加载',
    'about.term3_right': 'JSON · 有效',

    /* 档案页脚 */
    'about.end_record': '— 档案结束 —',
  },
};

export default strings;
