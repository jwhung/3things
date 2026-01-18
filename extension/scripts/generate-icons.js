const fs = require('fs');
const path = require('path');

// 简单的 SVG 内容
const svgContent = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="24" fill="url(#gradient)"/>
  <text x="64" y="85" font-family="Arial, sans-serif" font-size="72" font-weight="600" text-anchor="middle" fill="white">3</text>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="128" y2="128">
      <stop offset="0%" stop-color="#c9b8a8"/>
      <stop offset="50%" stop-color="#b5a092"/>
      <stop offset="100%" stop-color="#9d8977"/>
    </linearGradient>
  </defs>
</svg>`;

// 创建 icons 目录
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 保存 SVG
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgContent);
fs.writeFileSync(path.join(iconsDir, 'icon16.png'), ''); // Placeholder
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), ''); // Placeholder
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), ''); // Placeholder

console.log('Icons generated successfully!');
console.log('Note: For production, you need to convert the SVG to actual PNG files.');
