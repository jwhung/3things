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

  // Firefox 不使用 action 字段，改用 browser_action
  const firefoxManifest = { ...manifest };

  if (firefoxManifest.action) {
    firefoxManifest.browser_action = firefoxManifest.action;
    delete firefoxManifest.action;
  }

  // 添加 Firefox 特有配置
  // Firefox 扩展 ID 格式: name@domain
  // 首次发布后，这个 ID 就固定了，不要随意修改
  firefoxManifest.browser_specific_settings = {
    gecko: {
      id: '<firefox-id-here>', // 修改为你自己的扩展 ID
      strict_min_version: '115.0',
    },
  };

  // 写入构建用的 manifest
  fs.writeFileSync(buildManifestPath, JSON.stringify(firefoxManifest, null, 2));
  console.log('✅ Firefox manifest.json prepared');
}

// 执行处理
try {
  processManifest();
  console.log('🎉 Firefox build preparation completed!');
} catch (error) {
  console.error('❌ Error during Firefox build preparation:', error);
  process.exit(1);
}
