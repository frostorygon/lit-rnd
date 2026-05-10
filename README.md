# lit-rnd

Lit web component R&D project following [open-wc](https://open-wc.org/) conventions.

Explores **12 architectural patterns** for refactoring a presentational component — from tightly-coupled monoliths to scalable, dumb, slot-based designs.

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
│   ├── js/                              # Plain JavaScript (no build needed)
│   │   ├── components/
│   │   │   ├── my-greeting.js           # Basic component (props, events, styles)
│   │   │   ├── my-card.js               # Slots & content projection
│   │   │   ├── my-counter.js            # Reactive controller consumer
│   │   │   └── my-todo.js               # State, lists, conditionals, forms
│   │   ├── controllers/
│   │   │   └── counter-controller.js
│   │   └── index.js
│   │
│   ├── ts/                              # TypeScript with decorators
│   │   ├── components/                  # Same as JS, with @customElement, @property
│   │   ├── controllers/
│   │   └── index.ts
│   │
│   └── pattern-improvement/             # ★ 12 architectural patterns (A–L)
│       ├── _stubs/                      # Design system stub components
│       ├── option-a-data-driven/        # Config object drives rendering
│       ├── option-b-sub-components/     # One component per error type
│       ├── option-c-controller/         # Reactive controller for tracking
│       ├── option-d-readable/           # Readability-first refactor
│       ├── option-e-slots/              # Slot-based layout composition
│       ├── option-f-flat-props/         # Flat props, no config object
│       ├── option-g-flat-template/      # Separated .template.js file
│       ├── option-h-slots-template/     # Slots + separated template
│       ├── option-i-hybrid/             # Hybrid (slots + props)
│       ├── option-j-icon-slot/          # Unified StatusScreen, icon via slot
│       ├── option-k-icon-auto/          # Unified StatusScreen, auto icon mapping
│       └── option-l-icon-hybrid/        # ★ Recommended: auto icon + slot override
│
├── demo/
│   ├── index.html                       # Interactive demo with JS/TS switcher
│   └── patterns.html                    # Side-by-side pattern comparison (A–L)
│
├── test/
│   └── my-greeting.test.js
│
└── docs/
    ├── open-wc-and-lit-guide.md         # Open-WC & Lit comprehensive guide
    └── component-architecture-decisions.md  # When to split/compose/unify components
```

## Pattern Comparison (A–L)

Run `pnpm start` and navigate to the **Pattern Improvement** page to see all 12 options side by side.

### Early Patterns (A–C) — Architecture Exploration

| Option | Approach | Key Idea |
|---|---|---|
| **A** | Data-Driven Config | Config object maps error types to UI properties |
| **B** | Sub-Components | One component per error type, shared base class |
| **C** | Controller | Reactive controller manages tracking lifecycle |

### Readability Patterns (D–F) — Cognitive Complexity Focus

| Option | Approach | Key Idea |
|---|---|---|
| **D** | Readable Refactor | Simplified logic, fewer indirections |
| **E** | Slot-Based Layout | `<slot>` composition, consumer fills content |
| **F** | Flat Props | No config object — direct props for heading, description, etc. |

### Template Separation (G–I) — Separation of Concerns

| Option | Approach | Key Idea |
|---|---|---|
| **G** | Flat Template | `.template.js` file exports render function |
| **H** | Slots + Template | Slot-based layout with separated template |
| **I** | Hybrid | Slots for structure, props for simple data |

### Unified StatusScreen (J–L) — Error + Success in One Component

| Option | Approach | Key Idea |
|---|---|---|
| **J** | Icon via Slot | Consumer provides icon through `<slot name="icon">` |
| **K** | Icon Auto-Map | Component maps `variant` → icon automatically |
| **L** | **Icon Hybrid** ★ | Auto-maps icons by default, overridable via slot |

> **Recommended:** Option L — balances developer convenience (auto icons) with flexibility (slot override for edge cases). Adding a new variant requires 1 CSS rule + 1 icon map entry.

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

| Doc | Contents |
|---|---|
| [Open-WC & Lit Guide](docs/open-wc-and-lit-guide.md) | Component anatomy, lifecycle, properties, templates, Shadow DOM, slots, events, reactive controllers, context API, testing, buildless dev, publishing |
| [Architecture Decisions](docs/component-architecture-decisions.md) | When to split vs compose vs unify components — decision tree, 4 patterns, 5 real scenarios, anti-patterns |
