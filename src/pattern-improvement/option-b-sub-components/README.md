# Option B: Sub-Components

**Philosophy:** Each error variant is its own self-contained component. The parent is just a router. Follows the "many small components" Lit philosophy.

## When to Choose This

- You value **maximum testability** — each variant can be tested in isolation
- Error variants may diverge significantly in the future (unique layouts, interactions)
- Your team is comfortable with **more files but simpler files**
- You want each error type to be independently deployable/lazy-loadable

## What Changed vs. Current Code

| Current | Option B |
|---|---|
| One monolithic component with a big switch | Parent router + 5 tiny sub-components |
| `trackError()` inside `render()` | `trackError()` in `firstUpdated()` of each variant |
| 5 near-identical template functions in one file | Shared `BaseError` class with overridable config |
| Templates receive `this` | Each component renders itself |
| Adding error = touch switch + add function | Adding error = add one file extending `BaseError` |

## File Structure

```
option-b-sub-components/
├── ErrorScreen.js           # Parent router (~65 lines)
├── ErrorScreen.css.js       # Shared styles (~45 lines)
└── errors/
    ├── BaseError.js         # Shared base (~65 lines)
    ├── SomethingWentWrong.js      # ~15 lines each
    ├── UnableToCloseAccount.js
    ├── LinkedToAnotherAccount.js
    ├── RemainingBalance.js
    └── TransactionPending.js
```

**Total: ~250 lines across 8 files** — more files, but each is tiny and focused.

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Each variant is independently testable | More files to manage |
| Adding a variant = add one small file | Parent still has a switch for tag selection |
| Variants can diverge without affecting siblings | Inheritance (BaseError) has its own downsides |
| Easy to lazy-load specific variants | Slight overhead from multiple custom element registrations |
| Clear ownership per error type | May feel over-engineered for 5 simple variants |

## Migration Effort: 🟡 Medium (2-4 hours)

1. Create `BaseError.js` with shared template + tracking
2. Create 5 variant files (each ~15 lines)
3. Refactor parent `ErrorScreen` into a router
4. Update tests to test individual variants
5. Register new custom element names
