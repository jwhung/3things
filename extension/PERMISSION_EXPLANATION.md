# Chrome Web Store 权限说明

## Storage Permission

### English Version

**Purpose:**
To save user's task data (daily tasks, completion status, and historical records) locally on their device and synchronize across their Chrome devices when signed in with a Google account.

**Data:**
Only stores user-generated task data including:
- Task text content
- Completion status (completed/not completed)
- Dates for task tracking
- Historical task records

This data is:
- Created entirely by the user
- Stored locally using Chrome's Storage API
- Synchronized to user's Google account storage when signed in
- Never transmitted to any third-party servers

**Access:**
The data is stored in the user's browser and is only accessible by this extension on their devices where they are signed in with the same Google account.

**Sync:**
When users sign in to Chrome with their Google account, their task data is automatically synchronized across all their Chrome devices (desktop, Chromebook, Android, iOS) for a seamless experience.

---

### 中文版本

**用途：**
用于在用户的设备本地保存任务数据（每日任务、完成状态和历史记录），并在用户登录 Google 账号时同步到其所有 Chrome 设备。

**数据：**
仅存储用户生成的任务数据，包括：
- 任务文本内容
- 完成状态（已完成/未完成）
- 用于任务追踪的日期
- 历史任务记录

这些数据：
- 完全由用户创建
- 使用 Chrome Storage API 本地存储
- 用户登录时同步到用户的 Google 账户存储
- 从不传输到任何第三方服务器

**访问权限：**
数据存储在用户的浏览器中，只有该扩展在用户登录了相同 Google 账号的设备上才能访问。

**同步：**
当用户使用 Google 账号登录 Chrome 时，他们的任务数据会自动同步到所有 Chrome 设备（桌面、Chromebook、Android、iOS），提供无缝的使用体验。

---

## 重要提示

### 在提交审核时填写位置

1. Chrome Web Store Developer Dashboard
2. 选择你的扩展
3. 点击 "Privacy" 标签页
4. 在 "Privacy - Practices" 部分找到 "Storage Permission"
5. 将上述说明复制粘贴到对应位置

### 为什么需要这个权限？

3things 是一个**任务管理扩展**，核心功能就是帮助用户记录和追踪每日的三件最重要的事情。因此：

1. **必须保存数据** - 否则用户刷新页面后任务会丢失
2. **必须持久化存储** - localStorage 不可靠（用户清除浏览器数据会丢失）
3. **使用 chrome.storage** 是最佳实践：
   - 比 localStorage 更可靠
   - 支持跨设备同步（提升用户体验）
   - 符合 Chrome 扩展开发标准

### 类似扩展

所有任务管理类扩展都需要 storage 权限：
- Todoist
- Microsoft To Do
- Any.do
- TickTick

参考这些扩展的商店列表，它们也都声明了 storage 权限。
