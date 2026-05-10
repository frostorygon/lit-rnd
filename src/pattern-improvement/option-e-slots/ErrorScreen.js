/**
 * ErrorScreen — Option E: Slot-Based Composition
 *
 * The error screen ITSELF is just a consumer of <error-layout>.
 * Each error type is a tiny method that returns plain HTML.
 *
 * No config maps. No factory functions. No template files.
 * No passing `this` or `{ config, msgLit }` to anything.
 *
 * You read the method, you see the HTML. That's it.
 *
 * @element error-screen-e
 * @property {string} errorType - Which error to show
 */
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import './ErrorLayout.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/app-notification.js';

export class ErrorScreenE extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: { type: String, attribute: 'error-type' },
  };

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

  // Track once per change — not in render.
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('errorType')) {
      this._track();
    }
  }

  render() {
    switch (this.errorType) {
      case 'SomethingWentWrong':     return this._somethingWentWrong();
      case 'UnableToCloseAccount':   return this._unableToClose();
      case 'LinkedToAnotherAccount': return this._linkedAccount();
      case 'RemainingBalance':       return this._remainingBalance();
      case 'TransactionPending':     return this._transactionPending();
      default:                       return html`<p>Unknown error</p>`;
    }
  }

  // ─── Each error is just HTML composed into <error-layout> ──

  _somethingWentWrong() {
    return html`
      <error-layout>
        <span slot="heading">${this.msgLit('something-went-wrong.h1')}</span>
        <span slot="description">${this.msgLit('something-went-wrong.p')}</span>
        <app-button slot="action">${this.msgLit('something-went-wrong.button')}</app-button>
      </error-layout>
    `;
  }

  _unableToClose() {
    return html`
      <error-layout>
        <span slot="heading">${this.msgLit('unable-close-account.h1')}</span>
        <span slot="description">${this.msgLit('unable-close-account.p')}</span>
        <contact-popover slot="action"></contact-popover>
      </error-layout>
    `;
  }

  _linkedAccount() {
    return html`
      <error-layout>
        <span slot="heading">${this.msgLit('linked-to-another-account.h1')}</span>
        <span slot="description">${this.msgLit('linked-to-another-account.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('linked-to-another-account.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('linked-to-another-account.link')}</app-button>
      </error-layout>
    `;
  }

  _remainingBalance() {
    return html`
      <error-layout>
        <span slot="heading">${this.msgLit('remaining-balance.h1')}</span>
        <span slot="description">${this.msgLit('remaining-balance.p')}</span>
        <app-button slot="action">${this.msgLit('remaining-balance.button')}</app-button>
      </error-layout>
    `;
  }

  _transactionPending() {
    return html`
      <error-layout>
        <span slot="heading">${this.msgLit('transaction-pending.h1')}</span>
        <span slot="description">${this.msgLit('transaction-pending.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('transaction-pending.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('transaction-pending.button')}</app-button>
      </error-layout>
    `;
  }

  // ─── Tracking ──────────────────────────────────────────────

  _track() {
    switch (this.errorType) {
      case 'SomethingWentWrong':     trackError('Technical error', 'Something went wrong'); break;
      case 'UnableToCloseAccount':   trackError('Technical error', 'Unable to close account'); break;
      case 'LinkedToAnotherAccount': trackError('Technical error', 'Account is linked'); break;
      case 'RemainingBalance':       trackError('Technical error', 'Balance remains'); break;
      case 'TransactionPending':     trackError('Technical error', 'Transaction pending'); break;
    }
  }
}

customElements.define('error-screen-e', ErrorScreenE);
