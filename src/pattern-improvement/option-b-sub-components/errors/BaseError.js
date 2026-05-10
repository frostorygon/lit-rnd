/**
 * BaseError — shared base class for all error variant components.
 *
 * Subclasses only need to override `errorConfig` to define their
 * specific heading, description, action, and tracking message.
 *
 * @element base-error (not registered — abstract base)
 */
import { LitElement, html, nothing } from 'lit';
import { LocalizeMixin } from '../../_stubs/localize-mixin.js';
import { trackError } from '../../_stubs/track-error.js';
import { errorScreenStyles } from '../ErrorScreen.css.js';

// Stubs
import '../../_stubs/app-button.js';
import '../../_stubs/contact-popover.js';
import '../../_stubs/lottie-player.js';
import '../../_stubs/app-notification.js';

export class BaseError extends LocalizeMixin(LitElement) {
  static styles = [errorScreenStyles];

  /**
   * Override in subclasses. Defines the error's content and behavior.
   * @returns {{ trackMessage: [string, string], h1Key: string, pKey: string, actionType: string, buttonKey?: string, notificationKey?: string }}
   */
  get errorConfig() {
    throw new Error('Subclasses must override errorConfig');
  }

  /** Track once on first render — not on every render cycle. */
  firstUpdated() {
    super.firstUpdated();
    const { trackMessage } = this.errorConfig;
    trackError(...trackMessage);
  }

  render() {
    const config = this.errorConfig;
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit(config.h1Key)}</h1>
      <p>${this.msgLit(config.pKey)}</p>
      ${this._renderAction(config)}
    `;
  }

  /** @param {object} config */
  _renderAction(config) {
    switch (config.actionType) {
      case 'button':
        return html`<app-button @click=${() => this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true }))}>${this.msgLit(config.buttonKey)}</app-button>`;
      case 'contact-support':
        return html`<contact-popover></contact-popover>`;
      case 'notification-button':
        return html`
          ${config.notificationKey
            ? html`<app-notification type="information">
                ${this.msgLit(config.notificationKey)}
              </app-notification>`
            : nothing}
          ${config.buttonKey
            ? html`<app-button @click=${() => this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true }))}>${this.msgLit(config.buttonKey)}</app-button>`
            : nothing}
        `;
      default:
        return nothing;
    }
  }
}
