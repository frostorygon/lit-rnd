import { html, nothing } from 'lit';
import { ERROR_CONFIG } from './error-config.js';

/**
 * Card control template — renders based on context + error config.
 *
 * @param {{ isCardBlocked: boolean, isLoading: boolean, errorType: string, onToggle: Function }} ctx
 */
export const renderCardControl = (ctx) => {
  if (ctx.isLoading) {
    return html`<app-spinner></app-spinner>`;
  }

  const errorConfig = ctx.errorType ? ERROR_CONFIG[ctx.errorType] : null;

  return html`
    <div class="card-control">
      <h1>Temporary hold card</h1>
      <app-switch
        ?checked=${ctx.isCardBlocked}
        @change=${ctx.onToggle}
      >
        ${ctx.isCardBlocked ? 'Card is on hold' : 'Card is active'}
      </app-switch>
      ${errorConfig ? renderError(errorConfig) : nothing}
    </div>
  `;
};

/**
 * Renders error UI from config — no switch statement needed.
 * @param {{ title: string, message: string, action: string }} config
 */
const renderError = (config) => html`
  <div class="error-panel">
    <h2>${config.title}</h2>
    <p>${config.message}</p>
    ${config.action === 'contact'
      ? html`<app-button variant="secondary">Contact support</app-button>`
      : html`<app-button>Try again</app-button>`
    }
  </div>
`;
