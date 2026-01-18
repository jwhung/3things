# Google Analytics 4 设置指南

## 为什么切换到 GA4？

Cloudflare Web Analytics 的 RUM API 不支持从 Chrome 扩展直接发送数据，因为它的设计是为通过 Cloudflare 代理的网站服务的。

Google Analytics 4 的 Measurement Protocol 完全支持直接 HTTP 请求，非常适合 Chrome 扩展。

## 设置步骤

### 1. 创建 GA4 属性

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 点击左下角的 **"管理"** (齿轮图标)
3. 点击 **"+ 创建属性"**
4. 填写属性信息：
   - **属性名称**: `3Things Extension`
   - **报告时区**: 选择你的时区
   - **货币**: 根据需要选择
5. 点击 **"下一步"** 并完成设置

### 2. 创建数据流

1. 在新创建的属性中，点击 **"数据流"** (左侧菜单)
2. 点击 **"+ 添加数据流"**
3. 选择 **"网站"**
4. 填写信息：
   - **网站网址**: `chrome-extension://3things` (可以是任何格式，因为不会真正使用)
   - **数据流名称**: `3Things Extension`
5. 点击 **"创建数据流"**

### 6. 复制 Measurement ID

创建数据流后，你会看到一个 **Measurement ID**，格式类似 `G-XXXXXXXXXX`

**复制这个 ID！**

### 7. 创建 API Secret

1. 在 **Data Streams** 页面，找到你刚创建的数据流
2. 点击数据流名称进入详情
3. 向下滚动，找到 **"Measurement Protocol"** 部分
4. 点击 **"API secrets"** 链接（会打开新标签）
5. 点击 **"+ Create"** 按钮
6. 填写：
   - **Nickname**: `3Things Extension`
   - **Settings**: 留空或添加备注
7. 点击 **"Create"**
8. **重要！** 复制生成的 **Secret value**（格式类似 `XXXXXXXXXXXX_XXXXXXXXXXXXXXXX`）

> ⚠️ **注意**: API Secret 只会显示一次！请立即保存。

### 8. 更新代码

在 `src/lib/analytics.ts` 中替换这两个值：

```typescript
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"; // 替换为你的 Measurement ID
const GA4_API_SECRET = "YOUR_API_SECRET"; // 替换为你的 API Secret
```

### 9. 测试

1. 重新构建扩展：
   ```bash
   cd extension
   npm run build
   ```

2. 在 Chrome 中重新加载扩展

3. 打开新标签页

4. 打开控制台，应该会看到：
   ```
   [Analytics] Initialized with Google Analytics 4
   [Analytics] Sending event: newtab_open Payload: {...}
   [Analytics] Event sent: newtab_open
   ```

5. 打开 [GA4 Realtime 报告](https://analytics.google.com/)
   - 左侧菜单 → 报告 → 实时
   - 应该能看到 1 个活跃用户

## 验证设置

### 查看实时数据

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 选择你的 `3Things Extension` 属性
3. 点击左侧菜单的 **"报告"** → **"实时"**
4. 打开你的扩展的新标签页
5. 在 **"事件数"** 卡片中应该能看到事件
6. 在 **"事件"** 表格中应该能看到：
   - `newtab_open`
   - `task_add`
   - 等等...

### 查看事件报告

1. 左侧菜单 → **"配置"** → **"事件"**
2. 应该能看到所有自定义事件列表

## 常见问题

### Q: 数据没有显示？

**A**: GA4 有一些延迟：
- **实时报告**: 几秒钟内显示
- **标准报告**: 24-48小时后显示

### Q: 看到错误 "Failed to send event"？

**A**: 检查：
1. Measurement ID 是否正确（格式：G-XXXXXXXXXX）
2. API Secret 是否正确复制
3. 网络连接是否正常
4. 控制台的完整错误信息

### Q: API Secret 泄露了怎么办？

**A**: 立即：
1. 访问 GA4 → Admin → Data Streams → 你的数据流
2. 点击 Measurement Protocol → API secrets
3. 删除旧的 secret
4. 创建新的 secret
5. 更新代码中的 `GA4_API_SECRET`

### Q: 免费配额是多少？

**A**: GA4 免费版：
- **标准属性**: 1000万事件/月
- **360属性**: 100万事件/月

对于扩展来说，这个配额绰绰有余。

## 隐私合规

### GDPR/CCPA 合规

我们的实现：
- ✅ 不收集个人身份信息 (PII)
- ✅ 使用匿名 client ID
- ✅ 不使用 cookies
- ✅ 不跨网站跟踪
- ✅ 用户可以通过卸载扩展退出

### 隐私政策更新

在你的隐私政策中添加：

```
## 分析

我们使用 Google Analytics 4 来了解扩展的使用情况。

**收集的信息：**
- 匿名使用统计（事件类型、任务数量等）
- 匿名用户 ID（随机生成，存储在本地）

**如何使用：**
- 改进扩展功能和用户体验
- 识别和修复问题

**隐私保护：**
- 不收集个人身份信息
- 不使用 cookies 或类似技术
- 数据被聚合和匿名化
- 用户可以通过卸载扩展来选择退出

更多信息：[Google Analytics 隐私政策](https://policies.google.com/privacy)
```

## 下一步

设置完成后：

1. [ ] 在 PRD/README 中更新隐私政策
2. [ ] 测试所有事件是否正常发送
3. [ ] 检查 GA4 报告
4. [ ] 开始收集用户洞察！

## 相关链接

- [GA4 Measurement Protocol 文档](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [GA4 事件参考](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 配置帮助](https://support.google.com/analytics#topic=9303319)

---

**需要帮助？** 如果有任何问题，请查看 [GA4 帮助中心](https://support.google.com/analytics)
