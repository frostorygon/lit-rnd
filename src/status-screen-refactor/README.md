# StatusScreen — Refactor Variations

Three approaches for a reusable status screen component, applying patterns
from our card-control-refactor discussions.

---

## Variation A — Pure Layout Shell (Slots Only)

**Philosophy:** Component is just a styled layout. Consumer owns ALL content and behavior.

```
option-a-layout-shell/
├── StatusScreen.js              ← ~25 lines, variant prop only
├── StatusScreen.template.js     ← slots + icon fallback
└── StatusScreen.css.js          ← variant colors, layout
```

**Usage:**
```html
<status-screen variant="success">
  <span slot="heading">Account closed</span>
  <p slot="description">Your account has been closed.</p>
  <button slot="action" @click=${() => this._onDone()}>Done</button>
</status-screen>
```

**Pros:** Maximum flexibility. Zero opinions on content.
**Cons:** Verbose at the call site. Every consumer writes the same slots.

---

## Variation B — Props + Slots (Hybrid)

**Philosophy:** Props for common content (heading, description). Slots for custom content (notification, action).

```
option-b-props-hybrid/
├── StatusScreen.js              ← ~35 lines, heading/description/variant props
├── StatusScreen.template.js     ← props for text, slots for extras
└── StatusScreen.css.js          ← same styles
```

**Usage:**
```html
<status-screen variant="error" heading="Something went wrong" description="Please try again.">
  <button slot="action" @click=${() => this._retry()}>Try again</button>
</status-screen>
```

**Pros:** Less boilerplate for common cases. Still flexible via slots.
**Cons:** API is larger (more props).

---

## Variation C — Config-Driven

**Philosophy:** Pass a config object. Zero slots, zero boilerplate at the call site.

```
option-c-config-driven/
├── StatusScreen.js              ← ~35 lines, config prop + event
├── StatusScreen.template.js     ← renders from config
├── StatusScreen.css.js          ← same styles
└── screen-configs.js            ← maps keys to { variant, heading, description, action }
```

**Usage:**
```javascript
this._screenConfig = SCREEN_CONFIGS.accountClosed;
// or dynamically:
this._screenConfig = { variant: 'error', heading: 'Oops', ... };
```
```html
<status-screen .config=${this._screenConfig} @action-click=${this._onDone}>
</status-screen>
```

**Pros:** Easiest consumption. Central config for all screens.
**Cons:** Less flexible. Custom layouts need config extensions.

---

## Which to use?

```
How many different status screens do you have?
├── 2-3 → Variation A (just slots, keep it simple)
├── 5-10 with similar layout → Variation B (props reduce boilerplate)
└── 10+ or configs from backend → Variation C (config-driven)
```
