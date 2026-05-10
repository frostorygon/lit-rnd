import { css } from 'lit';

export const errorScreenStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 32px 24px;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 400px;

    /* Default accent — overridden per variant */
    --_accent: #555;
  }

  /* ── Variant-driven styling via CSS (like Shoelace) ───── */

  :host([variant='error']) {
    --_accent: #e63946;
  }

  :host([variant='warning']) {
    --_accent: #f9a825;
  }

  :host([variant='info']) {
    --_accent: #0077b6;
  }

  /* ── Layout ─────────────────────────────────────────────── */

  lottie-player { width: 160px; }

  .accent-bar {
    width: 48px;
    height: 4px;
    border-radius: 2px;
    background: var(--_accent);
    margin-top: 16px;
  }

  ::slotted([slot='heading']) {
    display: block;
    font-size: 19px;
    font-weight: 700;
    margin: 12px 0 0;
    color: var(--_accent);
  }

  ::slotted([slot='description']) {
    display: block;
    font-size: 16px;
    margin: 8px 0 0;
    color: #555;
  }

  ::slotted([slot='notification']) {
    display: block;
    margin-top: 24px;
    width: 100%;
    text-align: left;
  }

  div[_action] { margin-top: auto; width: 100%; }

  ::slotted([slot='action']) {
    display: block;
    width: 100%;
  }
`;
