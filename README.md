# 3things

> Focus on what truly matters — one day, three priorities.

**3things** is a minimalist Chrome extension that helps you stay focused by limiting you to just 3 tasks per day. By constraining your daily to-do list to only the most essential items, it encourages mindful prioritization and reduces decision fatigue.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-88+-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### Core Functionality
- **Daily Task Limit**: Maximum of 3 tasks per day to enforce focus
- **Persistent Storage**: Your data is saved locally using Chrome Storage API
- **Automatic Cleanup**: Automatically removes data older than 30 days
- **Cross-Device Sync**: Syncs across devices when signed into Chrome

### User Interface
- **Elegant New Tab Page**: Replaces Chrome's new tab page with a beautiful, distraction-free interface
- **Quick Access Popup**: Compact popup window for fast task management
- **Smooth Animations**: Delightful micro-interactions powered by Framer Motion
- **Daily Inspiration**: Rotating motivational quotes to keep you motivated
- **Visual Progress**: Track your completion rate with an intuitive progress bar

### History & Analytics
- **History Browser**: View your past 30 days of tasks
- **Daily Statistics**: See completion rates for each day
- **CSV Export**: Download your data for external analysis
- **Smart Filtering**: Only shows days with actual tasks

### Design Philosophy
- **Minimalist Aesthetic**: Clean, uncluttered interface designed for focus
- **Elegant Typography**: Cormorant Garamond and Crimson Text fonts for a sophisticated look
- **Glassmorphism**: Modern frosted glass effects with subtle gradients
- **Responsive Design**: Works seamlessly across different screen sizes

## 🚀 Installation

### Method 1: Install from Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store. Check back soon!

### Method 2: Load Unpacked Extension (Developer Mode)

Follow these steps to install the development version:

#### Prerequisites
- Google Chrome browser (version 88 or higher)
- Node.js and npm installed

#### Build from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/jwhung/3things.git
   cd 3things
   ```

2. **Install dependencies**
   ```bash
   cd extension
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

   This will create a `dist` folder in the `extension` directory.

4. **Load in Chrome**

   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** using the toggle in the top-right corner
   - Click the **"Load unpacked"** button
   - Select the `extension/dist` folder

5. **Verify Installation**

   - Open a new tab — you should see the 3things interface
   - Click the extension icon in your toolbar to open the popup

#### Development Mode

For active development with hot module replacement (HMR):

```bash
cd extension
npm run dev
```

Then load the `extension` folder (not `dist`) in Chrome using the same steps above.

## 📸 Screenshots

### New Tab Page
- Clean, focused interface with your 3 daily tasks
- Visual progress tracking
- Daily motivational quote

### Popup Window
- Compact 360x450px interface
- Quick task management
- No scrolling required

### History Modal
- Browse past 30 days
- Daily completion rates
- Export to CSV

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool with HMR

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **CSS Variables** - Custom theme system

### Chrome Extension
- **Manifest V3** - Latest Chrome extension format
- **Chrome Storage API** - Persistent data storage
- **Chrome URL Overrides** - New tab page replacement

### UI Components
- **shadcn/ui** - High-quality React components built on Radix UI
- **Lucide React** - Beautiful icon library

### Development Tools
- **PostCSS** - CSS transformation
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

## 📂 Project Structure

```
3things/
├── extension/              # Chrome extension source
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript definitions
│   ├── manifest.json      # Extension manifest
│   └── vite.config.ts     # Build configuration
├── PRD/                   # Product requirements
└── README.md             # This file
```

## 💾 Data Privacy

- **Local Storage**: All data is stored locally on your device
- **No Tracking**: No analytics or tracking scripts
- **No Cloud Sync**: Your data never leaves your device (unless you use Chrome's built-in sync)
- **30-Day Retention**: Automatic cleanup of old data

## 🎨 Customization

The extension uses a carefully crafted color palette and typography:

- **Primary Colors**: Warm beige and earth tones (#c9b8a8, #b5a092, #9d8977)
- **Fonts**: Cormorant Garamond (headings) + Crimson Text (body)
- **Effects**: Glassmorphism with subtle gradients

## 🐛 Troubleshooting

### Extension not loading
- Make sure you've built the extension (`npm run build`)
- Verify you selected the `dist` folder, not the source folder
- Check Chrome console for errors (F12 → Console)

### Tasks not saving
- Check that Chrome has storage permissions
- Ensure you're not in incognito mode
- Try disabling other extensions that might interfere

### Layout issues
- Clear your browser cache
- Try zooming in/out (Ctrl + / Ctrl -)
- Check your display scaling settings

## 📝 Development Roadmap

### Completed ✅
- Core task management (add/complete/delete)
- 3-task daily limit
- Chrome Storage integration
- New tab page replacement
- Popup interface
- History browser
- CSV export
- Responsive design
- Automatic data cleanup

### Planned 🔮
- [ ] Chrome Web Store release
- [ ] Task editing functionality
- [ ] Custom themes
- [ ] Pomodoro timer integration
- [ ] Achievement system
- [ ] Statistics dashboard
- [ ] Browser support (Firefox, Safari, Edge)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from minimalist productivity apps
- Icons by [Lucide](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📧 Contact

- **Author**: jwhung
- **Project Repository**: [github.com/jwhung/3things](https://github.com/jwhung/3things)
- **Issues**: [GitHub Issues](https://github.com/jwhung/3things/issues)

---

**Made with ❤️ and ☕**

*Focus on what matters. Ignore the rest.*
