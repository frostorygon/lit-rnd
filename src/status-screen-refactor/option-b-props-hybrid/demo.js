import { html } from 'lit';

/**
 * Demo: how consumers would use Variation B.
 *
 * Notice: heading + description are just props — way less boilerplate.
 * Slots are only needed for notification and action.
 */

// ── Simple success — minimal code ───────────────────────
export const successDemo = html`
  <status-screen-b
    variant="success"
    heading="Account closed"
    description="Your account has been successfully closed."
  >
    <button slot="action" @click=${() => console.log('navigate home')}>
      Back to home
    </button>
  </status-screen-b>
`;

// ── Error with notification ─────────────────────────────
export const errorDemo = html`
  <status-screen-b
    variant="error"
    heading="Something went wrong"
    description="We couldn't process your request."
  >
    <app-notification slot="notification" type="error">
      Error code: 5032
    </app-notification>
    <button slot="action" @click=${() => console.log('retry')}>
      Try again
    </button>
  </status-screen-b>
`;

// ── Minimal — no action needed ──────────────────────────
export const infoDemo = html`
  <status-screen-b
    variant="info"
    heading="Processing"
    description="Your request is being processed. We'll notify you when it's done."
  >
  </status-screen-b>
`;
