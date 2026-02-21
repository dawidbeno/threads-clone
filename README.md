# threads-clone
A clone of the Threads application


# Tasks
## Milestone 1 — Foundation

### Issue 1: Initialize Expo project with TypeScript
**Labels:** `setup`

Create a new Expo project using the blank TypeScript template.
- Run `npx create-expo-app@latest threads-clone --template blank-typescript`
- Verify the app runs on simulator/device with `npx expo start`
- Clean up any boilerplate in `App.tsx`

---

### Issue 2: Set up folder structure
**Labels:** `setup`

Create the base folder structure for the project:
- `/src/screens` — full screens (Feed, Profile, etc.)
- `/src/components` — reusable UI components
- `/src/data` — mock data
- `/src/navigation` — navigation configuration
- `/src/types` — shared TypeScript types

---

### Issue 3: Install and configure React Navigation
**Labels:** `setup`

Install React Navigation and its dependencies:
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`
- `react-native-screens`, `react-native-safe-area-context`

Wrap `App.tsx` with `NavigationContainer`. Verify no errors on startup.

#### Solution:
| Package | Purpose |
|---|---|
| `@react-navigation/native` | Core foundation, provides `NavigationContainer` which wraps your whole app |
| `@react-navigation/native-stack` | Stack navigator using native iOS/Android primitives — smooth animations and good performance |
| `@react-navigation/bottom-tabs` | Bottom tab bar navigator |
| `react-native-screens` | Allows React Navigation to use native screen components instead of plain Views — better memory management |
| `react-native-safe-area-context` | Handles safe areas (notch, home indicator) so UI doesn't get clipped on modern phones |

Note: using `npx expo install` instead of `npm install` is recommended — it picks versions compatible with your current Expo SDK automatically.

Command:
```tsx
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

---

### Issue 4: Create mock data
**Labels:** `data`

Create `/src/data/mockPosts.ts` with at least 5 posts. Each post should include:
- `id`, `username`, `avatarUrl`, `content`, `timestamp`
- `likesCount`, `commentsCount`, `repostsCount`
- Optional: `imageUrl` for at least one post

Also define the TypeScript type for a post in `/src/types/index.ts`.

---

## Milestone 2 — Core UI

### Issue 5: Build PostCard component
**Labels:** `ui`

Create `/src/components/PostCard.tsx`. It should display:
- User avatar (use a placeholder image service like `https://i.pravatar.cc`)
- Username
- Post text content
- Action row: like, comment, repost, share buttons (text/icon placeholders for now)
- Timestamp

Accept a `post` prop using the type defined in Issue 4.

---

### Issue 6: Build FeedScreen
**Labels:** `ui`

Create `/src/screens/FeedScreen.tsx`:
- Use a `FlatList` to render the mock posts using `PostCard`
- Add a simple header ("Threads" logo or text)
- Make sure scrolling works smoothly

---

### Issue 7: Build ProfileScreen
**Labels:** `ui`

Create `/src/screens/ProfileScreen.tsx`:
- Header section: avatar, display name, handle, short bio, follower count
- Below: list of posts by that user (filter mock data or hardcode a subset)
- Use `FlatList` with a `ListHeaderComponent` for the profile header

---

## Milestone 3 — Navigation

### Issue 8: Set up Bottom Tab Navigator
**Labels:** `navigation`

Create `/src/navigation/TabNavigator.tsx` with 5 tabs:
- Home → FeedScreen
- Search → placeholder screen
- New Post → placeholder screen (will become a modal later)
- Activity → placeholder screen
- Profile → ProfileScreen

Wire it up in `App.tsx` inside `NavigationContainer`.

---

### Issue 9: Add tab bar icons
**Labels:** `ui`

Use `@expo/vector-icons` (already included with Expo) to add icons to each tab:
- Home: `home` / `home-outline`
- Search: `search`
- New Post: `add-circle` or similar
- Activity: `heart` / `heart-outline`
- Profile: `person` / `person-outline`

Hide tab labels to match the Threads style.

---

### Issue 10: Build Compose screen as a modal
**Labels:** `navigation`, `ui`

Wrap the Tab Navigator in a Stack Navigator in `App.tsx`. Add a `ComposeScreen` that:
- Slides up as a modal when the New Post tab is tapped
- Has a text input, a "Post" button, and a cancel/close button
- No backend required — just dismiss the modal on submit

Reference: React Navigation modal presentation docs.

---

## Milestone 4 — Polish

### Issue 11: Implement light/dark theme support
**Labels:** `polish`

- Use `useColorScheme` from React Native to detect system theme
- Define a simple theme object with background, text, and border colors for both light and dark
- Apply theme colors consistently across `PostCard`, `FeedScreen`, and `ProfileScreen`

---

### Issue 12: Visual polish pass
**Labels:** `polish`

Final round of visual refinements to closer match Threads:
- Typography: font sizes and weights for username, handle, content, timestamp
- Spacing and padding consistency
- Separator lines between posts
- Safe area handling on all screens
- Test on at least two screen sizes
