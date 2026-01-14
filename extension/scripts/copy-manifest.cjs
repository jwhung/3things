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

console.log('✅ Manifest and icons copied to dist/');
