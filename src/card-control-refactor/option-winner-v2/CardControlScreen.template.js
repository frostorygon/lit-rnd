import { html, nothing } from 'lit';

/**
 * Card control template.
 *
 * ctx = the component instance (`this`).
 * Reads properties and calls methods directly.
 *
 * @param {CardControlPage} ctx - the component instance
 */
export const renderCardControl = (ctx) => {
  if (!ctx._initialized) {
    return html`<app-spinner></app-spinner>`;
  }

  return html`
    <div class="card-control">
      <h1>Temporary hold card</h1>
      <app-switch
        ?checked=${ctx.isCardBlocked}
        @change=${() => ctx.handleToggle()}
      >
        ${ctx.isCardBlocked ? 'Card is on hold' : 'Card is active'}
      </app-switch>

      ${ctx._errorType ? html`<p class="error">${ctx._errorType}</p>` : nothing}

      <component-dialog ?opened=${ctx._isLoading}>
        <app-spinner></app-spinner>
      </component-dialog>
    </div>
  `;
};
