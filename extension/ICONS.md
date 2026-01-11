# 3Things 扩展图标生成指南

## 快速生成图标

### 方法 1: 使用 HTML 生成器 (推荐)

1. 在浏览器中打开 `extension/public/icons/generate-icons.html`
2. 点击每个图标即可自动下载对应的 PNG 文件
3. 将下载的文件放到 `extension/public/icons/` 目录:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

### 方法 2: 手动保存

1. 在浏览器中打开 `extension/public/icons/generate-icons.html`
2. 右键点击每个图标,选择"图片另存为..."
3. 保存为对应的文件名

### 方法 3: 使用在线工具

访问 https://favicon.io/ 或其他在线图标生成工具:
- 上传 `icon.svg`
- 选择需要的尺寸 (16x16, 48x48, 128x128)
- 下载生成的 PNG 文件

## 图标设计规范

- **尺寸**: 16x16, 48x48, 128x128 pixels
- **格式**: PNG (支持透明背景)
- **主色**: 渐变 `#c9b8a8` → `#b5a092` → `#9d8977`
- **内容**: 白色数字 "3"
- **形状**: 圆角矩形 (圆角半径约为尺寸的 18.75%)

## 验证图标

生成图标后,确保:
- ✅ 文件名正确 (icon16.png, icon48.png, icon128.png)
- ✅ 文件位置正确 (extension/public/icons/)
- ✅ 图标清晰可见
- ✅ 在不同背景下都能看清

## 自动复制到 dist

构建时会自动将图标复制到 `dist/icons/` 目录,无需手动操作。
