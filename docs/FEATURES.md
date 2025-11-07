# Manifesto App Features

## Overview
Manifesto is a South African civic engagement platform that empowers citizens to participate in democracy, track government accountability, and engage with civic processes.

## Core Features

### 1. Authentication & User Profiles
- **Sign Up**: Name, email, phone number registration
- **Phone OTP Verification**: SMS-based verification (mocked in development)
- **Password Authentication**: Secure password-based login
- **Profile Setup**: Optional bio, photo, and civic interests
- **User Badges**: Recognition system for active citizens
- **Trust Score**: Credibility rating based on activity

### 2. Home Feed
- **Unified Feed**: Merges debates, polls, petitions, and media
- **Real-time Updates**: Live data from Convex backend
- **Government Hub Access**: Quick access button to government modules
- **Create Post**: Quick action to create new content
- **Swipe to Camera**: Swipe right gesture to open camera
- **Media Feed**: Citizen-uploaded photos and videos
- **Interactive Actions**: Like, comment, share on all content

### 3. Debates
- **Structured Debates**: Organized debate rooms on civic topics
- **Reactions**: Agree, Disagree, Neutral reactions
- **Real-time Counts**: Live reaction and comment counts
- **Topic Filtering**: Filter by topic categories
- **Linked Content**: Link debates to projects, policies, or leaders

### 4. Polls & Surveys
- **Create Polls**: Multiple choice or single choice polls
- **Real-time Results**: Live voting results with visualizations
- **Option Tracking**: Individual option vote counts
- **Deadline Management**: Polls with expiration dates
- **Linked Context**: Link polls to projects or leaders

### 5. Petitions
- **Create Petitions**: Title, description, goal, and deadline
- **Signature Tracking**: Real-time signature counts
- **Progress Visualization**: Progress bars showing goal completion
- **Status Management**: Active, completed, expired, successful states
- **Sharing**: Share petitions to increase visibility

### 6. Government Hub
A comprehensive module for government transparency:

#### Leaders
- **Directory**: Complete list of politicians and officials
- **Profile Pages**: Bio, position, party, promises, achievements
- **Promise Tracking**: Status of promises (pending, in progress, fulfilled, broken)
- **Approval Ratings**: Citizen-driven approval scores
- **Project Links**: Associated projects and responsibilities
- **Scandals & Achievements**: Transparent record of both

#### Departments
- **Department List**: National, provincial, and municipal departments
- **Budget Tracking**: Allocated vs. spent budgets
- **Performance Ratings**: Citizen feedback scores
- **Key Initiatives**: Major projects and programs
- **Issues Tracking**: Reported issues with severity levels

#### Projects & Tenders
- **Project Directory**: All government projects and tenders
- **Stage Tracking**: Planning, tender, in progress, completed, etc.
- **Budget Monitoring**: Budget allocation vs. actual spending
- **Milestone Tracking**: Project milestones and completion status
- **Citizen Media**: User-uploaded photos/videos of project progress
- **Location Data**: Geographic location of projects
- **Jobs Created**: Employment impact tracking

#### Parliament
- **Bills & Sessions**: Parliamentary activity tracking
- **Voting Records**: How leaders voted on bills
- **Attendance Records**: Presence/absence tracking
- **Status Tracking**: Draft, tabled, debating, voting, passed, rejected
- **Linked Debates**: Connect parliamentary activity to citizen debates

### 7. Media & Camera
- **Camera Integration**: Native camera with filters
- **Filter Effects**: Color and effect filters for photos
- **Gallery Picker**: Choose from device gallery
- **Media Upload**: Upload to Cloudinary (mocked) or local storage
- **Media Verification**: AI-powered authenticity verification
- **Project Linking**: Link media to projects
- **Media Feed**: Browse all citizen-uploaded media
- **Verification Status**: Pending, verified, rejected states

### 8. Real-time Features
- **Live Updates**: Real-time data synchronization via Convex
- **Live Counts**: Reaction, vote, and signature counts update instantly
- **Notifications**: User notifications for relevant events
- **Activity Feed**: Real-time activity stream

### 9. Search & Discovery
- **Content Search**: Search debates, polls, petitions, projects
- **Filtering**: Filter by type, status, topic, etc.
- **Tag System**: Hashtag-based content discovery
- **Trending**: Popular and trending content

### 10. Transparency Features
- **Fact-check Badges**: Verified vs. unverified content
- **AI Verification**: Automated content verification
- **Budget Visualization**: Visual budget tracking
- **Progress Tracking**: Promise and project progress
- **Open Data Integration**: Link to official datasets

## Technical Features

### Backend (Convex)
- **Real-time Database**: Live data synchronization
- **Server Functions**: Query, mutation, and action functions
- **Authentication**: User authentication and session management
- **File Storage**: Media metadata storage
- **Schema**: Comprehensive data model with relationships

### Frontend (React Native + Expo)
- **Cross-platform**: iOS and Android support
- **Navigation**: Stack and bottom tab navigation
- **State Management**: Zustand for local state, Convex for live data
- **Styling**: NativeWind (Tailwind) for utility-first styling
- **Components**: Reusable UI component library

### Development Features
- **TypeScript**: Full type safety
- **Testing**: Jest unit tests and Detox E2E scaffold
- **CI/CD**: GitHub Actions workflow
- **Linting**: ESLint configuration
- **Mock Data**: Development mock data for UI testing

## Phase 2 Features (Planned)

1. **AI Civic Advisor**: Personalized recommendations
2. **Blockchain Transparency**: Immutable records
3. **Citizen Rewards**: Incentives for verified reports
4. **Offline Mode**: SMS/USSD for rural access
5. **Data Trust Scores**: Leader and department ratings
6. **Advanced Analytics**: Detailed engagement metrics
7. **Export Features**: Export data and reports
8. **Multi-language Support**: Multiple South African languages
9. **Accessibility**: Enhanced accessibility features
10. **Push Notifications**: Real-time push notifications

## Data Model Relationships

- Users can create posts, debates, polls, petitions, and media
- Debates, polls, and petitions can link to projects, leaders, or departments
- Projects can have multiple leaders/departments and media uploads
- Leaders can have multiple promises, projects, and departments
- Media uploads can link to projects, posts, or be standalone
- Parliament items can link to debates and polls

See `convex/schema.ts` for complete data model documentation.

