# Custom Pull-to-Refresh Implementation Plan

## Overview

The goal is to replace the default native pull-to-refresh spinner on the FeedScreen with a custom animated indicator that mimics the real Threads app behavior. In Threads, when the user pulls down on the feed, no native scroll indicator appears. Instead, a small icon (the Threads "@" logo) is revealed above the list and plays a glowing/pulsing animation while content refreshes.

This plan is broken into six phases, each building on the previous one. The idea is to make incremental progress so you can test and verify at every step.

---

## Phase 1 — Convert FlatList to Animated.FlatList with Reanimated

The current `FeedScreen.tsx` uses a plain `FlatList` from React Native. The first step is to swap it over to reanimated's `Animated.FlatList` so we can track the scroll position on the UI thread, which is essential for driving smooth animations during the pull gesture.

**What to do:**

Import `Animated`, `useSharedValue`, and `useAnimatedScrollHandler` from `react-native-reanimated`. Create a shared value called `scrollY` and wire up a scroll handler that updates it on every scroll event. At this point nothing visual changes — you're just laying the plumbing. The feed should scroll exactly as before after this change. Verify that in Expo Go before moving on.

**Key concept:** By tracking scroll on the UI thread (via reanimated) rather than the JS thread (via `onScroll` with `setState`), the pull animation will run at 60fps without any jank, even if the JS thread is busy.

---

## Phase 2 — Build the Custom Refresh Indicator Component

Create a new file: `src/components/CustomRefreshSpinner.tsx`. This is the visual element that replaces the native spinner.

### What the component receives as props

The component needs two pieces of information passed in: a reanimated shared value representing the current scroll offset (`scrollY`), and a boolean `isRefreshing` that tells it whether a refresh is currently in progress.

### What the component renders

A small icon that serves as the Threads-style indicator. For now, you can use `Ionicons` `at-outline` as a stand-in for the Threads "@" logo. Later you could swap in a custom SVG or image asset.

### Animated behaviors to wire up

**While pulling (before release):** The icon's opacity and scale should increase proportionally as the user drags down. This is driven by `scrollY` through `useAnimatedStyle` combined with `interpolate`. The effect should feel like "the further I pull, the more the icon appears." A reasonable mapping is: at `scrollY = 0` the icon is invisible (opacity 0, scale 0.3), at `scrollY = -40` it starts becoming visible, and by `scrollY = -80` it's fully visible at full scale. You can also add a subtle rotation driven by the scroll offset for extra polish.

**While refreshing (after release past threshold):** Once the refresh is triggered, the icon switches from scroll-driven animation to a self-running loop. Use `withRepeat(withSequence(withTiming(...), withTiming(...)))` to create a breathing/pulsing effect — the icon gently scales up and down, and its opacity oscillates between, say, 0.6 and 1.0. This is the "glow" effect.

**On refresh complete:** When `isRefreshing` flips back to `false`, the icon fades and scales back to zero.

---

## Phase 3 — Layout Architecture

This is the key structural change. The indicator needs to sit behind the FlatList so that when the user overscrolls (pulls down), the iOS bounce effect reveals the indicator underneath.

### The layout structure

Wrap everything in a parent `<View style={{ flex: 1 }}>`. Place the `CustomRefreshSpinner` as an absolutely positioned element near the top center of this container. The `Animated.FlatList` sits on top of it, filling the full parent. Because iOS naturally allows overscroll bounce, pulling down "lifts" the list content and reveals whatever is behind it — which is your custom indicator.

```
┌───────────────────────────────────┐
│         Parent View (flex: 1)     │
│                                   │
│   ┌───────────────────────────┐   │
│   │  CustomRefreshSpinner     │   │  ← position: absolute, top: ~40
│   │  (behind the list)        │   │     zIndex: 1
│   └───────────────────────────┘   │
│                                   │
│   ┌───────────────────────────┐   │
│   │                           │   │
│   │   Animated.FlatList       │   │  ← zIndex: 2, but transparent bg
│   │   (your feed content)     │   │     so overscroll reveals spinner
│   │                           │   │
│   └───────────────────────────┘   │
│                                   │
└───────────────────────────────────┘
```

### The transparency trick

This is the crucial detail that makes it all work. The FlatList itself needs `backgroundColor: 'transparent'` so that when it overscrolls, you can see through to the indicator behind it. But you still want the actual content area to look white. You achieve this by setting `backgroundColor: '#fff'` on the `ListHeaderComponent` and on each post item (or on `contentContainerStyle`), rather than on the FlatList's `style` prop. That way the content is white, but the "empty" overscroll space above the content is see-through.

### No refreshControl prop

Do **not** pass a `refreshControl` prop to the FlatList. That's what triggers the native spinner. By omitting it entirely, no native indicator will appear.

---

## Phase 4 — Pull Detection and Refresh Trigger

Inside the `useAnimatedScrollHandler`, you need to handle two events: continuous scroll tracking and release detection.

### Continuous tracking (onScroll)

The `onScroll` callback updates `scrollY.value` on every frame. This is what drives the indicator's pull-proportional animation in real time. Nothing special here — just `scrollY.value = event.contentOffset.y`.

### Release detection (onEndDrag)

The `onEndDrag` callback fires when the user lifts their finger. This is where you check whether they pulled past the activation threshold. If `event.contentOffset.y < -80` (or whatever threshold feels right), you call `runOnJS(startRefresh)()` to flip `isRefreshing` to `true` on the JS thread.

### Keeping the indicator visible during refresh

There's a subtlety here. Once the user releases, the list will naturally bounce back to offset 0, which would hide the indicator. To keep it visible while refreshing, you have two options. The simpler approach is to temporarily add `contentInset={{ top: 60 }}` and `contentOffset={{ y: -60 }}` while refreshing, which holds the list slightly pulled down. The alternative is to use the FlatList ref and call `scrollToOffset({ offset: -60, animated: true })` when refresh starts, then `scrollToOffset({ offset: 0, animated: true })` when it finishes.

---

## Phase 5 — Simulate the Refresh

Since this is a presentation-focused app without a real backend, the refresh just needs to feel authentic. Create a `startRefresh` function that sets `isRefreshing` to `true`, waits 1.5 to 2 seconds using `setTimeout`, and then sets `isRefreshing` back to `false`.

To make it feel like something actually happened, you could shuffle the mock posts array on each refresh, or prepend a randomly generated new post to the top of the list. This gives the visual impression that fresh content was fetched, which makes the pull-to-refresh feel purposeful rather than decorative.

---

## Phase 6 — Polish and Tuning

This final phase is about dialing in the feel so it matches the quality of the real Threads app.

### Interpolation ranges

Fine-tune how quickly the icon appears and how it scales. You want a "dead zone" for the first 20-30 points of pull where nothing visible happens (since light scrolls shouldn't trigger the indicator), then a smooth ramp from there to the threshold. Experiment with values until it feels like the icon "catches" naturally.

### Glow effect

Layer a second `Animated.View` behind the icon with a larger scale, lower opacity, and optionally a blur (using `expo-blur`). Animate this halo's opacity and scale slightly out of phase with the main icon to create a pulsing, glowing look. Even a simple semi-transparent circle behind the icon with animated opacity goes a long way.

### Haptic feedback

When the user's pull crosses the activation threshold, fire a light haptic tap using `expo-haptics`. Call `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` right at the moment the threshold is crossed. This is exactly what the real Threads app does, and it provides a satisfying tactile "click" that signals "you can release now, refresh will happen." Install with `npx expo install expo-haptics`.

### Rotation

The real Threads icon rotates subtly during the pull. Add a `rotate` transform driven by the scroll offset — something like mapping `scrollY` from `[-80, 0]` to `[360deg, 0deg]` gives a nice full-turn effect as the user pulls.

---

## Files to Create or Modify

### New files

**`src/components/CustomRefreshSpinner.tsx`** — The animated indicator component. Receives `scrollY` (shared value) and `isRefreshing` (boolean) as props. Contains all the interpolation and loop animation logic.

**`src/hooks/useCustomRefresh.ts`** (optional) — A reusable hook that encapsulates the shared value, scroll handler, `isRefreshing` state, and `startRefresh` / `endRefresh` functions. This is useful if you later want to add the same pull-to-refresh behavior to other screens like Profile or Search.

### Modified files

**`src/screens/FeedScreen.tsx`** — The main changes happen here. Swap `FlatList` to `Animated.FlatList`, add the scroll handler, wrap the content in a parent View, integrate the `CustomRefreshSpinner` component, adjust background transparency, and remove any `refreshControl` usage.

---

## Dependencies

You already have `react-native-reanimated` installed from the ProfileScreen collapsing header work, so no new animation library is needed. Two optional additions that improve the experience are `expo-haptics` for the tactile threshold feedback (install with `npx expo install expo-haptics`) and `expo-blur` for the glow halo effect, which you already have from earlier work.