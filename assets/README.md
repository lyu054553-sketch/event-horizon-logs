# THE EVENT HORIZON LOGS — Image Component Pack

包含：
- backgrounds：整站背景、首页黑洞背景、联系页背景、天文日志横幅
- sprites：像素宇航员
- thumbnails：项目卡片/日志卡片缩略图
- overlays：左右代码残影
- icons：SVG 图标
- ui：面板框、遥测图组件

推荐用法：
```css
body {
  background: #050A0F url('./backgrounds_site_starfield.png') center/cover fixed;
  color: #C7D3E0;
}
.card {
  background: rgba(8,14,20,.72);
  border: 1px solid rgba(154,178,199,.22);
  backdrop-filter: blur(6px);
}
```
