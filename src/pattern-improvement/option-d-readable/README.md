# Option D: Maximum Readability

**Philosophy:** One file. Zero abstraction. A junior developer reads it top-to-bottom and understands everything without opening another file.

## When to Choose This

- Your team values **"I can read it at 3am during an incident"** above all else
- You have ≤10 error variants (after that, the file gets long)
- DRY is less important than **clarity** for this component
- You want the **smallest possible diff** from the current code

## Design Rules

1. **One file** — no `Template.js`, no `CSS.js`, no `config.js`
2. **No config maps** — each error is a plain method, what you see is what you get
3. **No factory functions** — no `renderErrorScreen({ config, msgLit })`
4. **No dynamic lookups** — no `ERROR_CONFIGS[this.errorType]?.trackMessage`
5. **Tracking in `updated()`** — fixes the bug, reads obviously

## The Tradeoff: Readability vs. DRY

Yes, the 5 screen methods repeat the `lottie-player + h1 + p` structure. That's **deliberate**.

Compare the mental effort:

```javascript
// Option A — you need to understand the config shape, the template params,
// the action-type switch inside the template, and how msgLit gets passed through.
return renderErrorScreen({
  config,
  msgLit: (key) => this.msgLit(key),
});

// Option D — you see the exact HTML that renders. Done.
return html`
  <lottie-player autoplay></lottie-player>
  <h1>${this.msgLit('something-went-wrong.h1')}</h1>
  <p>${this.msgLit('something-went-wrong.p')}</p>
  <app-button>${this.msgLit('something-went-wrong.button')}</app-button>
`;
```

For a component with 5 static error screens, the duplication costs you ~20 extra lines. The readability gain is worth it.

## File Structure

```
option-d-readable/
└── ErrorScreen.js    # Everything in one file (~140 lines)
```

**That's it.** One file.

## Comparison to Current Code

| Current Code | Option D |
|---|---|
| 3 files (Component + Template + CSS) | 1 file |
| `trackError()` in `render()` (bug) | `trackError()` in `updated()` (correct) |
| 5 template functions in a separate file | 5 private methods in the same class |
| Templates receive `this` | Methods are on `this` — no passing needed |
| Mental model: "which file does what?" | Mental model: "scroll down" |

## Pros & Cons

| ✅ Pros | ❌ Cons |
|---|---|
| Lowest cognitive complexity of all options | Some HTML repetition across methods |
| One file to read, understand, and debug | Adding a 20th error type makes the file long |
| No abstractions to learn or trace | Changing the shared layout means touching 5 methods |
| Instantly greppable — search for a string key, find the exact template | Not "architecturally elegant" |
| Easiest PR review — reviewer sees everything | |

## Migration Effort: 🟢 Very Low (30 min - 1 hour)

1. Merge the 3 files into 1
2. Move `trackError()` from `render()` to `updated()`
3. Keep the template methods mostly as-is (they already exist in Template.js)
4. Done

## When NOT to Choose This

- You have 20+ error types → file gets unmanageably long
- Error types share complex interactive logic (not just text differences)
- You need the tracking logic in other components too (→ use Option C's controller)
