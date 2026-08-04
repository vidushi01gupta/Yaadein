# 🎮 YAADEIN – 90s Nostalgia Word Guessing Game

YAADEIN is a daily word-guessing web game inspired by the nostalgia of the 1990s. Players receive theme related hints and must guess a memorable word from the 90s era. A new challenge is released every day, encouraging users to return daily and maintain their winning streak.

🌐 **Live Demo:** [https://theindianalmanac-yaadein-play.vercel.app](https://theindianalmanac-yaadein-play-aocroaaxs-vidushi-s-projects.vercel.app/)

---

## ✨ Features

- 🎯 Daily 90s-themed word challenge
- 📅 Automatically changes puzzle every day
- 💡 Theme-based hints
- 🔥 Streak tracking using Local Storage
- 📊 Shareable results
- 📱 Progressive Web App (PWA)
- 📲 Installable on mobile and desktop
- 🔔 Push notifications using OneSignal
- ⚡ Fast loading and responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- CSS3

### PWA
- vite-plugin-pwa
- Service Workers
- Web App Manifest

### Notifications
- OneSignal Web Push SDK

### Deployment
- Vercel

### Version Control
- Git
- GitHub

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Grid.jsx
│   ├── Header.jsx
│   ├── Keyboard.jsx
│   ├── ResultModal.jsx
│   ├── HintPopup.jsx
│   ├── HowToPlay.jsx
│   └── InstallButton.jsx
│
├── utils/
│   ├── getDailyData.js
│   ├── checkWord.js
│   ├── reminder.js
│   ├── share.js
│   └── streak.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/vidushi01gupta/Yaadein.git
```

Move into the project directory

```bash
cd Yaadein
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 🔔 Push Notifications

YAADEIN integrates **OneSignal Web Push Notifications** to remind users about the daily puzzle.

Features include:

- Browser notification permission
- Daily reminder notifications
- User subscription management
- Scheduled notification campaigns

---

## 📱 Progressive Web App

Users can install YAADEIN as an application on:

- Android
- Windows
- macOS

PWA features include:

- Offline asset caching
- Fast loading
- Home screen installation
- Responsive interface

---


## 📈 Future Enhancements

- Multiple difficulty levels
- Leaderboard
- User accounts
- Theme customization
- More nostalgic categories
- Statistics dashboard
- Daily challenge archive

---

## 👩‍💻 Author

**Vidushi Gupta**

GitHub: https://github.com/vidushi01gupta

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
