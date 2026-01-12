# 构建指南

## 本地开发

### 安装依赖

```bash
cd extension
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 进行开发。

## 构建

### Chrome 扩展

```bash
npm run build:chrome
```

构建产物位于 `dist/` 目录，可以直接加载到 Chrome 浏览器。

### Firefox 附加组件

```bash
npm run build:firefox
```

构建产物位于 `dist/` 目录，可以直接加载到 Firefox 浏览器。

### 默认构建

如果只运行 `npm run build`，默认构建 Chrome 版本：

```bash
npm run build
# 等同于 npm run build:chrome
```

## 打包

### Chrome 扩展包

```bash
npm run package:chrome
```

生成 `3things-chrome.zip` 文件，用于上传到 Chrome Web Store。

### Firefox 附加组件包

```bash
npm run package:firefox
```

生成 `3things-firefox.zip` 文件，用于上传到 Firefox Add-ons。

## 构建流程说明

### Chrome 构建流程

1. **prebuild-chrome.mjs**: 准备 Chrome 专用的 manifest.json
2. **vite build**: 使用 Vite 构建项目
3. **copy-manifest.mjs**: 复制 manifest 和图标到 dist 目录

### Firefox 构建流程

1. **prebuild-firefox.mjs**: 修改 manifest.json 以适配 Firefox
   - 将 `action` 改为 `browser_action`
   - 添加 `browser_specific_settings.gecko` 配置
2. **vite build**: 使用 Vite 构建项目
3. **copy-manifest.mjs**: 复制 manifest 和图标到 dist 目录

## 构建脚本

所有脚本位于 `extension/scripts/` 目录：

| 脚本 | 说明 |
|------|------|
| `prebuild-chrome.mjs` | Chrome 构建前准备 |
| `prebuild-firefox.mjs` | Firefox 构建前准备 |
| `copy-manifest.mjs` | 复制 manifest 和图标 |
| `package-chrome.mjs` | 打包 Chrome 扩展 |
| `package-firefox.mjs` | 打包 Firefox 附加组件 |
| `package.mjs` | 通用打包脚本 |

## 浏览器差异处理

### manifest.json 差异

**Chrome**:
```json
{
  "action": {
    "default_popup": "popup.html"
  }
}
```

**Firefox**:
```json
{
  "browser_action": {
    "default_popup": "popup.html"
  },
  "browser_specific_settings": {
    "gecko": {
      "id": "3things@firefox-addon.astrian.moe",
      "strict_min_version": "115.0"
    }
  }
}
```

## 安装到浏览器

### Chrome/Edge

1. 运行 `npm run build:chrome`
2. 打开浏览器扩展管理页面
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `extension/dist/` 目录

### Firefox

1. 运行 `npm run build:firefox`
2. 打开 `about:debugging#/runtime/this-firefox`
3. 点击"临时加载附加组件"
4. 选择 `extension/dist/manifest.json`

## CI/CD

项目配置了 GitHub Actions 自动构建和发布，详见 [`.github/workflows/build.yml`](../.github/workflows/build.yml)。

配置说明见 [`.github/DEPLOYMENT.md`](../.github/DEPLOYMENT.md)。
