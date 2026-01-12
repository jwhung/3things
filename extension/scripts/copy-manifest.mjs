import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const buildManifestPath = path.join(rootDir, 'manifest.build.json');
const destManifestPath = path.join(distDir, 'manifest.json');

// 确保 dist 目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 检查构建用的 manifest 是否存在
if (!fs.existsSync(buildManifestPath)) {
  console.error('❌ Error: manifest.build.json not found. Please run prebuild script first.');
  process.exit(1);
}

// 复制构建用的 manifest 到 dist
fs.copyFileSync(buildManifestPath, destManifestPath);

// 复制 icons
const sourceIconsDir = path.join(rootDir, 'public/icons');
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
  console.log(`✅ Copied ${icons.length} icon(s) to dist/icons/`);
}

// 清理构建用的 manifest
fs.unlinkSync(buildManifestPath);

console.log('✅ Manifest and icons copied to dist/');
