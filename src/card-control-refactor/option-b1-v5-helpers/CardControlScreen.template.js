import { html } from 'lit';

/**
 * Card control template — separated from component logic.
 *
 * Receives a context object with only what it needs to render.
 * No access to `this`, no side effects.
 *
 * @param {{ isCardBlocked: boolean, isLoading: boolean, errorType: string, onToggle: Function }} ctx
 */
export const renderCardControl = (ctx) => {
  if (ctx.isLoading) {
    return html`<app-spinner></app-spinner>`;
  }

  return html`
    <div class="card-control">
      <h1>Temporary hold card</h1>
      <app-switch
        ?checked=${ctx.isCardBlocked}
        @change=${ctx.onToggle}
      >
        ${ctx.isCardBlocked ? 'Card is on hold' : 'Card is active'}
      </app-switch>
      ${ctx.errorType ? html`<p class="error">${ctx.errorType}</p>` : ''}
    </div>
  `;
};
