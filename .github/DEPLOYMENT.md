# CI/CD 部署指南

## 工作流程说明

本项目使用 GitHub Actions 自动构建和发布浏览器扩展程序，支持 Chrome 和 Firefox 两个平台。

### 触发条件

- Push 到 `main` 或 `dev` 分支
- 针对 `main` 或 `dev` 分支的 Pull Request
- 手动触发 (`workflow_dispatch`)

### 构建任务

1. **build-for-chrome**: 构建 Chrome 扩展程序
2. **build-for-firefox**: 构建 Firefox 附加组件
3. **publish-to-chrome-webstore**: 发布到 Chrome Web Store (仅 main 分支)
4. **publish-to-firefox-addons**: 发布到 Firefox Add-ons (仅 main 分支)
5. **create-github-release**: 创建 GitHub Release (仅 main 分支)

## 必需的 Secrets 配置

### Chrome Web Store Secrets

在 GitHub 仓库的 **Settings > Secrets and variables > Actions** 中添加以下 Secrets:

| Secret 名称 | 说明 | 获取方式 |
|------------|------|---------|
| `CHROME_EXTENSION_ID` | Chrome 扩展 ID | Chrome Web Store 开发者控制台 (例如: `abcdefghijklmnopabcdefghijklmnopqrstuvwxyz`) |
| `CHROME_CLIENT_ID` | OAuth 客户端 ID | Google Cloud Console (例如: `123456789-abcdefg.apps.googleusercontent.com`) |
| `CHROME_CLIENT_SECRET` | OAuth 客户端密钥 | Google Cloud Console (例如: `GOCSPX-xxxxxxxxxxxx`) |
| `CHROME_REFRESH_TOKEN` | OAuth 刷新令牌 | 通过 OAuth 流程获取 (例如: `1//0xxxxxxxxxxxx`) |

#### 获取 Chrome Web Store 凭证

1. **创建 OAuth 客户端 ID**:
   - 访问 [Google Cloud Console](https://console.cloud.google.com/)
   - 创建新项目或选择现有项目
   - 启用 "Chrome Web Store API"
   - 创建 OAuth 2.0 凭证 (应用程序类型: 其他)

2. **生成刷新令牌**:
   ```bash
   # 使用 chrome-webstore-upload-cli 工具
   npx chrome-webstore-upload-cli \
     --client-id YOUR_CLIENT_ID \
     --client-secret YOUR_CLIENT_SECRET \
     --extension-id YOUR_EXTENSION_ID \
     --refresh-token
   ```
   按照提示完成 OAuth 流程后，会获得刷新令牌。

### Firefox Add-ons Secrets

| Secret 名称 | 说明 | 获取方式 |
|------------|------|---------|
| `FIREFOX_API_KEY` | JWT 发行者 | Firefox Add-ons 开发者中心 (例如: `user:123456:789`) |
| `FIREFOX_API_SECRET` | JWT 密钥 | Firefox Add-ons 开发者中心 (例如: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`) |

#### 获取 Firefox Add-ons 凭证

1. 访问 [Firefox Add-ons 开发者中心](https://addons.mozilla.org/developers/)
2. 登录并进入开发者账户
3. 找到 "API 凭证" 部分
4. 复制 JWT Issuer 和 JWT Secret

## 本地构建测试

在推送代码之前，可以在本地测试构建流程:

```bash
cd extension

# 安装依赖
npm install

# 构建 Chrome 版本
npm run build:chrome
npm run package:chrome

# 构建 Firefox 版本
npm run build:firefox
npm run package:firefox
```

构建完成后，会在 `extension` 目录下生成以下文件:
- `3things-chrome.zip` - Chrome 扩展包
- `3things-firefox.zip` - Firefox 附加组件包

## 首次发布

### Chrome Web Store

1. 上传 `3things-chrome.zip` 到 Chrome Web Store
2. 填写商店信息（名称、描述、分类等）
3. 上传截图和图标
4. 提交审核
5. 审核通过后，后续版本可以使用 CI/CD 自动发布

### Firefox Add-ons

1. 访问 [Firefox Add-ons 开发者中心](https://addons.mozilla.org/developers/)
2. 点击 "提交新扩展"
3. 上传 `3things-firefox.zip`
4. 填写扩展信息和描述
5. 提交审核
6. 首次审核后，配置 CI/CD Secrets 即可实现自动发布

## 版本管理

当前版本策略使用 GitHub Actions 运行次数作为版本号:

```yaml
tag_name: v${{ github.run_number }}
```

例如: `v1`, `v2`, `v3` ...

如需使用语义化版本，可以修改 `.github/workflows/build.yml` 中的版本策略。

## 故障排查

### 构建失败

1. 检查 Node.js 版本是否为 22
2. 确认 `package-lock.json` 存在于 `extension/` 目录
3. 验证构建脚本是否正常

### 发布失败

1. 检查 Secrets 是否正确配置
2. 确认 API 凭证是否有效
3. 验证扩展程序在对应商店中是否存在

### Firefox 扩展 ID 配置

在 `extension/scripts/prebuild-firefox.mjs` 中配置 Firefox 扩展 ID:

```javascript
firefoxManifest.browser_specific_settings = {
  gecko: {
    id: '<firefox-id-here>', // 修改为你的扩展 ID，例如: 'myextension@example.com'
    strict_min_version: '115.0',
  },
};
```

**注意**:
- Firefox 扩展 ID 使用电子邮件格式，例如: `myextension@example.com`
- 首次发布到 Firefox Add-ons 后，这个 ID 就固定了，不要随意修改
- 开发阶段可以使用临时 ID，发布前确认即可

## 参考资源

- [Chrome Web Store API 文档](https://developer.chrome.com/docs/webstore/)
- [Firefox Web-ext 文档](https://github.com/mozilla/web-ext)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
