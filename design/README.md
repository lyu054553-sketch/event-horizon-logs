# THE EVENT HORIZON LOGS — Complete Landing Page Pack

这个包包含两部分：

## 1. assets_image_components/

这里是 landing page 需要用到的图片组件，包括：

- hero 黑洞背景
- starfield 背景
- contact / astronomy 页面背景
- pixel astronaut 像素宇航员
- black hole / deep field / nebula / star trail 项目缩略图
- code overlay 代码残影
- SVG icons
- UI panel / telemetry 面板
- manifest.json

这些可以直接放进项目的 `public/assets/` 或 `src/assets/`。

## 2. claude_code_prompts/

这里是给 Claude Code 的像素级还原提示词：

- 主提示词
- 可直接复制版本
- 像素级视觉说明
- 图片生成提示词
- QA 微调清单
- CSS token
- starter CSS

## 3. extra_generated_mockups/

这里是之前生成的额外视觉图，包括：

- 整体 landing hero mockup
- logo 图
- 像素宇航员图
- 黑洞横幅图
- 星空宇航员图
- 终端宇航员面板图

## 推荐用法

1. 把 `assets_image_components/` 复制到你的项目资产目录。
2. 把 `claude_code_prompts/01_CLAUDE_CODE_MASTER_PROMPT.md` 发给 Claude Code。
3. 告诉 Claude Code：图片组件已经在 `assets_image_components/`，不要重新瞎生成。
4. 让它按参考图 `reference_landing_page.jpeg` 和这些素材还原 landing page。
