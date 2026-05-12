import { html } from 'lit';
import { SCREEN_CONFIGS } from './screen-configs.js';

/**
 * Demo: how consumers would use Variation C.
 *
 * Notice: almost zero boilerplate. Just pick a config and listen for clicks.
 */

// ── From predefined config ──────────────────────────────
export const successDemo = html`
  <status-screen-c
    .config=${SCREEN_CONFIGS.accountClosed}
    @action-click=${() => console.log('navigate home')}
  >
  </status-screen-c>
`;

// ── Error from predefined config ────────────────────────
export const errorDemo = html`
  <status-screen-c
    .config=${SCREEN_CONFIGS.genericError}
    @action-click=${() => console.log('retry')}
  >
  </status-screen-c>
`;

// ── Dynamic config (e.g. based on API response) ─────────
const dynamicConfig = {
  variant: 'error',
  heading: 'Transfer failed',
  description: 'The transfer to John could not be completed.',
  actionLabel: 'Contact support',
};

export const dynamicDemo = html`
  <status-screen-c
    .config=${dynamicConfig}
    @action-click=${() => console.log('open support chat')}
  >
  </status-screen-c>
`;

// ── No action button (maintenance) ──────────────────────
export const maintenanceDemo = html`
  <status-screen-c .config=${SCREEN_CONFIGS.maintenanceMode}></status-screen-c>
`;
