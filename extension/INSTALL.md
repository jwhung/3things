# 3things Extension - Installation Guide

## For Users

### Option 1: Install from Chrome Web Store (Recommended)

1. Open Chrome browser
2. Visit the Chrome Web Store link (coming soon)
3. Click "Add to Chrome"
4. Confirm installation

### Option 2: Install from Downloaded ZIP

#### Step 1: Download the Extension
- Download the latest `3things-extension-v*.zip` file from the [Releases](https://github.com/jwhung/3things/releases) page

#### Step 2: Extract the ZIP
- Right-click the ZIP file
- Select "Extract All..." or "Unzip"
- Remember the extraction location

#### Step 3: Load in Chrome
1. Open Google Chrome
2. Navigate to `chrome://extensions/` (or click menu → More tools → Extensions)
3. Enable **Developer Mode** using the toggle in the top-right corner
4. Click the **"Load unpacked"** button
5. Select the extracted folder (the folder containing `manifest.json`)
6. The extension is now installed!

#### Step 4: Verify Installation
- Open a new tab — you should see the 3things interface
- Click the extension icon in your toolbar to open the popup

### Uninstallation

To remove the extension:
1. Go to `chrome://extensions/`
2. Find "3things" in the list
3. Click "Remove"
4. Confirm removal

---

## For Developers

### Build from Source

```bash
# Clone the repository
git clone https://github.com/jwhung/3things.git
cd 3things/extension

# Install dependencies
npm install

# Build the extension
npm run build

# (Optional) Package for distribution
npm run package
```

### Load Unpacked Extension (Development)

After building:
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **"Load unpacked"**
4. Select the `extension/dist` folder

### Development Mode with HMR

```bash
cd extension
npm run dev
```

Then load the `extension` folder (not `dist`) in Chrome.

---

## Troubleshooting

### Extension won't load
- **Error**: "Manifest file is missing or not readable"
  - **Solution**: Make sure you selected the correct folder containing `manifest.json`

- **Error**: "Manifest is not valid JSON"
  - **Solution**: Re-download the ZIP file and extract it again

### Tasks not saving
- Make sure you're not in incognito mode
- Check that Chrome has storage permissions
- Try disabling other extensions that might interfere

### Layout issues
- Clear your browser cache
- Try zooming in/out (Ctrl + / Ctrl -)
- Check your display scaling settings

### Chrome shows warnings
- **"Extensions installed in developer mode can harm your computer"**
  - This is a standard warning for non-Web Store extensions
  - It's safe to click "Keep extension" since you trust this source

---

## Version History

Check the [CHANGELOG.md](../CHANGELOG.md) for version history and updates.

---

## Support

If you encounter any issues:
- [Report a bug](https://github.com/jwhung/3things/issues)
- [Request a feature](https://github.com/jwhung/3things/issues)
- [Contact the developer](https://github.com/jwhung)

---

**Made with ❤️ for focused productivity**
