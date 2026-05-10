# Option C: Controller + Composition

**Philosophy:** Extract all logic into Reactive Controllers. The component is pure UI — it only renders. This is the most "modern Lit" approach (Lit 3+).

## When to Choose This

- Your team is ready to adopt **Lit's recommended composition pattern**
- You want tracking logic to be **reusable across multiple components**
- You're building new components from scratch (vs. refactoring legacy)
- You want the **thinnest possible component class** (~30 lines)

## What Changed vs. Current Code

| Current | Option C |
|---|---|
| `trackError()` inside `render()` | `ErrorTrackerController` manages tracking lifecycle |
| Tracking logic embedded in the component | Controller is independently testable and reusable |
| Component does rendering + tracking + routing | Component only renders — controller handles logic |
| 5 near-identical templates | 1 parameterized template + config map |
| Templates receive `this` | Templates receive explicit props |

## The Key Insight: Controllers

```javascript
// The component doesn't even import trackError — it's not its job.
tracker = new ErrorTrackerController(this, {
  getErrorType: () => this.errorType,
  getTrackMessage: (type) => ERROR_CONFIGS[type]?.trackMessage,
});
```

The `ErrorTrackerController`:
- Hooks into the component's lifecycle automatically (`hostUpdated`)
- Tracks once per error type change (deduplication built-in)
- Cleans up on disconnect (`hostDisconnected`)
- Can be reused in any other component that needs error tracking

## File Structure

```
option-c-controller/
├── ErrorScreen.js              # Pure UI (~30 lines of actual logic)
├── ErrorScreen.css.js          # Styles (~45 lines)
├── controllers/
│   ├── error-tracker.js        # Reactive controller (~40 lines)
│   └── error-config.js         # Config map (~55 lines)
└── templates/
    └── error-template.js       # Pure template function (~40 lines)
```

**Total: ~210 lines across 5 files**

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Thinnest component class | New pattern for the team to learn |
| Controller is reusable across components | Furthest from current base library mixin style |
| Best testability — controller, template, component all testable independently | Slightly more indirection |
| Aligns with Lit 3+ recommendations | May need team buy-in |
| No inheritance (vs. Option B's BaseError) | More files than Option A |
| Clean separation: UI / logic / data | - |

## Migration Effort: 🟡 Medium (3-4 hours)

1. Create `ErrorTrackerController` (new concept for team)
2. Create config map and template (same as Option A)
3. Refactor component to use controller
4. Write controller-specific tests
5. Document the controller pattern for team reference

## Future Reuse Examples

The controller pattern shines when you need the same logic elsewhere:

```javascript
// In a different component entirely:
class PaymentErrorScreen extends LocalizeMixin(LitElement) {
  tracker = new ErrorTrackerController(this, {
    getErrorType: () => this.paymentError,
    getTrackMessage: (type) => PAYMENT_ERRORS[type]?.trackMessage,
  });
  // ...
}
```

Zero duplication of tracking logic.
