# 发布指南

## 如何发布新版本

### 1. 更新版本号

编辑 `extension/package.json`：
```json
{
  "version": "1.0.1"  // 修改版本号
}
```

### 2. 构建并打包

```bash
cd extension
npm run build
npm run package
```

这会创建一个 ZIP 文件在 `extension/packages/` 目录下。

### 3. 创建 GitHub Release

1. 访问 GitHub 仓库的 Releases 页面
2. 点击 "Draft a new release"
3. 填写版本标签（如 `v1.0.1`）
4. 上传 ZIP 文件（从 `extension/packages/` 目录）
5. 填写 Release Notes

### 4. Release Notes 模板

```markdown
## 🎉 What's New

### Features
- 新功能 1
- 新功能 2

### Improvements
- 改进 1
- 改进 2

### Bug Fixes
- 修复的问题 1
- 修复的问题 2

## 📦 Installation

### Method 1: Download ZIP
1. Download `3things-extension-v1.0.1.zip` below
2. Extract the ZIP file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extracted folder

### Method 2: Build from Source
```bash
git clone https://github.com/jwhung/3things.git
cd 3things/extension
npm install
npm run build
```

Then load `extension/dist` in Chrome.

## 📋 Full Changelog
See [CHANGELOG.md](https://github.com/jwhung/3things/blob/main/CHANGELOG.md) for details.
```

---

## Chrome Web Store 发布（可选）

### 准备工作

1. **注册开发者账号**
   - 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - 支付 $5 一次性费用

2. **准备素材**
   - 图标：128x128 px（必需）
   - 截图：1280x800 px 或 640x400 px（至少 1 张）
   - 详细描述
   - 隐私政策（可以在 GitHub Pages 上托管）

### 上传步骤

1. **打包扩展**
   ```bash
   cd extension
   npm run build
   ```
   - 注意：Chrome Web Store 需要 ZIP 文件，不是 .crx 文件

2. **上传到 Developer Dashboard**
   - 创建新项目
   - 上传 ZIP 文件
   - 填写商店信息：
     - 名称：3things
     - 描述：简短描述（最多 132 字符）
     - 详细说明：完整功能介绍
     - 分类：生产力工具
     - 语言：English

3. **填写隐私信息**
   - 说明数据存储在本地
   - 不收集用户数据
   - 不使用第三方分析工具

4. **提交审核**
   - 检查所有必填项
   - 提交审核
   - 等待 Google 审核（通常 1-3 个工作日）

---

## 快速分享给朋友

如果你只是想快速分享给朋友或团队：

1. **打包**
   ```bash
   npm run package
   ```

2. **分享 ZIP 文件**
   - 将 `extension/packages/3things-extension-v*.zip` 发送给朋友
   - 附上安装说明（见 `INSTALL.md`）

3. **或者使用云存储**
   - 上传 ZIP 到 Google Drive、Dropbox 等
   - 分享下载链接

---

## 版本号规范

遵循语义化版本（Semantic Versioning）：

- **MAJOR.MINOR.PATCH**（如 1.0.0）
  - **MAJOR**：不兼容的 API 变更
  - **MINOR**：向后兼容的新功能
  - **PATCH**：向后兼容的问题修复

示例：
- `1.0.0` → `1.0.1`：Bug 修复
- `1.0.1` → `1.1.0`：新增功能
- `1.1.0` → `2.0.0`：重大变更

---

## 更新日志维护

每次发布后更新 `CHANGELOG.md`：

```markdown
## [1.0.1] - 2026-01-11

### Added
- New feature 1

### Changed
- Improvement 1

### Fixed
- Bug fix 1
```

---

## 注意事项

⚠️ **重要提醒**：

1. **备份 .pem 文件**：如果你使用 Chrome 的"打包扩展"功能生成 .crx 文件，会生成一个 .pem 私钥文件。请妥善保管这个文件，以后更新扩展时需要使用相同的私钥。

2. **不要提交 .pem 文件到 Git**：.pem 文件应该加入 `.gitignore`。

3. **Chrome Web Store 审核**：
   - 确保扩展功能正常
   - 准备清晰的截图
   - 提供详细的描述
   - 遵守 Chrome Web Store 政策

4. **更新版本号**：每次发布前记得更新 `manifest.json` 和 `package.json` 中的版本号。

---

**Happy Publishing! 🚀**
