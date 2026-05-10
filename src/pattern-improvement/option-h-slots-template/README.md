# Option H: Slots + Separate Template

**Pattern:** Layout shell with named slots. Template file exports the slot scaffold. Consumer composes content into slots.

## File Structure

```
option-h-slots-template/
├── ErrorScreen.js            # Component: just wires styles + template
├── ErrorScreen.template.js   # Slot scaffold: lottie + named slots
├── ErrorScreen.css.js        # Styles (uses ::slotted())
└── ErrorScreenHDemo.js       # Demo wrapper (consumer composing slots)
```

## How It Works

The component is ~25 lines. It just connects styles and template:

```javascript
// ErrorScreen.js
export class ErrorScreenH extends LitElement {
  static styles = [errorScreenStyles];

  render() {
    return renderErrorScreen();
  }
}
```

The template is a pure slot scaffold:

```javascript
// ErrorScreen.template.js
export function renderErrorScreen() {
  return html`
    <lottie-player autoplay></lottie-player>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <slot name="action"></slot>
  `;
}
```

The consumer composes whatever they want:

```html
<error-screen-h>
  <h1 slot="heading">Something went wrong</h1>
  <p slot="description">Please try again.</p>
  <app-button slot="action">Retry</app-button>
</error-screen-h>
```

## Based On

- **Shoelace `sl-dialog`, `sl-card`**: content via named slots
- **Web Component spec**: slots are the native composition mechanism
- **open-source base library**: uses slots extensively for form layout composition

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Maximum flexibility — put ANY element in ANY slot | `::slotted()` has CSS specificity limitations |
| Component has zero props — fully content-driven | More verbose consumer markup |
| Native web platform composition | Slot styling requires `::slotted()` selector |
| Reusable for any error-like layout | |
