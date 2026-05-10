# Option F: Flat Props (Dumb Component)

**Philosophy:** The component doesn't know what "SomethingWentWrong" means. It just renders whatever strings you pass it. The parent — which already knows the error — passes the right data.

## Why This is the Simplest

Every other option puts error-type knowledge **inside** the component. Option F moves it to where it belongs — the **parent** that already knows the error.

The component itself is ~40 lines of actual logic:

```javascript
render() {
  return html`
    <lottie-player autoplay></lottie-player>
    <h1>${this.heading}</h1>
    <p>${this.description}</p>
    ${this.notificationText ? html`<app-notification>...</app-notification>` : nothing}
    ${this.actionType === 'contact-support'
      ? html`<contact-popover></contact-popover>`
      : html`<app-button>${this.actionLabel}</app-button>`}
  `;
}
```

No switch. No config. No error types. No i18n keys. Just props in → HTML out.

## The Key Insight

Your `flow-config.js` already knows which error occurred. It already has the context. Right now, it passes an opaque string (`'SomethingWentWrong'`) and the component has to decode it via a switch/config/template.

**That's backwards.** The config should resolve the error into concrete values and pass them directly:

```javascript
// In flow-config.js or the parent page:
html`<error-screen-f
  heading="Something went wrong"
  description="Please try again."
  action-type="button"
  action-label="Try again"
></error-screen-f>`
```

## File Structure

```
option-f-flat-props/
├── ErrorScreenF.js       # The dumb UI component (~90 lines)
└── ErrorScreenFDemo.js   # Simulates the parent passing props
```

In the real app, `ErrorScreenFDemo.js` doesn't exist — the parent page/flow does that job.

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Simplest possible component | Error knowledge must live in the parent |
| Zero internal logic — pure props-to-HTML | Requires refactoring how the parent passes data |
| Fully reusable — works for ANY error screen | Parent needs to handle tracking |
| Trivially testable — pass props, check output | |
| No i18n inside the component — parent resolves | |

## When to Choose

- You want the **thinnest, most reusable UI component** possible
- Your flow-config or page already has the error context
- You're comfortable pushing tracking and i18n resolution to the parent
