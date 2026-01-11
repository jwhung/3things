# 📦 如何分享你的扩展

## 一键打包

```bash
cd extension
npm run package
```

这会生成 `extension/packages/3things-extension-v1.0.0.zip` 文件（138 KB）

---

## 分享方式

### 方式 1：直接分享 ZIP 文件

1. 运行 `npm run package`
2. 把生成的 ZIP 文件发送给朋友
3. 附上以下安装说明：

```
安装步骤：
1. 解压下载的 ZIP 文件
2. 打开 Chrome，访问 chrome://extensions/
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择解压后的文件夹
6. 完成！打开新标签页查看效果
```

---

### 方式 2：发布到 GitHub Releases

1. 运行 `npm run package`
2. 在 GitHub 创建 Release
3. 上传 ZIP 文件
4. 把 Release 链接分享给朋友

---

### 方式 3：发布到 Chrome Web Store

1. 准备素材（图标 128x128、截图 1280x800）
2. 注册开发者账号（$5）
3. 打包并上传到 Chrome Web Store
4. 等待审核通过

---

## 文件位置

打包后的文件：`extension/packages/3things-extension-v1.0.0.zip`

---

## 常见问题

**Q: 用户安装时会看到警告吗？**
A: 会看到"开发者模式扩展"的警告，这是正常的。告诉用户点击"保留扩展"即可。

**Q: 如何更新？**
A: 用户需要重新下载新版本，删除旧版本，然后加载新版本。

**Q: ZIP 文件太大？**
A: 当前打包后只有 138 KB，非常小。如果更大，可能是包含了不必要的文件。

---

**现在就试试吧！运行 `npm run package` 🚀**
