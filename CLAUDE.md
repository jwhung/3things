# 3Things 项目文档

> 本文档是 Claude AI 在开发 3Things Chrome 扩展过程中的完整项目参考文档

## 目录

- [项目概述](#项目概述)
- [完整目录结构](#完整目录结构)
- [核心文件说明](#核心文件说明)
- [开发指南](#开发指南)
- [技术栈详解](#技术栈详解)
- [开发日志](#开发日志)

---

## 项目概述

**3Things** 是一个极简主义的 Chrome 浏览器扩展，通过每天限制用户只能添加 3 个待办事项，帮助用户专注于真正重要的事情。

### 核心理念
- 每天只允许添加 3 个待办事项
- 强制用户聚焦最重要的事情
- 浏览器启动页即工作区
- 极简设计，零压力体验

### 主要功能
- 每日最多 3 个待办事项
- 优雅的新标签页界面
- 快速访问弹出窗口
- 历史记录浏览（30天）
- CSV 数据导出
- 跨设备同步（Chrome 账户）
- 国际化支持（中英文）

---

## 完整目录结构

```
3things/
├── .claude/                        # Claude Code 配置
├── .git/                           # Git 版本控制
├── node_modules/                   # 根目录依赖
│
├── PRD/                            # 产品需求文档
│   ├── mainPRD.md                  # 主需求文档
│   ├── popup.md                    # 弹出页面需求
│   └── 20260110.md                 # 需求更新记录
│
├── UI/                             # UI 设计文件
│   ├── src/                        # UI 源代码
│   │   ├── app/                    # UI 组件
│   │   └── styles/                 # UI 样式
│   ├── index.html                  # UI 预览入口
│   ├── logo_vibe_version.png       # Logo 设计源文件 (6.7MB)
│   ├── package.json                # UI 项目依赖
│   ├── vite.config.ts              # UI Vite 配置
│   ├── postcss.config.mjs          # UI PostCSS 配置
│   ├── README.md                   # UI 项目说明
│   ├── ATTRIBUTIONS.md             # 版权声明
│   └── guidelines/                 # 设计指南
│
├── extension/                      # Chrome 扩展主目录 ⭐
│   │
│   ├── dist/                       # 构建输出目录
│   │   ├── _locales/               # 国际化文件
│   │   │   ├── en/                 # 英文翻译
│   │   │   │   └── messages.json
│   │   │   └── zh/                 # 中文翻译
│   │   │       └── messages.json
│   │   ├── assets/                 # 构建资源
│   │   │   ├── index-*.js
│   │   │   ├── newtab-*.js
│   │   │   └── popup-*.js
│   │   ├── icons/                  # 扩展图标
│   │   │   ├── icon16.png
│   │   │   ├── icon48.png
│   │   │   └── icon128.png
│   │   ├── manifest.json           # 构建后的清单
│   │   ├── newtab.html             # 构建后的新标签页
│   │   ├── popup.html              # 构建后的弹出页面
│   │   └── background.js           # 构建后的后台脚本
│   │
│   ├── packages/                   # 发布包
│   │   └── 3things-extension-v1.0.0.zip
│   │
│   ├── public/                     # 静态资源
│   │   └── icons/                  # 源图标
│   │       ├── icon.svg            # SVG 源文件
│   │       ├── icon16.png          # 16x16 图标
│   │       ├── icon48.png          # 48x48 图标
│   │       ├── icon128.png         # 128x128 图标
│   │       └── generate-icons.html # 图标生成工具
│   │
│   ├── scripts/                    # 构建脚本
│   │   ├── copy-manifest.cjs       # 复制 manifest 到 dist
│   │   └── package.cjs             # 打包脚本
│   │
│   ├── src/                        # 源代码 ⭐⭐⭐
│   │   │
│   │   ├── components/             # React 组件
│   │   │   ├── ui/                 # shadcn/ui 基础组件库 (50+个)
│   │   │   │   ├── button.tsx      # 按钮组件
│   │   │   │   ├── input.tsx       # 输入框组件
│   │   │   │   ├── dialog.tsx      # 对话框组件
│   │   │   │   └── ...
│   │   │   ├── TodoInput.tsx       # 待办事项输入组件
│   │   │   ├── TodoList.tsx        # 待办事项列表组件
│   │   │   ├── QuoteDisplay.tsx    # 每日语录展示组件
│   │   │   ├── HistoryModal.tsx    # 历史记录弹窗组件
│   │   │   └── Toast.tsx           # Toast 通知组件
│   │   │
│   │   ├── contexts/               # React Context
│   │   │   └── LocaleContext.tsx   # 国际化上下文
│   │   │
│   │   ├── hooks/                  # 自定义 React Hooks
│   │   │   ├── useTodos.ts         # 待办事项管理 Hook
│   │   │   └── useHistory.ts       # 历史数据管理 Hook
│   │   │
│   │   ├── lib/                    # 工具库
│   │   │   ├── constants.ts        # 常量定义（颜色、字体等）
│   │   │   ├── storage.ts          # Chrome Storage API 封装
│   │   │   ├── date-utils.ts       # 日期处理工具
│   │   │   ├── utils.ts            # 通用工具函数
│   │   │   ├── analytics.ts        # 分析功能
│   │   │   ├── i18n.ts             # 国际化工具
│   │   │   └── version.ts          # 版本管理
│   │   │
│   │   ├── types/                  # TypeScript 类型定义
│   │   │   └── index.ts            # 类型声明文件
│   │   │
│   │   ├── utils/                  # 旧版工具函数（已废弃，迁移至 lib/）
│   │   │   ├── cn.ts               # className 合并工具
│   │   │   └── storage.ts          # 旧版存储工具
│   │   │
│   │   ├── App.tsx                 # 主应用组件（新标签页）
│   │   ├── popup.tsx               # 弹出页面主组件
│   │   ├── newtab.tsx              # 新标签页入口文件
│   │   ├── popup-entry.tsx         # 弹出页面入口文件
│   │   ├── background.ts           # 后台脚本
│   │   ├── index.css               # 全局样式入口
│   │   └── theme.css               # 主题样式配置
│   │
│   ├── _locales/                   # 国际化源文件（开发用）
│   │   ├── en/
│   │   │   └── messages.json
│   │   └── zh/
│   │       └── messages.json
│   │
│   ├── manifest.json               # Chrome 扩展配置清单 ⭐
│   ├── newtab.html                 # 新标签页入口 HTML
│   ├── popup.html                  # 弹出页面入口 HTML
│   ├── package.json                # 项目依赖配置 ⭐
│   ├── vite.config.ts              # Vite 构建配置 ⭐
│   ├── tailwind.config.js          # Tailwind CSS 配置 ⭐
│   ├── tsconfig.json               # TypeScript 配置 ⭐
│   ├── postcss.config.js           # PostCSS 配置
│   │
│   └── 文档文件/
│       ├── README.md               # 扩展开发文档
│       ├── INSTALL_GUIDE.md        # 安装指南
│       ├── INSTALL.md              # 安装说明
│       ├── ICONS.md                # 图标使用说明
│       ├── FINAL_OPTIMIZATIONS.md  # 最终优化记录
│       ├── ANALYTICS.md            # 分析功能说明
│       ├── CLOUDFLARE_SETUP.md     # Cloudflare 配置
│       ├── I18N.md                 # 国际化说明
│       ├── PRIVACY.md              # 隐私政策
│       ├── PERMISSION_EXPLANATION.md # 权限说明
│       ├── RELEASE_GUIDE.md        # 发布指南
│       ├── STORE_LISTING.md        # 商店列表说明
│       └── SUBMISSION_GUIDE.md     # 提交指南
│
├── CHANGELOG.md                    # 项目更新日志
├── QUICK_START.md                  # 快速开始指南
├── SUPPORT.md                      # 技术支持文档
├── TODAY_SUMMARY.md                # 今日工作总结
├── TODO.md                         # 任务清单
├── README.md                       # 项目总览
├── CLAUDE.md                       # 本文档
├── .gitattributes                  # Git 属性配置
├── .gitignore                      # Git 忽略文件
├── package.json                    # 根目录依赖配置
└── package-lock.json               # 依赖锁定文件
```

---

## 核心文件说明

### 1. Chrome 扩展配置文件

#### [extension/manifest.json](extension/manifest.json) ⭐⭐⭐
Chrome 扩展的配置清单文件（Manifest V3）：

**扩展信息**
- name: 扩展名称（支持国际化）
- version: 当前版本号
- description: 扩展描述（支持国际化）
- default_locale: 默认语言（zh）

**权限配置**
- storage: Chrome Storage API 权限
- icons: 扩展图标权限

**页面覆盖**
- chrome_url_overrides.newtab: 覆盖新标签页

**Action 配置**
- default_popup: 弹出页面路径
- default_icon: 默认图标（16/48/128 三种尺寸）

**后台脚本**
- background: Service Worker 脚本

**最低 Chrome 版本**: 88+

---

#### [extension/newtab.html](extension/newtab.html) & [extension/popup.html](extension/popup.html)
HTML 入口文件：
- `newtab.html`: 新标签页入口，挂载 `#root`
- `popup.html`: 弹出页面入口，挂载 `#root`
- 引入构建后的 CSS 和 JS 资源

---

### 2. 构建配置文件

#### [extension/vite.config.ts](extension/vite.config.ts) ⭐⭐
Vite 构建工具配置：

**多入口构建**
- newtab: 新标签页入口
- popup: 弹出页面入口

**插件配置**
- @vitejs/plugin-react: React JSX/TSX 支持

**路径别名**
- @/* 映射到 ./*

**构建输出**
- 输出目录: dist
- 包含 assets 子目录

**开发服务器**
- 端口: 5173
- 支持 HMR（热模块替换）

---

#### [extension/tailwind.config.js](extension/tailwind.config.js) ⭐⭐
Tailwind CSS 配置：

**内容扫描**
- src/**/*.tsx
- src/**/*.ts

**主题配置**
- 扩展默认主题
- 自定义颜色系统

**颜色变量**
- 主色: c9b8a8, b5a092, 9d8977
- 背景色: faf8f5, f5f2ed, ede8e1
- 文字色: 37352f, 6b5d54, 9d8977
- 边框色: d4cdc3, d3d1cb

**字体配置**
- Cormorant Garamond（标题）
- Crimson Text（正文）

---

#### [extension/tsconfig.json](extension/tsconfig.json) ⭐
TypeScript 配置：

**编译目标**
- target: ES2020
- module: ESNext
- jsx: react-jsx

**路径解析**
- @/* 映射到 ./*

**类型检查**
- strict: 启用严格模式
- strictNullChecks: 严格 null 检查

---

#### [extension/package.json](extension/package.json) ⭐⭐
项目依赖配置：

**核心依赖**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "lucide-react": "^0.487.0",
  "motion": "^12.23.24",
  "tailwind-merge": "^3.4.0",
  "clsx": "^2.1.1",
  "class-variance-authority": "^0.7.1",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-slot": "^1.2.4"
}
```

**开发依赖**
```json
{
  "@vitejs/plugin-react": "^4.7.0",
  "@tailwindcss/vite": "^4.1.12",
  "tailwindcss": "^4.1.12",
  "typescript": "^5.8.0",
  "vite": "^6.3.5",
  "archiver": "^7.0.1"
}
```

**脚本命令**
- `dev`: 启动开发服务器
- `build`: 构建生产版本
- `preview`: 预览构建结果
- `package`: 打包扩展为 zip

---

### 3. 主应用文件

#### [extension/src/App.tsx](extension/src/App.tsx) ⭐⭐⭐
新标签页主应用组件（约 220 行）：

**布局**
- 固定视口高度（h-screen）
- Flex 垂直布局
- 防止页面滚动

**核心功能**
- Logo 和标题展示
- 今日进度条显示
- 待办事项列表管理
- 待办事项输入框
- 每日语录展示
- 历史记录入口按钮

**状态管理**
- useTodos: 待办事项管理
- useHistory: 历史数据管理

**动画效果**
- Framer Motion 进场动画
- 组件切换动画

**键盘快捷键**
- Ctrl/Cmd + H: 打开历史记录
- Esc: 关闭弹窗

---

#### [extension/src/popup.tsx](extension/src/popup.tsx) ⭐⭐
弹出页面主组件（约 160 行）：

**尺寸**
- 固定 360x450px
- 紧凑型布局
- 无滚动条设计

**核心功能**
- Logo 和标题（简化版）
- 今日进度条
- 待办事项列表（compact 模式）
- 待办事项输入框（compact 模式）
- 外部链接按钮（打开新标签页）

**特性**
- 所有内容一屏展示
- 防止滚动
- 快速访问

---

#### [extension/src/newtab.tsx](extension/src/newtab.tsx)
新标签页入口文件：

- React 18 创建 root
- StrictMode 包裹
- 渲染 App 组件

---

#### [extension/src/popup-entry.tsx](extension/src/popup-entry.tsx)
弹出页面入口文件：

- React 18 创建 root
- StrictMode 包裹
- 渲染 Popup 组件

---

#### [extension/src/background.ts](extension/src/background.ts)
后台脚本（Service Worker）：

- 扩展生命周期管理
- 后台任务处理
- 事件监听

---

### 4. 业务组件

#### [extension/src/components/TodoInput.tsx](extension/src/components/TodoInput.tsx) ⭐⭐
待办事项输入组件（约 112 行）：

**Props**
- onAdd: 添加待办事项回调
- disabled: 是否禁用
- remainingCount: 剩余可添加数量
- compact: 紧凑模式

**功能**
- 输入框（带焦点动画）
- 添加按钮
- 剩余数量提示（非 compact 模式）
- 焦点时的光晕效果

**交互**
- Enter 提交
- 焦点缩放动画
- 按钮悬停/点击动画

---

#### [extension/src/components/TodoList.tsx](extension/src/components/TodoList.tsx) ⭐⭐⭐
待办事项列表组件（约 166 行）：

**Props**
- todos: 待办事项数组
- onToggle: 切换完成状态回调
- onDelete: 删除待办事项回调
- compact: 紧凑模式

**功能**
- 空状态展示（图标 + 文字）
- 待办事项卡片列表
- 复选框（完成/未完成状态）
- 删除按钮（非 compact 模式）
- 全部完成时的庆祝提示

**动画**
- 进场动画（渐入 + 上移）
- 删除动画（向左滑出）
- Layout 动画（自动布局过渡）
- 完成动画（复选框旋转）

---

#### [extension/src/components/QuoteDisplay.tsx](extension/src/components/QuoteDisplay.tsx) ⭐
每日语录展示组件（约 58 行）：

**功能**
- 根据日期自动选择语录
- 7 条精选语录循环
- Sparkles 图标（带旋转动画）
- 悬停时上移效果

**样式**
- 毛玻璃卡片
- 渐变背景装饰
- 优雅的排版

---

#### [extension/src/components/HistoryModal.tsx](extension/src/components/HistoryModal.tsx) ⭐⭐⭐
历史记录弹窗组件（约 306 行）：

**Props**
- open: 是否打开
- onClose: 关闭回调
- history: 历史数据
- includeToday: 是否包含今日
- todayData: 今日数据

**功能**
- 按日期分组显示历史记录
- 每日完成率进度条
- CSV 导出功能
- 统计信息展示（总记录数、总天数）
- 日期格式化（中文）

**子组件**
- DayCard: 日期卡片
- TodoItem: 待办事项项

**交互**
- Dialog 组件
- 支持关闭按钮和 Esc 关闭

---

#### [extension/src/components/Toast.tsx](extension/src/components/Toast.tsx) ⭐
Toast 通知组件（约 80 行）：

**功能**
- success/error/warning 三种类型
- 自动 3 秒后消失
- 支持手动关闭
- 进出场动画

**样式**
- 毛玻璃效果
- 顶部居中显示

---

### 5. 自定义 Hooks

#### [extension/src/hooks/useTodos.ts](extension/src/hooks/useTodos.ts) ⭐⭐⭐
待办事项管理 Hook（约 80 行）：

**状态**
- todos: 待办事项列表
- loading: 加载状态
- completedCount: 已完成数量
- remainingCount: 未完成数量
- maxTodos: 最大数量（3）

**方法**
- addTodo: 添加待办事项（最多 3 个）
- toggleTodo: 切换完成状态
- deleteTodo: 删除待办事项

**特性**
- 自动加载今日数据
- Chrome Storage 持久化
- 自动清理超过 30 天的历史数据
- Toast 通知集成

---

#### [extension/src/hooks/useHistory.ts](extension/src/hooks/useHistory.ts) ⭐⭐
历史数据管理 Hook（约 45 行）：

**状态**
- history: 历史数据
- todayData: 今日数据
- loading: 加载状态
- totalTodos: 总待办事项数
- totalDays: 总天数
- hasData: 是否有数据

**功能**
- 加载所有历史数据
- 分离今日和历史数据
- 按日期排序（最新在前）
- 过滤空日期（只显示有待办事项的日期）

---

### 6. 工具库

#### [extension/src/lib/storage.ts](extension/src/lib/storage.ts) ⭐⭐⭐
Chrome Storage API 封装（约 60 行）：

**函数**
- loadAllData(): 加载所有数据
- saveTodayData(date, data): 保存今日数据
- getTodayString(): 获取今日日期字符串
- cleanupOldData(): 清理 30 天前的数据

**数据结构**
```typescript
interface DayData {
  date: string;  // YYYY-MM-DD
  todos: Todo[];
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
```

---

#### [extension/src/lib/constants.ts](extension/src/lib/constants.ts) ⭐
常量定义：

**FONTS**
- Cormorant Garamond（标题）
- Crimson Text（正文）

**COLORS**
- 主题色、文字色、背景色等

---

#### [extension/src/lib/date-utils.ts](extension/src/lib/date-utils.ts) ⭐
日期处理工具（约 40 行）：

**函数**
- formatDateToChinese: 日期转中文（如"1月15日 周三"）
- sortByDate: 按日期排序（最新在前）
- getCompletionRate: 计算完成率

---

#### [extension/src/lib/utils.ts](extension/src/lib/utils.ts) ⭐
通用工具函数：

**函数**
- cn: className 合并工具（使用 tailwind-merge）
- iconAlignClass/iconAlignStyle: 图标对齐样式（跨平台）
- getButtonTextClass: 按钮文字样式类

---

#### [extension/src/lib/analytics.ts](extension/src/lib/analytics.ts)
分析功能：

- 事件跟踪
- 用户行为分析
- Cloudflare Analytics 集成

---

#### [extension/src/lib/i18n.ts](extension/src/lib/i18n.ts)
国际化工具：

- 多语言支持
- 消息翻译
- Locale 管理器

---

#### [extension/src/lib/version.ts](extension/src/lib/version.ts)
版本管理：

- 版本号管理
- 版本比较
- 更新检查

---

#### [extension/src/types/index.ts](extension/src/types/index.ts) ⭐
TypeScript 类型定义：

**类型**
- Todo: 待办事项接口
- DayData: 日数据接口

---

### 7. UI 组件库（shadcn/ui）

#### [extension/src/components/ui/](extension/src/components/ui/)
基于 Radix UI 和 Tailwind CSS 的组件库：

**核心组件**
- button.tsx: 按钮组件（多种 variant 和 size）
- input.tsx: 输入框组件
- dialog.tsx: 对话框组件
- utils.ts: className 工具函数

**其他组件（50+ 个）**
- accordion, alert, card, checkbox, dropdown-menu, select, tabs, toast 等

**特性**
- 完全可定制
- TypeScript 支持
- 可访问性友好
- 主题系统支持

---

### 8. 样式文件

#### [extension/src/index.css](extension/src/index.css) ⭐
全局样式入口：

- 导入 Tailwind CSS
- 导入 tailwindcss 动画
- 导入自定义主题
- 配置源文件扫描

---

#### [extension/src/theme.css](extension/src/theme.css) ⭐
主题样式配置：

- CSS 变量定义
- 颜色系统
- 字体配置
- 基础样式重置

---

### 9. 脚本工具

#### [extension/scripts/copy-manifest.cjs](extension/scripts/copy-manifest.cjs) ⭐
构建后处理脚本：

- 复制 manifest.json 到 dist 目录
- 复制 public/icons 到 dist/icons
- 复制 _locales 到 dist/_locales
- 在 package.json 的 build 命令中自动执行

---

#### [extension/scripts/package.cjs](extension/scripts/package.cjs)
打包脚本：

- 创建发布包
- 生成 zip 文件
- 版本管理

---

#### [extension/public/icons/generate-icons.html](extension/public/icons/generate-icons.html) ⭐
图标生成工具：

- 使用 Canvas 绘制图标
- 自动生成 16/48/128 三种尺寸
- 点击下载 PNG 文件
- 完全在浏览器中运行

---

### 10. 国际化文件

#### [extension/_locales/](extension/_locales/)
国际化资源文件：

**en/messages.json**
- 英文翻译

**zh/messages.json**
- 中文翻译

**支持内容**
- 扩展名称
- 扩展描述
- UI 文本
- 提示信息

---

### 11. 文档文件

#### 根目录文档
- [README.md](README.md): 项目总览和介绍
- [CHANGELOG.md](CHANGELOG.md): 项目更新日志
- [QUICK_START.md](QUICK_START.md): 快速开始指南
- [SUPPORT.md](SUPPORT.md): 技术支持文档
- [TODO.md](TODO.md): 任务清单
- [TODAY_SUMMARY.md](TODAY_SUMMARY.md): 今日工作总结

#### Extension 目录文档
- [extension/README.md](extension/README.md): 扩展开发文档
- [extension/INSTALL_GUIDE.md](extension/INSTALL_GUIDE.md): 安装指南
- [extension/INSTALL.md](extension/INSTALL.md): 安装说明
- [extension/ICONS.md](extension/ICONS.md): 图标使用说明
- [extension/FINAL_OPTIMIZATIONS.md](extension/FINAL_OPTIMIZATIONS.md): 最终优化记录
- [extension/ANALYTICS.md](extension/ANALYTICS.md): 分析功能说明
- [extension/CLOUDFLARE_SETUP.md](extension/CLOUDFLARE_SETUP.md): Cloudflare 配置
- [extension/I18N.md](extension/I18N.md): 国际化说明
- [extension/PRIVACY.md](extension/PRIVACY.md): 隐私政策
- [extension/PERMISSION_EXPLANATION.md](extension/PERMISSION_EXPLANATION.md): 权限说明
- [extension/RELEASE_GUIDE.md](extension/RELEASE_GUIDE.md): 发布指南
- [extension/STORE_LISTING.md](extension/STORE_LISTING.md): 商店列表说明
- [extension/SUBMISSION_GUIDE.md](extension/SUBMISSION_GUIDE.md): 提交指南

---

## 开发指南

### 快速开始

#### 1. 安装依赖
```bash
cd extension
npm install
```

#### 2. 开发模式
```bash
npm run dev
```
然后在 Chrome 中加载 `extension` 文件夹（非 dist）

#### 3. 构建生产版本
```bash
npm run build
```
构建输出到 `extension/dist` 目录

#### 4. 加载到 Chrome
1. 打开 `chrome://extensions/`
2. 启用"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `extension/dist` 文件夹

#### 5. 打包发布
```bash
npm run package
```
生成 `extension/packages/3things-extension-v{version}.0.zip`

---

### 文件依赖关系

#### 核心依赖链
```
manifest.json
    ↓
newtab.html / popup.html
    ↓
newtab.tsx / popup-entry.tsx
    ↓
App.tsx / popup.tsx
    ↓
TodoInput, TodoList, QuoteDisplay, HistoryModal
    ↓
useTodos, useHistory
    ↓
lib/storage.ts → Chrome Storage API
```

#### 数据流向
```
用户操作
    ↓
组件事件处理 (onAdd, onToggle, onDelete)
    ↓
Custom Hooks (useTodos, useHistory)
    ↓
Storage API (lib/storage.ts)
    ↓
Chrome Storage (持久化)
```

#### 样式系统
```
组件 className
    ↓
Tailwind CSS utility classes
    ↓
theme.css (CSS 变量)
    ↓
index.css (全局样式)
```

---

## 技术栈详解

### 1. Chrome Extension 集成
- **Manifest V3 规范**: 最新 Chrome 扩展标准
- **Chrome Storage API**: 数据持久化存储
- **chrome_url_overrides**: 新标签页覆盖
- **Action popup**: 弹出页面
- **Service Worker**: 后台脚本

### 2. React 架构
- **函数组件 + Hooks**: 现代 React 开发模式
- **自定义 Hooks**: 封装业务逻辑
- **Context**: 全局状态管理（国际化）
- **严格 TypeScript**: 类型安全保障

### 3. 状态管理
- **本地组件状态**: useState
- **持久化状态**: Chrome Storage
- **自定义 Hooks**: useTodos, useHistory
- **无外部状态库**: 不需要 Redux/Zustand

### 4. 样式方案
- **Tailwind CSS**: Utility-first CSS 框架
- **自定义主题**: 扩展颜色和字体
- **Framer Motion**: 生产级动画库
- **毛玻璃效果**: backdrop-blur
- **渐变背景**: 柔和的视觉体验

### 5. 构建工具
- **Vite**: 快速开发服务器和构建工具
- **React 插件**: JSX/TSX 支持
- **PostCSS**: CSS 转换
- **TypeScript**: 类型检查和编译

### 6. 数据持久化
- **Chrome Storage API**: 跨设备同步
- **自动清理**: 30 天前数据自动删除
- **按日期存储**: DayData 结构
- **CSV 导出**: 数据备份和分析

### 7. 国际化
- **Chrome i18n API**: 多语言支持
- **Context**: React 国际化上下文
- **中英文**: 完整的双语支持

### 8. UI 组件库
- **shadcn/ui**: 高质量 React 组件
- **Radix UI**: 无障碍组件基础
- **Lucide React**: 精美图标库
- **完全可定制**: 基于源码修改

---

## 开发日志

### 2026-01-14
**任务**: 完整更新 CLAUDE.md 文档

**完成内容**:
- ✅ 分析整个项目结构
- ✅ 重新组织文档结构
- ✅ 消除重复内容
- ✅ 添加新增文件说明（background.ts, analytics.ts, i18n.ts, version.ts）
- ✅ 完善国际化相关内容
- ✅ 添加打包发布流程
- ✅ 补充文档索引

---

### 2026-01-11
**任务**: UI 优化与 Bug 修复

**完成内容**:
1. ✅ 修复 checkbox 垂直居中问题
   - 将 `flex items-start` 改为 `flex items-center`
   - 移除按钮上的 `mt-0.5` 偏移类

2. ✅ 历史记录过滤空日期
   - 添加过滤条件 `d.todos.length > 0`
   - 只显示至少有一个事项的日期

3. ✅ 优化 New Tab 页面布局
   - 使用 `h-screen` 替代 `min-h-screen`
   - 主容器使用 `h-full flex flex-col`
   - TodoList 使用 `flex-1` 自动填充
   - 减小所有组件的间距和尺寸

4. ✅ 优化 TodoList 和 QuoteDisplay 组件
   - 调整间距、内边距、图标大小
   - 优化视觉效果

5. ✅ 完善项目文档

---

### 2026-01-06 (下午)
**任务**: 功能优化与 Bug 修复

**完成内容**:
1. ✅ 修复历史记录功能 Bug
   - 修正 `history` 状态类型为 `DayData[]`
   - 修复数据加载逻辑

2. ✅ 添加 Toast 通知系统
   - 三种通知类型: success, error, warning
   - 优雅的动画效果
   - 自动 3 秒后消失

3. ✅ 完善错误处理机制
   - 所有数据操作添加 try-catch
   - 友好的中文错误提示
   - Toast 通知集成

4. ✅ 优化加载状态
   - 添加背景装饰效果
   - 更明显的加载图标
   - "加载中..."文字提示

5. ✅ 添加键盘快捷键支持
   - Ctrl/Cmd + H: 打开历史记录
   - Esc: 关闭弹窗

6. ✅ 创建图标生成工具
   - Canvas 动态绘制图标
   - 自动生成三种尺寸
   - 浏览器内运行

---

### 2026-01-06
**任务**: 创建浏览器启动页插件 "3Things" 的产品需求文档

**完成内容**:
1. ✅ 创建完整的产品需求文档 (PRD/mainPRD.md)
   - 产品概述和定位
   - 功能需求详细说明（P0/P1/P2 优先级）
   - 非功能需求
   - UI/UX 设计要求
   - 数据结构设计
   - 技术栈选择
   - 开发计划
   - 验收标准

2. ✅ 创建 CLAUDE.md 操作日志文件

**技术选型**:
- Chrome Extension Manifest V3
- React 18 + TypeScript
- Vite 构建工具
- Chrome Storage API
- Tailwind CSS
- Framer Motion

---

## 附录

### 文件大小统计

#### 主要源文件
- App.tsx: ~220 行
- popup.tsx: ~160 行
- TodoList.tsx: ~166 行
- TodoInput.tsx: ~112 行
- HistoryModal.tsx: ~306 行
- QuoteDisplay.tsx: ~58 行
- Toast.tsx: ~80 行

#### Hooks 和工具
- useTodos.ts: ~80 行
- useHistory.ts: ~45 行
- storage.ts: ~60 行
- date-utils.ts: ~40 行

#### UI 组件
- 50+ 个 shadcn/ui 组件
- 核心使用: button, input, dialog
- 其他组件备用，按需引入

---

### 关键技术点总结

#### Chrome Extension 集成
- Manifest V3 规范
- Chrome Storage API
- chrome_url_overrides（新标签页覆盖）
- Action popup（弹出页面）
- Service Worker（后台脚本）

#### React 架构
- 函数组件 + Hooks
- 自定义 Hooks 封装业务逻辑
- Context（全局状态）
- 严格的 TypeScript 类型检查

#### 状态管理
- 本地组件状态（useState）
- 持久化状态（Chrome Storage）
- 自定义 Hooks 封装
- 无需 Redux/Zustand

#### 样式方案
- Tailwind CSS utility-first
- 自定义主题配置
- Framer Motion 动画
- 毛玻璃效果
- 渐变背景

#### 构建工具
- Vite（快速开发服务器）
- React 插件（JSX/TSX 支持）
- PostCSS（Tailwind 处理）
- TypeScript 编译

#### 数据持久化
- Chrome Storage API
- 自动清理 30 天前数据
- 按日期分离存储
- CSV 导出功能

---

*本文档由 Claude AI 维护，记录 3Things 项目的完整开发历程*
