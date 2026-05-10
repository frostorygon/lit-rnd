/**
 * Pure template function for error screen rendering.
 * Same as Option A's template — no `this`, explicit props.
 */
import { html, nothing } from 'lit';

/** @param {object} params */
function renderAction({ config, msgLit, onAction }) {
  switch (config.actionType) {
    case 'button':
      return html`<app-button @click=${onAction}>${msgLit(config.buttonKey)}</app-button>`;
    case 'contact-support':
      return html`<contact-popover></contact-popover>`;
    case 'notification-button':
      return html`
        ${config.notificationKey
          ? html`<app-notification type="information">
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
 * @param {object} params
 * @param {object} params.config - Error config object
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
