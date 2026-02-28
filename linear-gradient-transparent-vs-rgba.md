# LinearGradient: `transparent` vs `rgba(255,255,255,0)`

## The Problem

When fading from white to invisible in a `LinearGradient`, the color you choose for "invisible" matters more than you'd expect.

## `transparent` = Transparent Black

In React Native (and CSS), the keyword `transparent` is defined as `rgba(0, 0, 0, 0)` — it's **black** with zero opacity.

So when you write:

```jsx
colors={['#fff', 'transparent']}
// which is really:
colors={['#fff', 'rgba(0, 0, 0, 0)']}
```

The gradient interpolates between **white** and **black**, just with the opacity fading out. The in-between colors mix white and black channels, producing **gray tones** in the middle of the gradient — even though both endpoints appear "invisible" or "white" at their respective ends.

## `rgba(255, 255, 255, 0)` = Transparent White

```jsx
colors={['#fff', 'rgba(255, 255, 255, 0)']}
// which is:
colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
```

Here, the **color channels stay white** throughout. Only the **alpha (opacity)** changes from 1 to 0. No black is involved, so no gray appears in the gradient.

## Visual Comparison

```
white → transparent          white → rgba(255,255,255,0)
  #fff                         #fff
  light gray (!)               white, slightly see-through
  medium gray (!)              white, more see-through
  dark gray (!)                white, almost invisible
  invisible                    invisible
```

## Rule of Thumb

Always match the **color channels** of your gradient endpoints. If you're fading from a color to invisible, use that same color with alpha 0:

- Fading white → `rgba(255, 255, 255, 0)`
- Fading black → `rgba(0, 0, 0, 0)` (or `transparent`)
- Fading red → `rgba(255, 0, 0, 0)`

Only use `transparent` when you're fading **from black**, since that's the only case where the color channels already match.
