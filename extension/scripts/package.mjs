/**
 * Package Extension for Distribution
 * Creates a distributable ZIP file of the extension
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const distDir = path.resolve(__dirname, '../dist');
const packageDir = path.resolve(__dirname, '../packages');
const version = require('../package.json').version;
const packageName = `3things-extension-v${version}.zip`;
const packagePath = path.join(packageDir, packageName);

console.log('📦 Packaging 3things Extension...\n');

// Create packages directory if it doesn't exist
if (!fs.existsSync(packageDir)) {
  fs.mkdirSync(packageDir, { recursive: true });
  console.log('✓ Created packages directory\n');
}

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory not found!');
  console.log('Please run "npm run build" first to build the extension.\n');
  process.exit(1);
}

// Create ZIP using archiver
function createZip() {
  console.log('🗜️  Creating distribution package...');

  const output = fs.createWriteStream(packagePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  output.on('close', () => {
    const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`\n✅ Package created successfully!`);
    console.log(`📁 Location: ${packagePath}`);
    console.log(`📊 Size: ${sizeInMB} MB\n`);
    console.log('📋 Installation Instructions:');
    console.log('   1. Download and extract the ZIP file');
    console.log('   2. Open Chrome and go to chrome://extensions/');
    console.log('   3. Enable "Developer mode" (toggle in top right)');
    console.log('   4. Click "Load unpacked"');
    console.log('   5. Select the extracted folder\n');
  });

  archive.on('error', (err) => {
    console.error('\n❌ Failed to create ZIP file');
    console.error(err);
    console.log('\nYou can manually compress the "dist" folder into a ZIP file.');
    console.log(`📁 Dist location: ${distDir}\n`);
    process.exit(1);
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Append all files from dist directory
  archive.directory(distDir, false);

  // Finalize the archive
  archive.finalize();
}

createZip();
