# Component Architecture Decision Guide

A practical guide for deciding **when to split, compose, or unify** web components.
Covers real scenarios your team will encounter — not theory, but decisions.

---

## The Core Question

> "Should this be one component or multiple?"

**The wrong answer:** "It depends." That's true but useless.
**The right answer:** Apply these 3 tests in order.

---

## Test 1: The Structure Test

> Do they share the same HTML skeleton?

```
┌─────────────────────┐
│      [icon]         │     Same for error, success,
│   ───────────       │     warning, info?
│     Heading         │
│    Description      │     → YES = one component
│   [notification]    │     → NO  = separate components
│     [action]        │
└─────────────────────┘
```

**If the HTML structure is identical** → one component with a `variant` prop.
This is what `<status-screen variant="error|success">` does.

**If the structure diverges** → separate components, possibly sharing a layout base.

### Real scenarios

| Scenario | Same structure? | Answer |
|---|---|---|
| Error screen vs success screen (same layout) | ✅ Yes | One `<status-screen>` |
| Error screen vs 404 page (different layout) | ❌ No | Separate components |
| Login form vs registration form | ❌ No | Separate components |
| Info alert vs warning alert vs error alert | ✅ Yes | One `<alert>` with variant |
| Compact card vs detailed card | ⚠️ Partially | One component IF the difference is just hiding sections |
| Dialog vs bottom sheet | ❌ No | Separate, maybe shared overlay base |

---

## Test 2: The Behavior Test

> Do they have different JavaScript logic?

Even if two things LOOK the same, they might BEHAVE differently.

### When behavior is the same → stay unified

```
Error screen:  renders icon + text + button → dispatches "status-action"
Success screen: renders icon + text + button → dispatches "status-action"
```

Same behavior. One component. Different `variant`.

### When behavior diverges → extract a layout, specialize on top

```
Error screen:   renders icon + text + button → dispatches "status-action"
Success screen: renders icon + text + button → auto-redirects after 5s → shows countdown
```

NOW they're different. The success screen has a timer, a countdown display, and redirect logic.

**Solution: Extract a shared layout, specialize on top.**

```
status-layout.js        ← shared HTML skeleton (icon + heading + desc + action)
├── error-screen.js     ← uses status-layout, adds nothing (it's simple)
└── success-screen.js   ← uses status-layout, adds countdown + redirect
```

### Behavior divergence examples

| Behavior | Split? | Why |
|---|---|---|
| Different text/icon/color | ❌ No | That's theming, not behavior |
| Different button labels | ❌ No | Content, not behavior |
| Auto-redirect after N seconds | ✅ Yes | New timer logic |
| Retry with exponential backoff | ✅ Yes | New retry logic |
| Different animation on mount | ❌ No | CSS handles this via variant |
| Inline editing mode | ✅ Yes | Entirely new interaction model |
| Form validation | ✅ Yes | New validation lifecycle |
| Polling for status updates | ✅ Yes | New network logic |

---

## Test 3: The Evolution Test

> Will these evolve independently?

This is the hardest test because it predicts the future. But you can estimate:

### Low divergence risk → keep unified

- Both owned by the same team
- Both part of the same user flow
- Both appear in the same feature area
- Changes to one almost always mean changes to the other

### High divergence risk → split early

- Owned by different teams
- Appear in completely different features
- One is a design system component, the other is a feature component
- One has already been customized 3+ times for special cases

---

## Decision Tree

```
Does it have the same HTML structure?
│
├── NO → Separate components.
│        Do they share ANY layout? → Extract a layout base.
│
└── YES → Does it have different JS behavior?
          │
          ├── NO → One component with `variant` prop.
          │        Done. This is <status-screen>.
          │
          └── YES → How different?
                    │
                    ├── Minor (1-2 extra features)
                    │   → One component, feature-flag via props
                    │     e.g. <status-screen auto-redirect redirect-delay="5000">
                    │
                    └── Major (different lifecycle, state, interactions)
                        → Extract shared layout.
                          Build specialized components on top.
                          e.g. <error-screen> and <success-screen>
                               both using <status-layout> internally
```

---

## Pattern Catalog

### Pattern 1: Single Component + Variant (Most Common)

**When:** Same structure, same behavior, different styling/content.

```javascript
// One component, variant controls everything visual
html`<status-screen variant="error">...</status-screen>`
html`<status-screen variant="success">...</status-screen>`
```

**Used by:** Shoelace `sl-alert`, Ant Design `Result`, Carbon `Notification`

**Storybook stories:**
```
StatusScreen/
├── Error
├── Warning
├── Info
├── Success
├── With Notification
├── With Custom Icon
└── Playground
```

**Coupling level:** Zero. The component doesn't know what "error" means.

---

### Pattern 2: Shared Layout + Specialized Components

**When:** Same structure, but behavior diverges.

```
src/
├── status-layout/
│   ├── StatusLayout.js          ← just slots + visual theming
│   ├── StatusLayout.css.js
│   └── StatusLayout.template.js
│
├── error-screen/
│   ├── ErrorScreen.js           ← extends or composes StatusLayout
│   └── ErrorScreen.css.js       ← error-specific styles (if any)
│
└── success-screen/
    ├── SuccessScreen.js         ← composes StatusLayout + adds countdown
    └── SuccessScreen.css.js
```

**Two ways to share the layout:**

#### A. Composition (recommended)

```javascript
// success-screen.js — COMPOSES the layout
class SuccessScreen extends LitElement {
  render() {
    return html`
      <status-layout variant="success">
        <slot name="icon" slot="icon"></slot>
        <slot name="heading" slot="heading"></slot>
        <slot name="description" slot="description"></slot>
        <slot name="action" slot="action"></slot>
      </status-layout>
      <div class="countdown">Redirecting in ${this.seconds}s...</div>
    `;
  }
}
```

#### B. Inheritance (use sparingly)

```javascript
// success-screen.js — EXTENDS the layout
class SuccessScreen extends StatusLayout {
  // Override/extend specific methods
  connectedCallback() {
    super.connectedCallback();
    this._startCountdown();
  }
}
```

**Storybook stories:**
```
StatusLayout/        ← base stories (all variants, all slot combos)
ErrorScreen/         ← error-specific stories
SuccessScreen/       ← success + countdown stories
```

**Used by:** an open-source base library (`BaseField` → `LionInput`, `LionTextarea`)

---

### Pattern 3: Completely Separate Components

**When:** Different structure, different behavior, different everything.

```javascript
// These have nothing in common — don't force a shared base
<error-dialog>       ← modal overlay with retry
<success-toast>      ← ephemeral notification at bottom
<maintenance-page>   ← full-page takeover
```

**When people make this mistake:**
Someone sees "they all show an error message" and tries to unify them.
But a dialog, a toast, and a full page have completely different HTML,
different animations, different dismiss behavior, and different accessibility.
"Shows an error" is a USE CASE, not a structure.

---

### Pattern 4: Mixin for Cross-Cutting Behavior

**When:** Components share behavior but NOT structure.

```javascript
// A toast, a dialog, and a page all need error tracking.
// Don't unify the components — share the behavior via mixin.

const TrackableMixin = (superclass) => class extends superclass {
  updated(changed) {
    super.updated(changed);
    if (changed.has('errorType')) {
      trackError(this._getTrackMessage());
    }
  }
};

class ErrorDialog extends TrackableMixin(LitElement) { /* dialog layout */ }
class ErrorToast extends TrackableMixin(LitElement) { /* toast layout */ }
```

**Used by:** an open-source base library (LocalizeMixin, FormMixin, etc.)

---

## Real Scenario Walkthroughs

### Scenario A: "We need a success screen alongside our error screen"

**Question:** Same layout?
**Answer:** Yes — icon, heading, description, action button.

**Question:** Same behavior?
**Answer:** Yes — just renders content + dispatches action event.

**Decision:** → **Pattern 1.** One `<status-screen variant="error|success">`.

---

### Scenario B: "The success screen needs a 5-second auto-redirect"

**Question:** Same layout?
**Answer:** Mostly — but success adds a countdown timer below the button.

**Question:** Same behavior?
**Answer:** No — success has timer logic + countdown display.

**Decision:** → **Pattern 2.** Extract `<status-layout>`, build `<success-screen>` on top with countdown.

```javascript
class SuccessScreen extends LitElement {
  render() {
    return html`
      <status-layout variant="success">
        <slot name="heading" slot="heading"></slot>
        <slot name="description" slot="description"></slot>
        <slot name="action" slot="action"></slot>
      </status-layout>
      <p class="countdown">Redirecting in ${this.countdown}s...</p>
    `;
  }
}
```

---

### Scenario C: "We need error handling in a toast, a dialog, AND a full page"

**Question:** Same layout?
**Answer:** No — completely different HTML structures.

**Decision:** → **Pattern 3 + 4.** Separate components, shared tracking via mixin.

---

### Scenario D: "The error screen needs to show a retry attempt count"

**Question:** Same layout?
**Answer:** Yes — just adds "Attempt 2 of 3" text.

**Question:** Same behavior?
**Answer:** Slightly different — error has retry count, success doesn't.

**Decision:** → **Pattern 1 with a prop.** Add an optional `attempt` prop:

```javascript
html`
  <status-screen variant="error" attempt="2" max-attempts="3">
    ...
  </status-screen>
`
```

The component shows "Attempt 2 of 3" when the prop is set, hides it when not.
No need to split into separate components for one optional text line.

---

### Scenario E: "Error screen and success screen are owned by different teams"

Even if they look identical today, **ownership divergence = eventual code divergence.**

**Decision:** → **Pattern 2.** Shared layout base, separate components per team.
Each team evolves their component independently.
The layout base is in the shared design system.

---

## Anti-Patterns

### ❌ "Everything is a layout component"

```
<base-layout>
  └── <status-layout>
        └── <error-layout>
              └── <error-screen>   ← 4 layers of wrapping
```

**Why it's wrong:** Indirection without purpose. Each layer adds cognitive overhead
and a Storybook entry that nobody uses. If `<error-screen>` is just
`<status-layout variant="error">`, it's a wrapper that does nothing.

**Rule:** If your component's `render()` is just forwarding slots to another
component with zero additional logic, you don't need the wrapper.

---

### ❌ "Split by domain, not by structure"

```
<service cancellation-error>    ← has the SAME layout as...
<payment-error>            ← ...this, but different team = different component?
```

**Why it's wrong:** You now maintain 5 identical components.
A design change (e.g., "move the icon below the heading") requires 5 PRs.

**Fix:** One `<status-screen>`, different content per feature.

---

### ❌ "Premature extraction"

Extracting a layout base before you have 2+ consumers:

```javascript
// You have ONE error screen. You extract a layout "for reuse."
// 6 months later, the layout has 1 consumer.
// You wasted effort and added indirection.
```

**Rule of Three:** Extract shared layout when you have 3 consumers,
not when you imagine you might someday have 2.

---

## Summary Cheat Sheet

| Signal | Do This |
|---|---|
| Same HTML, same JS, different look | One component + `variant` prop |
| Same HTML, different JS | Shared layout + specialized components |
| Different HTML, same JS behavior | Separate components + shared mixin |
| Different HTML, different JS | Completely separate components |
| Only 1 consumer exists | Don't extract a base. Wait. |
| 3+ consumers with same layout | Extract a shared layout |
| Teams will diverge | Split early, share layout base |
| "It might change someday" | Don't split. Split when it actually changes. |

---

## For Your Specific Case (ErrorScreen)

**Today:** Error and success have the same structure + same behavior.
→ One `<status-screen>` with `variant`. **(Pattern 1)**

**If success adds a countdown:**
→ Extract `<status-layout>` from `<status-screen>`, build `<success-screen>` on top. **(Pattern 2)**

**If error adds retry logic:**
→ Decide: is it minor (one prop) or major (new lifecycle)?
→ Minor: add `attempt` prop to `<status-screen>`.
→ Major: split into `<error-screen>` extending `<status-layout>`.

**If a completely different error experience is needed (toast, dialog):**
→ New component. Share tracking via mixin. **(Pattern 3 + 4)**

> Start with the simplest pattern that works today.
> Split when behavior actually diverges, not when you imagine it might.
