# lit-rnd

Lit web component R&D project following [open-wc](https://open-wc.org/) conventions.

Both **JavaScript** and **TypeScript** examples are provided side by side.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server (opens demo page with JS/TS switcher)
pnpm start

# Build TypeScript → JavaScript
pnpm build

# Type check without emitting
pnpm typecheck

# Run tests (uses JS source — no build needed)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Project Structure

```
lit-rnd/
├── src/
│   ├── js/                          # ← Plain JavaScript (no build needed)
│   │   ├── components/
│   │   │   ├── my-greeting.js       # Basic component (props, events, styles)
│   │   │   ├── my-card.js           # Slots & content projection
│   │   │   ├── my-counter.js        # Reactive controller consumer
│   │   │   └── my-todo.js           # State, lists, conditionals, forms
│   │   ├── controllers/
│   │   │   └── counter-controller.js
│   │   └── index.js                 # Barrel export
│   │
│   └── ts/                          # ← TypeScript with decorators
│       ├── components/
│       │   ├── my-greeting.ts       # Same as JS, with @customElement, @property
│       │   ├── my-card.ts
│       │   ├── my-counter.ts
│       │   └── my-todo.ts           # Uses @state() instead of state: true
│       ├── controllers/
│       │   └── counter-controller.ts
│       └── index.ts
│
├── demo/
│   └── index.html                   # Interactive demo with JS/TS switcher
├── test/
│   └── my-greeting.test.js          # Tests (imports from src/js)
├── docs/
│   └── open-wc-and-lit-guide.md     # Comprehensive research notes
├── web-dev-server.config.mjs
├── web-test-runner.config.mjs
└── tsconfig.json
```

## JS vs TS — Key Differences

| Pattern | JavaScript | TypeScript |
|---|---|---|
| Define element | `customElements.define('my-el', MyEl)` | `@customElement('my-el')` |
| Declare property | `static properties = { name: { type: String } }` | `@property({ type: String }) name = '...'` |
| Internal state | `{ type: String, state: true }` in static properties | `@state() private _value = '...'` |
| Default values | Set in `constructor()` | Inline field initializer |
| Type safety | JSDoc comments (`/** @type {...} */`) | Native TS types |

## Example Components

| Component | Pattern Demonstrated |
|---|---|
| `<my-greeting>` | `@property`, `@click` events, `CustomEvent` dispatching, CSS custom properties |
| `<my-card>` | Named & default `<slot>`, fallback content, `::slotted()` styling, CSS parts |
| `<my-counter>` | Reactive controllers (composable logic without inheritance) |
| `<my-todo>` | `@state` / `state: true`, list rendering, conditional rendering, form handling |

## Documentation

See [docs/open-wc-and-lit-guide.md](docs/open-wc-and-lit-guide.md) for comprehensive notes on:
- Lit component anatomy, lifecycle, properties, templates
- Shadow DOM, slots, events, reactive controllers, context API
- Open-wc testing, buildless development, publishing best practices
- Community component library catalog
