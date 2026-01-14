# 环境变量配置说明

## 为什么使用环境变量？

**安全问题**: API Secret 是敏感信息，不应该直接写在代码中，特别是要开源的项目。

**解决方案**: 使用 `.env` 文件存储敏感配置，该文件会被 `.gitignore` 忽略，不会被提交到 Git。

## 文件说明

### 1. `.env.example` - 模板文件

这个文件会提交到 Git，告诉其他开发者需要配置哪些环境变量：

```bash
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA4_API_SECRET=YOUR_API_SECRET
```

### 2. `.env` - 实际配置文件

这个文件**不会**提交到 Git，包含你的真实配置：

```bash
VITE_GA4_MEASUREMENT_ID=G-N5MX387VD0
VITE_GA4_API_SECRET=LMt-32-HSDCmtK_7iQZZ9Q
```

### 3. `.gitignore` - 忽略配置

确保 `.env` 文件不会被提交：

```
.env
.env.local
.env.*.local
```

## 如何使用

### 首次设置

1. 复制模板文件：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，填入你的真实配置：
   ```bash
   VITE_GA4_MEASUREMENT_ID=你的MeasurementID
   VITE_GA4_API_SECRET=你的API密钥
   ```

3. 重新构建：
   ```bash
   npm run build
   ```

### 开发模式

开发模式下 analytics 默认**禁用**，不需要配置：

```typescript
const ENABLE_ANALYTICS = import.meta.env.MODE === 'production';
```

### 生产模式

生产模式下会从 `.env` 读取配置并启用 analytics。

## 如何获取 GA4 配置

### 1. 创建 GA4 属性

访问 https://analytics.google.com/ 并创建新属性

### 2. 创建数据流

1. Admin → Data Streams → Add stream → Website
2. 复制 **Measurement ID**（格式：G-XXXXXXXXXX）

### 3. 创建 API Secret

1. 进入数据流详情
2. 滚动到 **Measurement Protocol** 部分
3. 点击 **API secrets** 链接
4. 点击 **+ Create**
5. 复制生成的 **Secret value**

⚠️ **重要**: API Secret 只会显示一次，请立即保存！

## 安全注意事项

### ✅ 做什么

- ✅ 将 `.env.example` 提交到 Git（模板）
- ✅ 将 `.env` 添加到 `.gitignore`（真实配置）
- ✅ 定期轮换 API Secret
- ✅ 在 README 中说明如何配置

### ❌ 不要做什么

- ❌ 不要将 `.env` 提交到 Git
- ❌ 不要在代码中硬编码密钥
- ❌ 不要在公开文档中泄露密钥
- ❌ 不要将密钥提交到 Issue 或 PR

## 检查配置

### 验证密钥是否被忽略

```bash
# 检查 .gitignore
cat .gitignore | grep .env

# 应该看到:
# .env
# .env.local
# .env.*.local
```

### 验证密钥不会提交

```bash
# 检查 Git 状态
git status

# .env 不应该出现在未跟踪文件中
```

### 强制检查（如果已提交）

如果 `.env` 已经被提交，需要从 Git 历史中移除：

```bash
# 从 Git 中移除
git rm --cached .env

# 提交删除
git commit -m "Remove .env from git"

# 确保 .gitignore 包含 .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

## 故障排除

### 问题：构建后 analytics 不工作

**原因**：
1. `.env` 文件不存在
2. 环境变量格式错误
3. 不是 production 模式

**解决**：
1. 确保 `.env` 文件存在并配置正确
2. 检查格式：`VITE_` 前缀是必需的
3. 生产模式使用 `npm run build`

### 问题：开发时无法测试 analytics

**原因**：Analytics 默认只在 production 模式启用

**解决**：临时修改 `src/lib/analytics.ts`：
```typescript
// 开发测试时
const ENABLE_ANALYTICS = true;

// 发布前改回
const ENABLE_ANALYTICS = import.meta.env.MODE === 'production';
```

### 问题：密钥泄露了怎么办？

**立即行动**：
1. 在 GA4 中删除旧的 API Secret
2. 创建新的 API Secret
3. 更新 `.env` 文件
4. 重新构建扩展
5. 检查 GitHub 历史是否有泄露
   - 如果有，考虑 [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) 清理历史

## 相关文件

- `.env` - 你的配置（不要提交）
- `.env.example` - 配置模板（会提交）
- `src/lib/analytics.ts` - 使用配置的代码
- `src/vite-env.d.ts` - TypeScript 类型定义
- `.gitignore` - 确保 `.env` 被忽略

## 更多资源

- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [Git 忽略文件](https://git-scm.com/docs/gitignore)

---

**最后更新**: 2025-01-14
**版本**: 1.0.0
