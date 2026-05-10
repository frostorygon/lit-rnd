/**
 * ErrorScreen — Option D: Maximum Readability
 *
 * Design goal: A developer opens this file at 3am during an incident
 * and understands everything without scrolling or opening another file.
 *
 * Rules applied:
 * - Everything in ONE file (no file-hopping)
 * - No config maps, no factory functions, no indirection
 * - Each error type is a clearly-named method returning html
 * - Tracking happens once per error change (not in render)
 * - Reads top-to-bottom like a story
 *
 * @element error-screen-d
 * @property {string} errorType - Which error to show
 */
import { LitElement, html, css } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';

// Stubs — in real code these come from your design system
import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class ErrorScreenD extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: { type: String, attribute: 'error-type' },
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
    p { font-size: 16px; margin: 8px 0 0; color: #555; }
    app-button { margin-top: auto; width: 100%; }
    contact-popover { margin-top: auto; width: 100%; }
    app-notification { margin-top: 24px; width: 100%; text-align: left; }
  `;

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

  // ─── Tracking ──────────────────────────────────────────────
  // Fires ONCE when errorType changes. Never in render().

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('errorType')) {
      this._trackError();
    }
  }

  _trackError() {
    switch (this.errorType) {
      case 'SomethingWentWrong':
        trackError('Technical error', 'Something went wrong');
        break;
      case 'UnableToCloseAccount':
        trackError('Technical error', 'Unable to close account - call us');
        break;
      case 'LinkedToAnotherAccount':
        trackError('Technical error', 'Account is linked');
        break;
      case 'RemainingBalance':
        trackError('Technical error', 'Balance remains');
        break;
      case 'TransactionPending':
        trackError('Technical error', 'Transaction pending');
        break;
    }
  }

  // ─── Rendering ─────────────────────────────────────────────
  // render() just picks which screen to show. That's it.

  render() {
    switch (this.errorType) {
      case 'SomethingWentWrong': return this._somethingWentWrong();
      case 'UnableToCloseAccount': return this._unableToCloseAccount();
      case 'LinkedToAnotherAccount': return this._linkedToAnotherAccount();
      case 'RemainingBalance': return this._remainingBalance();
      case 'TransactionPending': return this._transactionPending();
      default: return html`<p>Unknown error: ${this.errorType}</p>`;
    }
  }

  // ─── Error Screens ─────────────────────────────────────────
  // Each method is one screen. What you see is what you get.

  _somethingWentWrong() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit('something-went-wrong.h1')}</h1>
      <p>${this.msgLit('something-went-wrong.p')}</p>
      <app-button @click=${this._onAction}>${this.msgLit('something-went-wrong.button')}</app-button>
    `;
  }

  _unableToCloseAccount() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit('unable-close-account.h1')}</h1>
      <p>${this.msgLit('unable-close-account.p')}</p>
      <contact-popover></contact-popover>
    `;
  }

  _linkedToAnotherAccount() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit('linked-to-another-account.h1')}</h1>
      <p>${this.msgLit('linked-to-another-account.p')}</p>
      <app-notification type="information">
        ${this.msgLit('linked-to-another-account.notification_inline')}
      </app-notification>
      <app-button @click=${this._onAction}>${this.msgLit('linked-to-another-account.link')}</app-button>
    `;
  }

  _remainingBalance() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit('remaining-balance.h1')}</h1>
      <p>${this.msgLit('remaining-balance.p')}</p>
      <app-button @click=${this._onAction}>${this.msgLit('remaining-balance.button')}</app-button>
    `;
  }

  _transactionPending() {
    return html`
      <lottie-player autoplay></lottie-player>
      <h1>${this.msgLit('transaction-pending.h1')}</h1>
      <p>${this.msgLit('transaction-pending.p')}</p>
      <app-notification type="information">
        ${this.msgLit('transaction-pending.notification_inline')}
      </app-notification>
      <app-button @click=${this._onAction}>${this.msgLit('transaction-pending.button')}</app-button>
    `;
  }

  _onAction() {
    this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true }));
  }
}

customElements.define('error-screen-d', ErrorScreenD);
