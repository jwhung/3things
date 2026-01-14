const fs = require('fs');
const path = require('path');

// 源文件和目标文件
const sourceManifest = path.join(__dirname, '../manifest.json');
const distDir = path.join(__dirname, '../dist');
const destManifest = path.join(distDir, 'manifest.json');

// 确保 dist 目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 复制 manifest.json
fs.copyFileSync(sourceManifest, destManifest);

// 复制 icons
const sourceIconsDir = path.join(__dirname, '../public/icons');
const destIconsDir = path.join(distDir, 'icons');

if (fs.existsSync(sourceIconsDir)) {
  if (!fs.existsSync(destIconsDir)) {
    fs.mkdirSync(destIconsDir, { recursive: true });
  }

  const icons = fs.readdirSync(sourceIconsDir);
  icons.forEach(icon => {
    fs.copyFileSync(
      path.join(sourceIconsDir, icon),
      path.join(destIconsDir, icon)
    );
  });
}

// 复制 _locales 文件夹
const sourceLocalesDir = path.join(__dirname, '../_locales');
const destLocalesDir = path.join(distDir, '_locales');

if (fs.existsSync(sourceLocalesDir)) {
  // 递归复制 _locales 文件夹
  copyDirectory(sourceLocalesDir, destLocalesDir);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('✅ Manifest, icons, and _locales copied to dist/');
