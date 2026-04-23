import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const manifestPath = path.join(rootDir, 'manifest.json');
const buildManifestPath = path.join(rootDir, 'manifest.build.json');

// 处理 manifest.json
function processManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // Chrome 特定配置（如果需要修改可以在这里添加）

  // 写入构建用的 manifest
  fs.writeFileSync(buildManifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Chrome manifest.json prepared');
}

// 执行处理
try {
  processManifest();
  console.log('🎉 Chrome build preparation completed!');
} catch (error) {
  console.error('❌ Error during Chrome build preparation:', error);
  process.exit(1);
}
