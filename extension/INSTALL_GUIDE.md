# 🚀 3Things Extension - 快速开始

## 构建 ✅ 完成

扩展已成功构建到 `extension/dist` 目录!

## 📦 文件清单

```
extension/dist/
├── manifest.json       ✅ 扩展配置
├── newtab.html         ✅ 新标签页
├── newtab.js          ✅ 应用逻辑 (308KB)
├── newtab.css         ✅ 样式文件 (20KB)
├── popup.html         ✅ 弹出页面
├── icons/
│   ├── icon.svg       ✅ SVG 图标
│   └── generate-icons.html  🎨 图标生成工具
└── jsx-runtime.js     ✅ React 运行时
```

## 🔧 在 Chrome 中安装

### Windows
1. 按 `Win + R`,输入 `chrome://extensions/`
2. 开启右上角"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 浏览到: `d:\Code\3things\extension\dist`
5. 点击"选择文件夹"

### macOS / Linux
1. 在 Chrome 中访问 `chrome://extensions/`
2. 开启右上角"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择文件夹: `~/Code/3things/extension/dist`
5. 点击"打开"

## ✨ 测试功能

安装成功后,打开新标签页应该看到:

1. **3Things 标题** - 优雅的渐变色标题
2. **今日进度条** - 显示完成进度
3. **待办列表** - 最多添加 3 个任务
4. **输入框** - 添加新任务
5. **每日语录** - 激励文字
6. **历史记录按钮** - 右上角

### 键盘快捷键
- `Ctrl/Cmd + H` - 打开历史记录
- `Esc` - 关闭弹窗

## 🎨 生成更好看的图标 (可选)

当前只有 SVG 图标,生成 PNG 图标效果更好:

1. **打开工具**: 双击 `extension/public/icons/generate-icons.html`
2. **下载图标**: 点击三个尺寸的图标
3. **保存文件**:
   ```
   extension/public/icons/icon16.png
   extension/public/icons/icon48.png
   extension/public/icons/icon128.png
   ```
4. **重新构建**:
   ```bash
   npm run build
   ```
5. **重新加载**: 在 Chrome 中点击扩展的"刷新"按钮

## 🐛 故障排除

### 问题 1: 扩展无法加载
**解决**:
- 检查 `manifest.json` 是否在 `dist` 目录
- 确保 Chrome 版本 >= 88
- 查看错误信息: 点击扩展卡片上的"错误"按钮

### 问题 2: 新标签页空白
**解决**:
- 打开开发者工具 (F12) 查看控制台错误
- 检查 `newtab.js` 是否正确加载
- 尝试禁用其他可能冲突的扩展

### 问题 3: 图标显示不正确
**解决**:
- 使用 `generate-icons.html` 生成 PNG 图标
- 确保图标文件名为: icon16.png, icon48.png, icon128.png
- 重新构建并重新加载扩展

### 问题 4: 数据不保存
**解决**:
- 检查浏览器是否允许扩展使用存储
- 尝试刷新页面
- 查看控制台是否有错误信息

## 📱 使用技巧

1. **每日三件事**: 专注于最重要的 3 个任务
2. **历史记录**: 查看 `Ctrl/Cmd + H` 了解过去的完成情况
3. **数据保留**: 自动保留最近 30 天的数据
4. **本地存储**: 所有数据存储在本地,保护隐私

## 🎯 下一步

- [x] 安装扩展
- [x] 测试基本功能
- [ ] 生成 PNG 图标
- [ ] 添加每日任务
- [ ] 查看历史记录
- [ ] 享受专注生活!

---

**需要帮助?** 查看 [TODO.md](../../TODO.md) 或 [CLAUDE.md](../../CLAUDE.md)
