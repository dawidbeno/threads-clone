# ScrollView vs FlatList: Sticky Headers on the Activity Screen

## The Problem

The Activity screen needs a **sticky filter pills row** — a horizontal row of category buttons ("All", "Follows", "Replies", etc.) that scrolls up with the content, then **sticks** to the top of the screen once it reaches the safe area edge.

## Why ScrollView wins here

### `stickyHeaderIndices` needs direct children

Both `ScrollView` and `FlatList` support the `stickyHeaderIndices` prop, but there's an important difference in how they render children.

**ScrollView** renders its children directly — each child is a real, addressable element. So when you write:

```
<ScrollView stickyHeaderIndices={[1]}>
  <TitleSection />      ← child 0, scrolls away
  <FilterTabs />        ← child 1, sticks at top
  <ActivityItem />      ← child 2+
  <ActivityItem />
</ScrollView>
```

React Native knows exactly which element index 1 refers to and can pin it natively.

**FlatList** virtualizes its children — it doesn't render all items at once, and the internal structure wraps items in a way that makes `stickyHeaderIndices` unreliable or require workarounds. FlatList is optimized for **long, uniform lists**, not mixed layouts with sticky sections.

### Performance trade-off is fine here

FlatList's main advantage is **virtualization** — only rendering items visible on screen, which matters for lists with hundreds or thousands of items. The Activity screen will typically show tens of items, not thousands. For this scale, ScrollView performs just as well without the complexity of virtualization.

### Native stickiness > manual animation

Using `stickyHeaderIndices` delegates the sticky behavior to the **native UI thread**. This means:

- No JavaScript bridge overhead
- No `onScroll` handler calculating positions
- No `Animated.event` or reanimated scroll handlers needed
- Buttery smooth 60fps sticking, handled by iOS/Android natively

Compare this to the ProfileScreen's collapsing header, where we manually interpolated `scrollY` to animate height and opacity — that works, but it's more code and more room for jank.

## When to use FlatList instead

- Lists with 50+ items (virtualization matters)
- Uniform item heights (FlatList optimizes for this)
- Infinite scroll / pagination
- When you don't need sticky intermediate sections

## TL;DR

ScrollView + `stickyHeaderIndices` gives us native sticky behavior for free, with zero animation code. FlatList's virtualization is overkill for a short activity list and makes sticky headers harder to implement correctly.
