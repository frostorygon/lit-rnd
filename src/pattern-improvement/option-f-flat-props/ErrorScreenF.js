/**
 * <error-screen-f> — Option F: Flat Props
 *
 * The component doesn't know what "SomethingWentWrong" means.
 * It doesn't have a switch. It doesn't have a config map.
 * It just renders whatever you tell it to.
 *
 * The PARENT (the flow/page that already knows the error) passes
 * the heading, description, and action type directly as properties.
 *
 * This is the simplest possible component. It is pure UI.
 *
 * Usage:
 *   <error-screen-f
 *     heading="Something went wrong"
 *     description="Please try again later."
 *     action-type="button"
 *     action-label="Try again"
 *   ></error-screen-f>
 *
 * @element error-screen-f
 * @property {string} heading - The title
 * @property {string} description - The body text
 * @property {string} actionType - 'button' | 'contact-support' | 'notification-button'
 * @property {string} actionLabel - Button/link label
 * @property {string} notificationText - Optional notification message
 */
import { LitElement, html, css, nothing } from 'lit';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class ErrorScreenF extends LitElement {
  static properties = {
    heading:          { type: String },
    description:      { type: String },
    actionType:       { type: String, attribute: 'action-type' },
    actionLabel:      { type: String, attribute: 'action-label' },
    notificationText: { type: String, attribute: 'notification-text' },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 32px 24px;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 400px;
    }

    lottie-player { width: 160px; }
    h1 { font-size: 19px; font-weight: 700; margin: 16px 0 0; }
    p  { font-size: 16px; margin: 8px 0 0; color: #555; }
    app-button { margin-top: auto; width: 100%; }
    contact-popover { margin-top: auto; width: 100%; }
    app-notification { margin-top: 24px; width: 100%; text-align: left; }
  `;

  constructor() {
    super();
    this.heading = '';
    this.description = '';
    this.actionType = 'button';
    this.actionLabel = '';
    this.notificationText = '';
  }

  render() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.heading}</h1>
      <p>${this.description}</p>

      ${this.notificationText ? html`
        <app-notification type="information">
          ${this.notificationText}
        </app-notification>
      ` : nothing}

      ${this.actionType === 'contact-support'
        ? html`<contact-popover></contact-popover>`
        : html`<app-button @click=${this._onAction}>${this.actionLabel}</app-button>`}
    `;
  }

  _onAction() {
    this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true }));
  }
}

customElements.define('error-screen-f', ErrorScreenF);
