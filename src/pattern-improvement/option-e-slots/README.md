# Option E: Slot-Based Composition

**Philosophy:** Separate layout from content using Lit's native slot system. `<error-layout>` is a dumb shell. The screen methods just compose HTML into named slots.

## Why This is More Readable

Options A-D all had **indirection** — config maps, factory functions, template files with `{ config, msgLit }` params. You had to trace through layers to understand what renders.

Option E has **none of that**. Each error method is plain HTML:

```javascript
_somethingWentWrong() {
  return html`
    <error-layout>
      <span slot="heading">Something went wrong</span>
      <span slot="description">Please try again later.</span>
      <app-button slot="action">Try again</app-button>
    </error-layout>
  `;
}
```

You read it. You see the HTML. Done.

## What Makes It Different

| Options A-C | Option E |
|---|---|
| Config objects → template functions → action switches | HTML in, HTML out |
| `renderErrorScreen({ config, msgLit })` | Slots — native web platform |
| Styles in the consumer + template | `<error-layout>` owns its own styles |
| Template receives context it shouldn't know about | Each slot is self-contained |

## File Structure

```
option-e-slots/
├── ErrorLayout.js     # Dumb layout shell (~75 lines)
└── ErrorScreen.js     # Composes slots for each error (~120 lines)
```

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Each method is just HTML — maximum readability | Some slot boilerplate repetition |
| `ErrorLayout` is reusable for other screens | Two components instead of one |
| No config maps, no factories, no indirection | Styling slotted content uses `::slotted()` |
| Uses Lit's native composition pattern | |
| Layout changes go in ONE place | |
