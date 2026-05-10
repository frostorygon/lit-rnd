/**
 * Single parameterized template for ALL error types.
 * Driven by the config object — no duplication.
 *
 * Receives explicit props instead of `this` — loosely coupled, testable.
 */
import { html, nothing } from 'lit';

/**
 * Render the action widget based on the config's actionType.
 *
 * @param {object} params
 * @param {import('./error-config.js').ErrorConfig} params.config
 * @param {(key: string) => string} params.msgLit
 */
function renderAction({ config, msgLit, onAction }) {
  switch (config.actionType) {
    case 'button':
      return html`<app-button @click=${onAction}>${msgLit(config.buttonKey)}</app-button>`;

    case 'contact-support':
      return html`<contact-popover></contact-popover>`;

    case 'notification-button':
      return html`
        ${config.notificationKey
          ? html`
            <app-notification type="information">
              ${msgLit(config.notificationKey)}
            </app-notification>`
          : nothing}
        ${config.buttonKey
          ? html`<app-button @click=${onAction}>${msgLit(config.buttonKey)}</app-button>`
          : nothing}
      `;

    default:
      return nothing;
  }
}

/**
 * Main error screen template.
 *
 * @param {object} params
 * @param {import('./error-config.js').ErrorConfig} params.config
 * @param {(key: string) => string} params.msgLit - Localization function
 * @param {() => void} params.onAction - Action click handler
 */
export function renderErrorScreen({ config, msgLit, onAction }) {
  return html`
    <lottie-player autoplay></lottie-player>
    <h1>${msgLit(config.h1Key)}</h1>
    <p>${msgLit(config.pKey)}</p>
    ${renderAction({ config, msgLit, onAction })}
  `;
}
