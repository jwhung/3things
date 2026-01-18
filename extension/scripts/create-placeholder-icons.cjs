const fs = require('fs');
const path = require('path');

// 创建简单的 PNG 图标的 Base64 数据
// 这是一个 16x16 的棕色圆角矩形,中间有白色 "3"
const createIconPNG = (size) => {
  // 简单的 PNG 文件头 + 一个纯色块
  // 由于生成真实 PNG 很复杂,我们创建一个最小的有效 PNG

  // 对于不同尺寸,我们需要不同大小的图像数据
  // 这里使用最简单的方法:创建一个最小的 PNG,然后让浏览器缩放

  // 简化的 PNG 文件结构
  const width = size;
  const height = size;

  // PNG 签名
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk (图像头)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);  // 宽度
  ihdr.writeUInt32BE(height, 4); // 高度
  ihdr.writeUInt8(8, 8);         // 位深度: 8
  ihdr.writeUInt8(2, 9);         // 颜色类型: 2 (RGB)
  ihdr.writeUInt8(0, 10);        // 压缩方法: 0
  ihdr.writeUInt8(0, 11);        // 过滤方法: 0
  ihdr.writeUInt8(0, 12);        // 交错方法: 0

  const ihdrChunk = createChunk('IHDR', ihdr);

  // 创建图像数据 - 简单的渐变背景
  const imageData = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      // 创建渐变效果
      const factor = (x + y) / (width + height);
      imageData[idx] = Math.floor(201 - factor * 50);     // R
      imageData[idx + 1] = Math.floor(184 - factor * 45); // G
      imageData[idx + 2] = Math.floor(168 - factor * 40); // B
    }
  }

  // IDAT chunk (图像数据)
  const idat = createIDAT(imageData, width, height);
  const idatChunk = createChunk('IDAT', idat);

  // IEND chunk (文件结束)
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
};

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');
  const crc = calculateCRC(Buffer.concat([typeBuffer, data]));

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function createIDAT(data, width, height) {
  const zlib = require('zlib');

  // 为每一行添加过滤器 (0 = 无过滤)
  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 3);
    row[0] = 0; // 过滤器类型
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 3;
      row[1 + x * 3] = data[srcIdx];
      row[1 + x * 3 + 1] = data[srcIdx + 1];
      row[1 + x * 3 + 2] = data[srcIdx + 2];
    }
    rows.push(row);
  }

  const rawData = Buffer.concat(rows);
  return zlib.deflateSync(rawData);
}

function calculateCRC(data) {
  const crc = Buffer.alloc(4);
  let crcValue = 0xFFFFFFFF;

  for (let i = 0; i < data.length; i++) {
    crcValue ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (crcValue & 1) {
        crcValue = (crcValue >>> 1) ^ 0xEDB88320;
      } else {
        crcValue = crcValue >>> 1;
      }
    }
  }

  crc.writeUInt32BE((crcValue ^ 0xFFFFFFFF) >>> 0, 0);
  return crc;
}

// 创建图标目录和文件
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

[16, 48, 128].forEach(size => {
  const pngData = createIconPNG(size);
  const filename = path.join(iconsDir, `icon${size}.png`);
  fs.writeFileSync(filename, pngData);
  console.log(`✅ Created ${filename}`);
});

console.log('\n✅ All icons created successfully!');
