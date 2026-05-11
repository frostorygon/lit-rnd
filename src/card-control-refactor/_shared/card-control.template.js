import { html } from 'lit';

/**
 * Shared template stub for card control screen.
 * In production this would be the full template with switch, spinner, dialog.
 */
export const renderCardControl = (ctx) => html`
  <div class="card-control">
    <h1>${ctx.msgLit?.('card-control.title') ?? 'Temporary hold card'}</h1>

    ${ctx.isLoading
      ? html`<app-spinner></app-spinner>`
      : html`
        <app-switch
          ?checked=${ctx.isCardBlocked}
          @change=${ctx.onToggle}
        >
          ${ctx.isCardBlocked ? 'Card is on hold' : 'Card is active'}
        </app-switch>
      `
    }

    ${ctx.errorType
      ? html`<p class="error">${ctx.errorType}</p>`
      : ''
    }
  </div>
`;
