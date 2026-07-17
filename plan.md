# THE EVENT HORIZON LOGS — 前端审美升级执行计划

## 现状审计结论

**技术栈**: React 19 + Vite 6 + TypeScript + Tailwind CSS v4 (@theme) + motion v12 + react-router-dom v7。无额外动画库需求。

**路由**: `/` Home(独立布局) · `/about` · `/code` · `/contact`(共用 Layout: 星空背景图 + LetterGlitch + 噪声 + 扫描线 + Navbar + footer)。

**背景资源(全部保留,严禁修改 public/ 下任何文件)**:
- 首页 Hero 视频 `backgrounds_home_dark_space.mp4`(0.5x 播放)
- 首页第二屏视频 `backgrounds_astronaut_falling.mp4`(IntersectionObserver 控制)
- About `backgrounds_about_dark_space.png` / Code `backgrounds_code_dark_space_v2.png` / Contact `backgrounds_contact_dark_space_v2.png`
- 全站 `backgrounds_site_starfield.png` + SVG 噪声 + CSS 扫描线
- 已记录 41 个资源文件 MD5 → /tmp/eh-assets-checksum-before.txt

**识别到的审美/工程问题**:
1. About/Code/Contact 全部使用内联样式 + `borderRadius: 20` 的圆角卡片 → SaaS 感,与终端档案馆气质冲突;内联样式无法写媒体查询 → 移动端网格不坍塌,布局实际损坏。
2. 状态色 `#4ade80`(亮绿)、`#f87171`(亮红)饱和度过高,违反低饱和色系规则。
3. 导航在 <768px 时 `display:none`,移动端无任何导航入口(四个页面全部受影响)。
4. 无 prefers-reduced-motion 支持;无 :focus-visible 键盘焦点样式;表单无焦点态。
5. 首页视频区文案("Exploring the Cosmos" 等)硬编码英文,未走 i18n;Code 页项目数据硬编码中文;Contact 错误提示硬编码英文。
6. 无页面转场;内页仅有 motion 入场,无滚动揭示系统。
7. 首页 Hero 缺乏观测终端数据层(坐标/时间戳/信号状态),导航不像主控菜单。

## 设计系统契约(Stage 1 产出,Stage 2 全员遵守)

- 扩展(不重建)@theme 变量:新增 `--color-line / --color-line-strong / --color-panel / --color-accent-dim / --color-ok(去饱和青,替代#4ade80) / --color-warn / --color-err(替代#f87171) / --font-serif(Playfair)`;直角或 ≤3px 圆角;废除 20px 圆角。
- index.css 提供共享类:`.panel`(细线边框+backdrop-blur+角落括号刻度)、`.panel-header`、`.tag`、`.btn/.btn-primary`、`.input`、`.section-label`、`.page-title`、`.reveal/.is-visible`(滚动揭示)、`:focus-visible` 全局焦点、`prefers-reduced-motion` 全局降级。
- `src/components/ui.tsx` 提供:`<Reveal>`(IntersectionObserver)、`<Panel>`、`<Tag>`、`<PageHeader>`、`usePrefersReducedMotion()`。
- i18n 分包契约:每页 `src/i18n/<page>.ts` 导出 `Record<'en'|'zh', Record<string,string>>`;chrome worker 在 i18n.tsx 中合并。所有新文案必须双语。

## Stage 划分

- **Stage 1(串行)**: `DesignSystem_Engineer`(coder)— 重写 index.css 全局系统 + 新建 src/components/ui.tsx + 构建验证。
- **Stage 2(5 个并行 coder,文件域严格不相交)**:
  1. `Home_Designer` — pages/Home.tsx, components/LeoMark.tsx, styles/home.css, i18n/home.ts。Hero HUD(坐标/UTC 时钟/信号态)、LEO 标志描边入场、探索感滚动提示、视频区展览章节化、悬浮终端 hover 增亮。
  2. `About_Designer` — pages/About.tsx, styles/about.css, i18n/about.ts。宇航员/程序员观测档案:身份模块、规格表、终端块渐进揭示、状态标签。
  3. `Code_Designer` — pages/Code.tsx, styles/code.css, i18n/code.ts。探测器编号卡片、扫描聚焦 hover、项目元数据层、移动端免 hover 可读。
  4. `Contact_Designer` — pages/Contact.tsx, styles/contact.css, i18n/contact.ts。深空传输终端表单:焦点/校验/发送态、双语错误、频道与遥测面板。
  5. `Chrome_Designer` — components/Navbar.tsx, components/Layout.tsx, i18n.tsx, i18n/chrome.ts。航天主控菜单式导航 + 移动端全屏菜单、页面转场、背景层降噪。
- **Stage 3(串行)**: `Integration_QA`(coder)— 构建修复、dev server 全路由检查、桌面/移动截图走查、响应式与 TS 修复、资源 MD5 比对确认未改动。

## 红线(所有 worker)
- 不得修改/替换/重新生成 public/ 下任何背景图、视频、图标、缩略图。
- 不得新建平行项目、改路由结构、换框架。
- 不得引入高饱和霓虹色(紫/粉/绿/橙)、emoji 装饰、SaaS 渐变 Hero。
- 动画克制:慢启动、自然减速、低幅度;支持 prefers-reduced-motion。
- 视频保持 muted/loop/playsInline + IntersectionObserver。
