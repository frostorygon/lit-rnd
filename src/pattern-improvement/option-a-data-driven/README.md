# Option A: Data-Driven Config

**Philosophy:** Keep the exact same file-split pattern your team already uses (`Component.js` + `Component.template.js` + `Component.css.js`), but fix the critical issues.

## When to Choose This

- Your team wants **minimal disruption** — same file conventions, same PR review patterns
- The base library mixin pattern is deeply embedded and changing it isn't on the table
- You want a **quick, safe win** that fixes the bugs without rethinking architecture

## What Changed vs. Current Code

| Current | Option A |
|---|---|
| `trackError()` inside `render()` — fires on every re-render | `trackError()` in `updated()` — fires once per error type change |
| 5 near-identical template functions | 1 parameterized function + config map |
| Templates receive `this` (tight coupling) | Templates receive `{ config, msgLit }` (loose coupling) |
| Adding error = touch switch + add template function + maybe CSS | Adding error = add one entry to `error-config.js` |
| `style="width: 160px"` inline | CSS custom property: `--error-animation-size` |

## File Structure

```
option-a-data-driven/
├── ErrorScreen.js          # Component class (~55 lines)
├── ErrorScreen.template.js # ONE template function (~45 lines)
├── ErrorScreen.css.js      # Styles (~45 lines)
└── error-config.js         # Config map (~55 lines)
```

**Total: ~200 lines across 4 files** (vs. ~300+ in current code with 5 template functions)

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Lowest migration effort | Config map could grow unwieldy for 20+ error types |
| Matches existing team conventions | Template still has an action-type switch (3 branches) |
| Easy to review in PR | Less modular than Option B |
| No new patterns to learn | Tracking logic still lives in the component |

## Migration Effort: 🟢 Low (1-2 hours)

1. Create `error-config.js` with the config map
2. Replace 5 template functions with 1 parameterized one
3. Move `trackError()` from `render()` to `updated()`
4. Update `render()` to be a one-liner
5. Move inline styles to CSS
