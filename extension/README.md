# 3Things Chrome Extension

每天只需要关注三件最重要的事情的浏览器启动页插件。

## 开发

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

### 构建

\`\`\`bash
npm run build
\`\`\`

构建完成后,在 Chrome 浏览器中加载扩展:

1. 打开 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `dist` 文件夹

## 项目结构

\`\`\`
extension/
├── manifest.json          # Chrome 扩展配置
├── newtab.html           # 新标签页入口
├── popup.html            # 弹出页面入口
├── src/
│   ├── App.tsx           # 主应用组件
│   ├── Popup.tsx         # 弹出页面组件
│   ├── newtab.tsx        # 新标签页入口
│   ├── popup.tsx         # 弹出页入口
│   ├── index.css         # 全局样式
│   ├── components/       # React 组件
│   │   ├── ui/          # UI 基础组件
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   ├── QuoteDisplay.tsx
│   │   └── HistoryModal.tsx
│   └── utils/           # 工具函数
│       ├── storage.ts   # Chrome Storage 封装
│       └── cn.ts        # className 工具
├── public/
│   └── icons/          # 扩展图标
├── vite.config.ts      # Vite 配置
├── tailwind.config.js  # Tailwind CSS 配置
└── package.json
\`\`\`

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Chrome Extension Manifest V3
- Vite

## 功能特性

- ✅ 每日最多 3 个待办事项
- ✅ 优雅的 UI 设计
- ✅ 历史记录查看
- ✅ 数据本地存储
- ✅ 流畅的动画效果

## 数据存储

使用 Chrome Storage API 进行数据持久化,自动保留最近 30 天的数据。
