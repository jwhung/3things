import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputZip = path.join(rootDir, '3things-chrome.zip');

// 检查 dist 目录是否存在
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory not found. Please run npm run build:chrome first.');
  process.exit(1);
}

// 创建打包流
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

// 监听完成事件
output.on('close', () => {
  const fileSize = (archive.pointer() / 1024).toFixed(2);
  console.log(`✅ Chrome extension packaged: ${outputZip} (${fileSize} KB)`);
});

// 监听错误
archive.on('error', (err) => {
  console.error('❌ Packaging failed:', err);
  process.exit(1);
});

// 打包 dist 目录
archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();
