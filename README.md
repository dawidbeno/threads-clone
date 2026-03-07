# Threads Clone

A pixel-faithful mobile clone of [Threads](https://www.threads.net/) — Meta's text-based social media app — built with React Native and Expo. The project replicates the core UI and interactions of Threads, including animated post feeds, scroll-driven headers, and like animations.

![React Native](https://img.shields.io/badge/React_Native-0.81-61dafb?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)

---

## Screenshots

<!-- Add screenshots here -->

---

## Features

- **Feed screen** — scrollable list of posts with an animated Threads logo header that scales on scroll
- **Post cards** — display text content, image galleries, user avatar, username, and relative timestamps
- **Like interactions** — animated like counter with a slide-up number transition and color change
- **Activity screen** — notification feed with scroll-driven floating header and sticky filter tabs
- **Compose modal** — slides up from any tab, supports text input, topic tagging, and attachment options
- **Profile screen** — avatar, bio, follower count, and scrollable tab bar (Threads, Replies, Media, Reposts)
- **Messages screen** — placeholder screen with gradient background
- **Bottom tab navigation** — 5 tabs with icon-only design matching the Threads aesthetic

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native 0.81 + Expo 54 |
| Language | TypeScript 5.9 |
| Navigation | React Navigation v7 (Stack + Bottom Tabs) |
| Animations | React Native Reanimated 4 |
| Icons | Expo Vector Icons (Ionicons, Octicons) |
| Gradients | Expo Linear Gradient |
| Date utilities | date-fns |

---

## Getting Started

**Prerequisites:** Node.js, Expo CLI, and either the Expo Go app or an iOS/Android simulator.

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android emulator.

---

## Project Structure

```
app/
├── src/
│   ├── screens/       # Full-screen components (Feed, Profile, Activity, etc.)
│   ├── components/    # Reusable UI components (PostCard, ActivityPost, etc.)
│   ├── navigation/    # Tab and stack navigator configuration
│   ├── data/          # Mock data (posts, users, activity)
│   └── types/         # Shared TypeScript types
├── assets/            # App icons and splash screen images
└── App.tsx            # Entry point
```
