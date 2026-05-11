import { html, nothing } from 'lit';

/**
 * Card control template — handles two loading states:
 *
 *   1. !initialized  → Full-page spinner (switch NOT in DOM)
 *   2. initialized + isLoading → Modal overlay (switch stays behind it)
 *
 * @param {{ initialized: boolean, isCardBlocked: boolean, isLoading: boolean, errorType: string, onToggle: Function }} ctx
 */
export const renderCardControl = (ctx) => {
  // Initial load: full spinner, switch doesn't exist yet
  if (!ctx.initialized) {
    return html`<app-spinner></app-spinner>`;
  }

  // Page with switch + modal overlay for subsequent loading
  return html`
    <div class="card-control">
      <h1>Temporary hold card</h1>
      <app-switch
        ?checked=${ctx.isCardBlocked}
        @change=${ctx.onToggle}
      >
        ${ctx.isCardBlocked ? 'Card is on hold' : 'Card is active'}
      </app-switch>

      ${ctx.errorType ? html`<p class="error">${ctx.errorType}</p>` : nothing}

      <!-- Transparent modal — switch stays visible behind it -->
      <component-dialog ?opened=${ctx.isLoading}>
        <app-spinner></app-spinner>
      </component-dialog>
    </div>
  `;
};
