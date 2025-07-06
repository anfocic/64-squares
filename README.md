# 64 Squares ♟️

**A modern, cross-platform chess application for tournaments, leagues, and competitive play.**

> **⚠️ Early Development Notice**
> This project is currently in early development. Features are being actively built and the codebase is evolving rapidly. Expect breaking changes and incomplete functionality.

Built with React Native and Expo, 64 Squares brings chess to iOS, Android, and Web with real-time multiplayer, tournament management, and league systems. Perfect for chess clubs, schools, and competitive players.

## 🌟 Upcoming Open Source Release

64 Squares is being developed as a **fully open source** chess platform! We're building this for the chess community, by the chess community. Once the core features are stable, we'll be actively seeking contributors to help expand the platform with:

- 🎯 **Community-driven features** - Your ideas shape the roadmap
- 🌍 **Global accessibility** - Multi-language support and inclusive design
- 🔧 **Plugin architecture** - Extend functionality with custom modules
- 📚 **Educational tools** - Built-in tutorials and training features
- 🏆 **Tournament variety** - Swiss, Round-robin, Knockout, and custom formats

**Join the movement** to create the most comprehensive open source chess platform! Star ⭐ the repository to stay updated on our progress toward the public release.

## 🚧 Development Status

**Current Phase:** Enhanced Forms & Validation System
**Version:** 1.0.0-alpha
**Last Updated:** January 2025

### ✅ Completed Features
- [x] Cross-platform chess board (iOS, Android, Web)
- [x] Chess game logic with Chess.js integration
- [x] Enhanced authentication system with comprehensive validation
- [x] League management with advanced tournament settings
- [x] Game state management with React Context
- [x] Type-safe form validation using Zod
- [x] React Hook Form integration across all forms
- [x] Custom UI components with validation support
- [x] Move validation and game status tracking
- [x] 12+ board themes with custom implementation
- [x] Computer opponents with difficulty levels
- [x] Responsive design for all platforms

### 🚧 In Progress
- [ ] Real-time multiplayer functionality
- [ ] Game persistence and history
- [ ] Player profiles and ratings
- [ ] Push notifications
- [ ] Advanced tournament features (Swiss pairing, brackets)

### 📋 Planned Features
- [ ] Online matchmaking
- [ ] Chess puzzles and training
- [ ] Game analysis and replay
- [ ] Social features and chat
- [ ] Mobile app store deployment

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Chess Engine:** Chess.js + Custom Board Implementation
- **Computer Player:** Simple AI (with difficulty levels)
- **State Management:** React Context + React Query
- **UI Components:** React Native + Custom Components
- **Board Theming:** Custom implementation with 12+ themes
- **Forms:** React Hook Form + Zod validation
- **Validation:** Comprehensive Zod schemas for type safety
- **Navigation:** Expo Router
- **Platforms:** iOS, Android, Web

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anfocic/64-squares.git
   cd 64-squares
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **Web:** Press `w` in the terminal or visit `http://localhost:8081`
   - **iOS:** Press `i` (requires Xcode)
   - **Android:** Press `a` (requires Android Studio)
   - **Mobile:** Scan QR code with Expo Go app

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| 🌐 Web | ✅ Working | Primary development platform |
| 📱 iOS | 🚧 Testing | Requires iOS simulator or device |
| 🤖 Android | 🚧 Testing | Requires Android emulator or device |

## 🏗️ Project Structure

```
64-squares/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── auth/              # Authentication screens
│   └── league/            # League management
├── components/            # Feature-based component organization
│   ├── ui/                # Reusable UI components (atoms)
│   ├── features/          # Feature-specific components
│   │   ├── chess/         # Chess game components
│   │   │   ├── board/     # Board, settings, themes
│   │   │   └── game/      # Game controls, timer, moves
│   │   ├── auth/          # Authentication forms
│   │   ├── league/        # League management
│   │   └── profile/       # User profile components
│   └── layout/            # Layout components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and types
│   ├── game/              # Chess game logic
│   ├── types/             # TypeScript definitions
│   ├── validations/       # Zod validation schemas
│   └── utils/             # Helper functions
└── services/              # API and external services
```

## 🤝 Contributing

We welcome contributions! Since this is in early development, please:

1. **Check existing issues** before starting work
2. **Open an issue** to discuss major changes
3. **Fork the repository** and create a feature branch
4. **Follow the existing code style** (TypeScript + ESLint)
5. **Test your changes** on multiple platforms if possible

### Development Guidelines
- Use TypeScript for all new code
- Follow React Native best practices
- Write meaningful commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Phase 1: Core Game & Validation (Current)
- ✅ Basic chess gameplay
- ✅ Enhanced user authentication with validation
- ✅ Game state management
- ✅ Comprehensive form validation system
- ✅ League creation and management

### Phase 2: Multiplayer
- Real-time game synchronization
- Matchmaking system
- Game invitations

### Phase 3: Tournaments & Leagues
- Tournament creation and management
- League systems with ratings
- Leaderboards and statistics

### Phase 4: Advanced Features
- Chess puzzles and training
- Game analysis tools
- Social features

## 📞 Contact & Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/64-squares/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/64-squares/discussions)

## ⭐ Show Your Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---
