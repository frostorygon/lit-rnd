# Card Control — Refactor Options

Three options showing how to distribute a component's code for scalability and maintainability.

**Original problem:** A component (~160 lines) mixes UI lifecycle, business logic, API calls, error handling, and side effects in a single class.

---

## The 3 Options at a Glance

| Option | Approach | Component | New files | Best for |
|---|---|---|---|---|
| **A** | Extract & Fix | ~70 lines | `utils/` parser | Quick win, small PR |
| **B** | Smart Service | ~55 lines | `services/` fat service | Clean separation, medium PR |
| **C** | Controller | ~40 lines | `controllers/` + `services/` | Maximum scalability |

## Folder Structures

### Option A — Extract & Fix

```
option-a-extract/
├── CardControlPage.js              ← component (bugs fixed, ~70 lines)
├── CardControlScreen.js            ← template (unchanged)
├── CardControlScreen.css.js        ← styles (unchanged)
├── services/
│   └── cards-service.js            ← pure API wrappers (unchanged from original)
└── utils/
    └── card-status-parser.js       ← NEW: extracted parsing + error classification
```

**What moves:** Response parsing and error classification move to `utils/`. Everything else stays in the component.

---

### Option B — Smart Service

```
option-b-smart-service/
├── CardControlPage.js              ← component (thin, ~55 lines)
├── CardControlScreen.js            ← template
├── CardControlScreen.css.js        ← styles
└── services/
    └── card-service.js             ← API + parsing + error typing (smart)
```

**What moves:** ALL business logic moves to the service. Service returns typed `{ status }` or `{ error }` objects. Component never touches raw API responses.

---

### Option C — Controller Pattern

```
option-c-controller/
├── CardControlPage.js              ← component (declarative, ~40 lines)
├── CardControlScreen.js            ← template
├── CardControlScreen.css.js        ← styles
├── controllers/
│   └── card-state-controller.js    ← state + business logic + analytics
└── services/
    └── cards-service.js            ← pure API (fetch wrappers only)
```

**What moves:** ALL state (`isLoading`, `isCardBlocked`, `errorType`) and ALL logic (toggle, load, error handling, analytics) move to the controller. Component only reads state and delegates actions. Service is a pure API layer.

---

## What lives where — comparison

| Concern | Original | Option A | Option B | Option C |
|---|---|---|---|---|
| `trackPage()` | constructor ❌ | connectedCallback | connectedCallback | controller `hostConnected` |
| Keyboard listener | firstUpdated | connectedCallback | connectedCallback | connectedCallback |
| Initial load | firstUpdated | firstUpdated | firstUpdated | controller `hostUpdated` |
| Toggle logic | component method | component method | component method | controller `toggle()` |
| API calls | component + service | service (unchanged) | smart service | pure service |
| Response parsing | component | **utils** (extracted) | **smart service** | **controller** |
| Error classification | component (string match) | **utils** (status code) | **smart service** | **controller** |
| Loading state | component | component | component | **controller** |
| Error state | component | component | component | **controller** |

## Bugs fixed (all 3 options)

| Bug | Original | Fixed |
|---|---|---|
| `trackPage()` in constructor | Side effect before DOM connection | `connectedCallback()` |
| `_initializing` hack | Fragile timing flag | `_isLoading = true` from start — modal blocks interaction |
| `err.message.includes('422')` | String matching | `err.status === 422` |
| Dead code after `this.next()` | `_isLoading = false` never matters | Removed |
| `getCardBlockStatus` navigates | Data getter shouldn't navigate | Returns data/error, caller decides |

## Which one should you pick?

```
Is this the only component using card APIs?
├── Yes → Option A (extract parser, fix bugs, done)
└── No, multiple components share card logic
    ├── Do they share the SAME lifecycle pattern? (load → toggle → error)
    │   ├── Yes → Option C (controller is reusable across components)
    │   └── No  → Option B (service is reusable, each component has its own lifecycle)
    └── Unsure? → Start with Option B, upgrade to C when the pattern repeats
```
