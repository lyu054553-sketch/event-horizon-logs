# Event Horizon Landing Page Prompt Pack

这个 ZIP 是给 Claude Code 用的「像素级还原提示词包」。

包含：

1. `reference_landing_page.jpeg`  
   你上传的 landing page 参考图，Claude Code 需要以它为视觉基准。

2. `01_CLAUDE_CODE_MASTER_PROMPT.md`  
   完整主提示词，适合直接复制给 Claude Code。

3. `02_COPY_PASTE_TO_CLAUDE_CODE.md`  
   更短的可直接粘贴版本。

4. `03_PIXEL_VISUAL_SPEC.md`  
   详细布局、层级、卡片、hero、logo、字体、颜色规格。

5. `04_IMAGE_ASSET_PROMPTS.md`  
   生成 hero 背景、黑洞图、像素宇航员、缩略图等素材的提示词。

6. `05_QA_CHECKLIST.md`  
   Claude Code 实现后对照截图微调用。

7. `06_STARTER_CSS_SNIPPET.md`  
   可直接给 Claude Code 参考的 CSS 片段。

8. `css_tokens.json`  
   颜色、字体、尺寸 token。

参考图尺寸：1024 × 576

推荐使用方法：
- 把整个 ZIP 解压到项目根目录。
- 在 Claude Code 中打开项目。
- 先把 `01_CLAUDE_CODE_MASTER_PROMPT.md` 粘贴给 Claude Code。
- 让 Claude Code 读取 `reference_landing_page.jpeg` 并实现页面。
- 生成 1024×576 截图，对照参考图反复微调。
