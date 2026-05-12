import { html } from 'lit';

/**
 * Demo: how consumers would use Variation A.
 *
 * Notice: the consumer controls ALL content and behavior.
 * The StatusScreen is just a styled layout shell.
 */

// ── Success screen ──────────────────────────────────────
export const successDemo = html`
  <status-screen-a variant="success">
    <span slot="heading">Account closed</span>
    <p slot="description">
      Your account has been successfully closed.
      You will receive a confirmation email shortly.
    </p>
    <button slot="action" @click=${() => console.log('navigate home')}>
      Back to home
    </button>
  </status-screen-a>
`;

// ── Error screen ────────────────────────────────────────
export const errorDemo = html`
  <status-screen-a variant="error">
    <span slot="heading">Something went wrong</span>
    <p slot="description">
      We couldn't process your request. Please try again.
    </p>
    <app-notification slot="notification" type="error">
      Error code: 5032. If the issue persists, contact support.
    </app-notification>
    <button slot="action" @click=${() => console.log('retry')}>
      Try again
    </button>
  </status-screen-a>
`;

// ── Custom icon override ────────────────────────────────
export const customIconDemo = html`
  <status-screen-a variant="info">
    <img slot="icon" src="/assets/custom-icon.svg" alt="Custom" />
    <span slot="heading">Verification needed</span>
    <p slot="description">Please verify your identity to continue.</p>
    <button slot="action" @click=${() => console.log('verify')}>
      Verify now
    </button>
  </status-screen-a>
`;
