# Manifesto

**Manifesto** is a South African civic engagement platform that empowers citizens to participate in democracy, track government accountability, and engage with civic processes.

## 🏛️ About

Manifesto is a civic-tech super app that combines social engagement with government transparency. It enables citizens to:
- Debate civic issues
- Create and participate in polls and surveys
- Start and sign petitions
- Track government projects and budgets
- Monitor leader promises and performance
- Upload and verify citizen media
- Engage with parliamentary activity

## 🚀 Features

- **Authentication**: Sign up with phone OTP, email, and password
- **Home Feed**: Unified feed of debates, polls, petitions, and media
- **Debates**: Structured debate rooms with reactions
- **Polls & Surveys**: Create and vote in polls with real-time results
- **Petitions**: Create and sign petitions with progress tracking
- **Government Hub**: Comprehensive government transparency modules
  - **Leaders**: Directory with promises, achievements, and ratings
  - **Departments**: Budget tracking and performance monitoring
  - **Projects & Tenders**: Project tracking with citizen media
  - **Parliament**: Bills, sessions, and voting records
- **Camera & Media**: Photo/video capture with filters and verification
- **Real-time Updates**: Live data synchronization via Convex

See [docs/FEATURES.md](docs/FEATURES.md) for complete feature list.

## 🛠️ Tech Stack

### Frontend
- **React Native** with **Expo** (~50.0.0)
- **TypeScript** for type safety
- **React Navigation** (Stack + Bottom Tabs)
- **NativeWind** (Tailwind CSS for React Native)
- **Zustand** for state management
- **Convex** hooks for real-time data

### Backend
- **Convex** for realtime database, auth, and server functions
- **Cloudinary** (or S3) for media storage
- **OpenAI/Gemini** for AI features (planned)

### Development
- **Jest** for unit testing
- **Detox** for E2E testing (scaffold)
- **ESLint** for code quality
- **GitHub Actions** for CI/CD

## 📋 Prerequisites

- Node.js 18+
- Yarn or npm
- Expo CLI
- Convex account (for backend)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Manifesto-app
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required variables:
- `CONVEX_URL` - Your Convex deployment URL
- `CONVEX_DEPLOYMENT` - Convex deployment name
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `OPENAI_API_KEY` - OpenAI API key (optional, for AI features)
- `GEMINI_API_KEY` - Gemini API key (optional, for AI features)

### 4. Set Up Convex

```bash
# Install Convex CLI globally if not already installed
npm install -g convex

# Initialize Convex (if not already done)
npx convex dev
```

Follow the prompts to create a Convex project and get your deployment URL.

### 5. Start the Development Server

```bash
# Start Expo dev server
yarn start

# Or run on specific platform
yarn ios      # iOS simulator
yarn android  # Android emulator
yarn web      # Web browser
```

### 6. Start Convex Backend

In a separate terminal:

```bash
yarn convex:dev
```

## 📱 Available Scripts

- `yarn start` - Start Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn web` - Run on web browser
- `yarn test` - Run Jest unit tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:e2e` - Run Detox E2E tests
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn type-check` - Run TypeScript type checking
- `yarn convex:dev` - Start Convex development server
- `yarn convex:deploy` - Deploy Convex functions

## 📁 Project Structure

```
Manifesto-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API and service integrations
│   ├── store/            # Zustand state stores
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── data/             # Mock data for development
│   └── convex/           # Convex generated types (placeholder)
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── auth.ts           # Authentication functions
│   ├── posts.ts          # Post functions
│   ├── debates.ts        # Debate functions
│   ├── polls.ts          # Poll functions
│   ├── petitions.ts      # Petition functions
│   ├── media.ts          # Media functions
│   └── government.ts     # Government hub functions
├── docs/                 # Documentation
│   ├── FEATURES.md       # Feature documentation
│   └── AI_PLAN.md        # AI integration plan
├── e2e/                  # E2E tests (Detox)
├── .github/workflows/    # CI/CD workflows
├── App.tsx               # Main app entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## 🧪 Testing

### Unit Tests

```bash
yarn test
```

### E2E Tests

```bash
# Build the app first
yarn build

# Run E2E tests
yarn test:e2e
```

## 🏗️ Building for Production

### iOS

```bash
# Build iOS app
eas build --platform ios
```

### Android

```bash
# Build Android app
eas build --platform android
```

## 🔧 Configuration

### Convex Backend

The Convex backend is configured in `convex/`. See `convex/schema.ts` for the data model.

### Firebase Alternative

Firebase configuration is commented out in `.env.example`. To use Firebase instead of Convex:

1. Uncomment Firebase variables in `.env`
2. Update auth service to use Firebase
3. Update database queries to use Firebase
4. Remove Convex dependencies

## 🤝 Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Write tests for new features
4. Run linting and tests
5. Submit a pull request

## 📝 TODO

See individual files for TODO comments. Major areas:

- [ ] Complete Convex integration
- [ ] Implement actual authentication
- [ ] Integrate Cloudinary for media uploads
- [ ] Implement AI features (see `docs/AI_PLAN.md`)
- [ ] Add comprehensive tests
- [ ] Implement offline mode
- [ ] Add push notifications
- [ ] Multi-language support

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

- South African citizens for inspiration
- Open source community for amazing tools
- Convex for the excellent backend platform

## 📞 Contact

[Add contact information]

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic app structure
- ✅ Navigation and screens
- ✅ Convex backend schema
- ✅ Mock data and UI
- ⏳ Complete integrations
- ⏳ Testing

### Phase 2 (Planned)
- AI Civic Advisor
- Blockchain transparency
- Citizen rewards
- Offline mode
- Advanced analytics

See [docs/FEATURES.md](docs/FEATURES.md) for detailed roadmap.

---

**Built with ❤️ for South Africa**
