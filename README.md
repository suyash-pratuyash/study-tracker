# Study Tracker 🎯

A modern, minimalist web application designed to help students stay focused and manage their tasks effectively. Combines a Pomodoro timer with an intelligent task manager—all running locally in your browser.

**Stay focused. Get things done.**

## ✨ Features

### 🍅 Pomodoro Timer
- **Three Work Modes**: Customize your study sessions
  - Focus (25 minutes) - Deep work sessions
  - Short Break (5 minutes) - Quick mental resets
  - Long Break (15 minutes) - Extended recovery time
- **Visual Progress Circle**: Beautiful SVG-based circular progress indicator
- **Cycle Tracking**: Keep count of completed focus sessions
- **Desktop Notifications**: Get alerted when sessions complete (with permission)
- **Smooth Controls**: Play, pause, and reset buttons with responsive feedback

### ✅ Task Manager
- **Quick Task Entry**: Add tasks with custom categories
- **Task Categories**: Pre-defined tags (Study, Revision, Assignment, Reading, Other)
- **Smart Filtering**: View All, Pending, or Completed tasks
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Task Management**: Mark tasks as done, delete individual tasks, or clear all completed tasks
- **Local Storage**: All tasks are automatically saved to your browser

### 💾 Offline-First Design
- **No Backend Required**: All data stored locally in browser
- **Works Offline**: Full functionality without internet connection
- **Data Persistence**: Tasks and timer state persist across sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suyash-pratuyash/study-tracker.git
   cd study-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🛠️ Build & Deployment

### Production Build
```bash
npm run build
```

Creates an optimized build in the `dist/` directory ready for deployment.

### Preview Build
```bash
npm run preview
```

Preview the production build locally before deploying.

## 📦 Tech Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12
- **Styling**: Tailwind CSS 4.3.0
- **Runtime**: ES Modules
- **Linting**: ESLint 10.3.0

## 📁 Project Structure

```
study-tracker/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── assets/           # Static assets
├── public/               # Public assets
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # This file
```

## 🎨 Design Features

- **Dark Theme**: Easy on the eyes with a sophisticated dark interface
- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Responsive Layout**: Optimized for desktop and tablet viewing
- **Color-Coded Modes**: Each timer mode has its own distinctive color
  - Focus: Red (#e85d4a)
  - Short Break: Green (#4ade80)
  - Long Break: Blue (#60a5fa)
- **Smooth Animations**: Fluid transitions and interactions throughout
- **Accessibility**: Semantic HTML and keyboard-friendly controls

## 🧠 Usage Tips

### Maximize Your Pomodoro Sessions
1. Set a clear task before starting a Focus session
2. Eliminate distractions during the 25-minute window
3. Use breaks to stretch and recharge
4. Track your cycles to monitor productivity

### Effective Task Management
1. Break down large projects into smaller, actionable tasks
2. Use tags to categorize your work
3. Complete tasks during Focus sessions
4. Review completed tasks weekly

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔔 Permissions

The app requests browser notification permissions to alert you when timer sessions complete. You can grant or deny this permission when prompted.

## 💾 Data Storage

All your tasks and preferences are stored in your browser's **localStorage**. This means:
- ✅ Your data stays private (never sent to any server)
- ✅ Data persists even after closing the browser
- ✅ Clearing browser data will remove stored tasks
- ✅ Data is device-specific (won't sync across devices)

## 🌐 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES2020+ support

## 🐛 Known Limitations

- Single-device only (no cloud sync)
- No user accounts or authentication
- Data is cleared if you clear browser storage

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest features
- Submit pull requests with improvements

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [suyash-pratuyash](https://github.com/suyash-pratuyash)

## 🙏 Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- UI/UX inspiration from modern productivity apps
- Tailwind CSS for beautiful utility-first styling

---

**Made with ❤️ for focused learners everywhere**
