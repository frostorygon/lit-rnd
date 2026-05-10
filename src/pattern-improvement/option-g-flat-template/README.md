# Option G: Flat Props + Separate Template

**Pattern:** Dumb component takes flat string props → passes them to a pure template function in a separate file.

## File Structure

```
option-g-flat-template/
├── ErrorScreen.js            # Component: defines props, calls template
├── ErrorScreen.template.js   # Pure function: { data } → html
├── ErrorScreen.css.js        # Styles
└── ErrorScreenGDemo.js       # Demo wrapper (simulates parent)
```

## How It Works

The component is ~50 lines. It defines properties and calls the template:

```javascript
// ErrorScreen.js
render() {
  return renderErrorScreen({
    heading: this.heading,
    description: this.description,
    actionType: this.actionType,
    actionLabel: this.actionLabel,
    notificationText: this.notificationText,
  });
}
```

The template receives **explicit data**, not `this`:

```javascript
// ErrorScreen.template.js
export function renderErrorScreen({ heading, description, actionType, actionLabel, notificationText }) {
  return html`
    <lottie-player autoplay></lottie-player>
    <h1>${heading}</h1>
    <p>${description}</p>
    ...
  `;
}
```

## Why Explicit Data Over `this`

The old pattern `renderTemplate(this)` creates tight coupling — the template can access anything on the component. Passing explicit data:
- Makes the template **independently testable** (no component instance needed)
- Documents exactly what the template needs (the function signature IS the API)
- Prevents accidental coupling to component internals

## Based On

- **Shoelace** pattern: component takes props, renders them
- **Community consensus**: exported template function is the standard way to separate
- **community convention**: `.template.js` file naming

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Simplest separation — template is a pure function | Fixed layout — can't inject custom elements |
| Template is independently testable | Parent must resolve all strings before passing |
| No build plugins needed | |
| Function signature documents the template's API | |
