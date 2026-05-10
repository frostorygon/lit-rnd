# Option I: Hybrid (CSS Variant + Slots + Separate Template)

**Pattern:** CSS-driven visual variants + slot composition + separated template + custom events. The "production-ready" version matching how Shoelace and Material Web actually work.

## File Structure

```
option-i-hybrid/
├── ErrorScreen.js            # Component: variant prop + event dispatch
├── ErrorScreen.template.js   # Slot scaffold with accent bar
├── ErrorScreen.css.js        # :host([variant]) CSS-driven theming
└── ErrorScreenIDemo.js       # Demo wrapper (sets variant + composes slots)
```

## What Makes This Different

### 1. CSS-Driven Variants (like Shoelace)

No JavaScript switch. The `variant` prop is reflected to an attribute, and CSS does the rest:

```css
:host([variant='error'])   { --_accent: #e63946; }
:host([variant='warning']) { --_accent: #f9a825; }
:host([variant='info'])    { --_accent: #0077b6; }
```

The heading color and accent bar automatically adjust based on variant — zero JS needed.

### 2. Custom Events (Events Up)

The component doesn't handle click callbacks. It fires a `error-action` event:

```javascript
this.dispatchEvent(new CustomEvent('error-action', {
  bubbles: true,
  composed: true,
}));
```

The parent listens:

```html
<error-screen-i variant="error" @error-action=${this._handleRetry}>
  ...
</error-screen-i>
```

### 3. Slots + Template

Same slot scaffold as Option H, but adds a visual accent bar colored by the CSS variant.

## Consumer Usage

```html
<error-screen-i variant="warning" @error-action=${this._goToLinkedAccount}>
  <span slot="heading">Account is linked</span>
  <span slot="description">You need to unlink first.</span>
  <app-notification slot="notification" type="information">
    Learn how to unlink
  </app-notification>
  <app-button slot="action">Go to settings</app-button>
</error-screen-i>
```

## Based On

- **Shoelace `sl-alert`**: `variant` prop reflected to attribute, CSS handles visual
- **Material Web**: custom events for user interaction (`md-dialog` fires events, not callbacks)
- **open-source base library**: `.template.js` file convention, slot-based composition

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Most complete — covers styling, composition, AND events | Slightly more complex than G or H |
| CSS variants scale infinitely — add new ones without touching JS | Requires understanding CSS custom properties |
| Proper "events up" pattern — parent handles actions | |
| Matches real Shoelace/Material Web architecture exactly | |
| Adding a new variant = 3 lines of CSS | |
