# Chrome Web Store 提交指南

## 准备工作清单

### 第 1 步: 准备开发者账户

1. **创建 Google 账户** (如果还没有)
   - 访问 https://accounts.google.com

2. **注册 Chrome Web Store 开发者账户**
   - 访问 https://chrome.google.com/webstore/devconsole
   - 支付 $5 美元注册费 (一次性)
   - 完成开发者协议

### 第 2 步: 准备素材文件

#### 必需文件:
- [x] 扩展包 ZIP 文件 (`3things-extension-v1.0.0.zip`)
- [x] 图标文件 (16x16, 48x48, 128x128)
- [ ] 应用商店截图 (至少 1 张，最多 5 张)
  - 推荐尺寸: 1280x800 或 640x400
  - 格式: PNG 或 JPG

#### 文档准备:
- [x] 隐私政策 (`PRIVACY.md`)
- [x] 商店列表描述 (`STORE_LISTING.md`)
- [ ] 隐私政策公开 URL

### 第 3 步: 制作截图

**方法 1: 使用浏览器开发者工具**
```bash
# 1. 打开扩展的开发模式
npm run dev

# 2. 在 Chrome 中加载扩展
# chrome://extensions/ -> 开发者模式 -> 加载已解压的扩展程序
# 选择 extension/dist 目录

# 3. 打开新标签页，使用 Chrome 截图功能
# Ctrl+Shift+P (Windows) 或 Cmd+Shift+P (Mac)
# 搜索 "Capture full size screenshot"
```

**方法 2: 使用截图工具**
- Windows: Win+Shift+S
- Mac: Cmd+Shift+4
- 第三方工具: Snagit, LightShot

**截图清单:**
1. [ ] 主界面 - 空白状态
2. [ ] 主界面 - 有任务状态
3. [ ] 主界面 - 任务完成状态
4. [ ] 历史记录模态框
5. [ ] Popup 快速查看界面

### 第 4 步: 部署隐私政策

**选项 A: GitHub Pages (推荐)**
```bash
# 1. 创建 gh-pages 分支
git checkout --orphan gh-pages
git rm -rf .

# 2. 创建隐私政策 HTML 页面
# 将 PRIVACY.md 转换为 HTML 并提交

# 3. 推送到 GitHub
git push origin gh-pages

# 4. 在 GitHub 仓库设置中启用 GitHub Pages
# Settings -> Pages -> Source -> gh-pages branch
# URL: https://jwhung.github.io/3things/
```

**选项 B: 添加到 README**
```bash
# 在 README.md 底部添加隐私政策内容
# 或链接到 PRIVACY.md 文件
```

**选项 C: 部署到静态网站托管**
- Netlify: 拖拽文件即可部署
- Vercel: 从 GitHub 导入
- Cloudflare Pages

### 第 5 步: 提交扩展

#### 登录开发者控制台
1. 访问 https://chrome.google.com/webstore/devconsole
2. 点击 "新建项目" (New Item)

#### 上传扩展包
1. 点击 "上传扩展包"
2. 选择 `extension/packages/3things-extension-v1.0.0.zip`
3. 等待上传和初步检查

#### 填写商店列表信息

**店铺图标**
- 如果有 128x128 图标，会上传
- 否则使用 manifest 中的图标

**基本信息**
- **名称:** 3things
- **简介:** 每天只关注三件最重要的事 - 极简任务管理，提升专注力
- **详细描述:** 使用 STORE_LISTING.md 中的内容
- **语言:** 中文 (简体), English

**分类**
- 选择: 生产力 (Productivity)

**语言和区域**
- 添加英文翻译 (在 STORE_LISTING.md 中)

**隐私**
- **隐私政策 URL:** 填写第 4 步中部署的 URL
- **内容安全:** 确认没有收集敏感数据

**截图**
- 上传准备好的截图 (1-5 张)
- 拖拽或点击上传
- 可调整顺序

**图标**
- 验证自动提取的图标 (16, 48, 128)
- 如果需要，可上传自定义的 128x128 商店图标

### 第 6 步: 权限和内容审查

#### 权限声明
当前扩展只使用:
- **storage** - 用于本地存储任务数据

在 "隐私 - 实践" 部分需要说明:
- storage 权限用于保存用户的任务数据
- 所有数据仅存储在用户本地设备
- 不传输任何数据到服务器

#### 内容评级
回答 Chrome Web Store 的内容评级问卷:
- **暴力内容:** 无
- **色情内容:** 无
- **赌博:** 无
- **仇恨言论:** 无
- **其他:** 无

### 第 7 步: 定价和分发

**定价**
- 选择: 免费

**可见性**
- 选择: 公开 (Public)

**分发区域**
- 选择所有可用区域
- 或根据需求选择特定区域

### 第 8 步: 提交审核

#### 最终检查清单:
- [ ] 扩展包已上传
- [ ] 商店列表信息完整
- [ ] 截图已上传 (至少 1 张)
- [ ] 隐私政策 URL 有效且可访问
- [ ] 权限已正确说明
- [ ] 内容评级已完成
- [ ] 扩展功能测试通过

#### 提交:
1. 点击 "提交审核" 按钮
2. 等待 Google 审核团队审核

**审核时间:**
- 通常: 1-3 个工作日
- 最长可能: 5-7 个工作日

**审核状态:**
- **待审核** (Pending) - 正在排队
- **审核中** (In Review) - 正在审核
- **已批准** (Approved) - 已发布
- **被拒绝** (Rejected) - 需要修改后重新提交

### 第 9 步: 审核通过后

#### 发布扩展:
1. 审核通过后会收到邮件通知
2. 扩展会自动发布到 Chrome Web Store
3. 用户可以搜索并安装

#### 推广:
- 分享到社交媒体
- 在 Product Hunt 发布
- 写博客文章介绍
- 提交到 Reddit r/chrome_extensions
- 在 GitHub README 添加商店链接

#### 监控:
- 定期查看安装量和评分
- 回应用户反馈和评论
- 更新扩展修复 bug

## 常见问题

### Q: 审核被拒绝怎么办?
A: 查看拒绝原因，修改后重新提交。常见原因:
- 隐私政策不够详细
- 描述不准确
- 截图不符合要求
- 功能与描述不符

### Q: 如何更新扩展?
A:
1. 修改版本号 (manifest.json)
2. 重新构建和打包
3. 在开发者控制台上传新版本
4. 提交审核

### Q: 审核需要多长时间?
A: 通常 1-3 个工作日，但可能需要更长时间。建议耐心等待。

### Q: 可以发布付费扩展吗?
A: 可以，但需要设置 Google Payments 商家账户。

### Q: 如何添加更多语言?
A: 在商店列表中添加其他语言的描述和截图。

## 提交后维护

### 版本更新
```bash
# 1. 更新版本号 (manifest.json)
"version": "1.0.1"

# 2. 重新构建
npm run build
npm run package

# 3. 提交到 Git
git add .
git commit -m "Bump version to 1.0.1"
git tag v1.0.1
git push origin master --tags

# 4. 在开发者控制台上传新版本
```

### 回复用户评价
- 及时回应用户反馈
- 对负面评价要耐心解释
- 将反馈转化为改进建议

### 监控和分析
- Chrome Web Store 提供基础统计:
  - 安装量
  - 评分和评价
  - 卸载率

## 有用资源

### 官方文档
- [Chrome Web Store 发布指南](https://developer.chrome.com/docs/webstore/)
- [扩展最佳实践](https://developer.chrome.com/docs/webstore/program-policies/)
- [内容安全政策](https://developer.chrome.com/docs/webstore/content-security-policy/)

### 设计资源
- [Chrome 扩展设计指南](https://developer.chrome.com/docs/webstore/brand-and-design/)
- [截图最佳实践](https://developer.chrome.com/docs/webstore/images-screenshots/)

### 社区
- [Chrome 扩展社区](https://groups.google.com/a/chromium.org/g/chromium-extensions)
- [Stack Overflow - chrome-extension](https://stackoverflow.com/questions/tagged/chrome-extension)

## 检查清单总结

**提交前:**
- [ ] 开发者账户已注册 ($5 已支付)
- [ ] 扩展包已构建 (v1.0.0)
- [ ] 图标准备完成 (16, 48, 128)
- [ ] 截图已制作 (至少 1 张)
- [ ] 隐私政策已部署且可访问
- [ ] 商店列表信息已准备
- [ ] 扩展功能已测试
- [ ] Git 仓库已更新并推送

**提交中:**
- [ ] 上传 ZIP 文件
- [ ] 填写基本信息
- [ ] 上传截图
- [ ] 设置分类和关键词
- [ ] 添加隐私政策 URL
- [ ] 完成内容评级
- [ ] 设置定价和分发

**提交后:**
- [ ] 监控审核状态
- [ ] 准备好应对可能的拒绝
- [ ] 计划推广策略
- [ ] 设置用户反馈收集机制
