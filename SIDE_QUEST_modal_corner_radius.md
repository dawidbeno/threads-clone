# Side Quest: Modal Corner Radius in Expo Go

**Status**: Deferred

## Problem

`sheetCornerRadius` (set on the `NewPost` screen in `RootNavigator.tsx`) is a native property from `react-native-screens` and does **not work in Expo Go**. Expo Go ships fixed native modules and cannot pick up custom native configurations.

## Current State

`sheetCornerRadius: 10` is already set in the navigator options but has no visible effect when running via Expo Go.

## Resolution Options

1. **Development build** — run `npx expo run:ios` or an EAS dev build to unlock native module support.
2. **Content-only workaround** — apply `borderTopLeftRadius` / `borderTopRightRadius` on the root `View` inside `NewPostScreen`. This rounds the content, not the modal sheet itself.
