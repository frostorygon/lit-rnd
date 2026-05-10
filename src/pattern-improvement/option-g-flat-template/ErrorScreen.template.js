/**
 * Pure template function for ErrorScreen.
 *
 * Receives ONLY what it needs — no `this`, no component reference.
 * Independently testable: pass data, get html back.
 *
 * @param {object} data
 * @param {string} data.heading
 * @param {string} data.description
 * @param {string} data.actionType - 'button' | 'contact-support'
 * @param {string} [data.actionLabel]
 * @param {string} [data.notificationText]
 * @param {() => void} [data.onAction] - Click handler for the action button
 * @returns {import('lit').TemplateResult}
 */
import { html, nothing } from 'lit';

export function renderErrorScreen({ heading, description, actionType, actionLabel, notificationText, onAction }) {
  return html`
    <lottie-player autoplay></lottie-player>
    <h1>${heading}</h1>
    <p>${description}</p>

    ${notificationText
      ? html`<app-notification type="information">${notificationText}</app-notification>`
      : nothing}

    ${actionType === 'contact-support'
      ? html`<contact-popover></contact-popover>`
      : html`<app-button @click=${onAction}>${actionLabel}</app-button>`}
  `;
}
