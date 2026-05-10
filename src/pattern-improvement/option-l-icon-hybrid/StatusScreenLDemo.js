/**
 * Demo for Option L — auto icon with optional override.
 * Most cases: just set variant, icon appears automatically.
 * Special case: provide a custom icon via slot.
 */
import { LitElement, html, css } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import './StatusScreen.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class StatusScreenLDemo extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: { type: String, attribute: 'error-type' },
  };

  static styles = css`:host { display: block; }`;

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('errorType')) this._track();
  }

  render() {
    switch (this.errorType) {
      case 'SomethingWentWrong':     return this._somethingWentWrong();
      case 'UnableToCloseAccount':   return this._unableToClose();
      case 'LinkedToAnotherAccount': return this._linkedAccount();
      case 'RemainingBalance':       return this._remainingBalance();
      case 'TransactionPending':     return this._transactionPending();
      case 'Success':                return this._success();
      default:                       return html`<p>Unknown type</p>`;
    }
  }

  // ─── Auto icon (no icon slot needed) ────────────────────────

  _somethingWentWrong() {
    return html`
      <status-screen-l variant="error">
        <span slot="heading">${this.msgLit('something-went-wrong.h1')}</span>
        <span slot="description">${this.msgLit('something-went-wrong.p')}</span>
        <app-button slot="action">${this.msgLit('something-went-wrong.button')}</app-button>
      </status-screen-l>
    `;
  }

  _unableToClose() {
    return html`
      <status-screen-l variant="error">
        <span slot="heading">${this.msgLit('unable-close-account.h1')}</span>
        <span slot="description">${this.msgLit('unable-close-account.p')}</span>
        <contact-popover slot="action"></contact-popover>
      </status-screen-l>
    `;
  }

  _linkedAccount() {
    return html`
      <status-screen-l variant="warning">
        <span slot="heading">${this.msgLit('linked-to-another-account.h1')}</span>
        <span slot="description">${this.msgLit('linked-to-another-account.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('linked-to-another-account.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('linked-to-another-account.link')}</app-button>
      </status-screen-l>
    `;
  }

  _remainingBalance() {
    return html`
      <status-screen-l variant="warning">
        <span slot="heading">${this.msgLit('remaining-balance.h1')}</span>
        <span slot="description">${this.msgLit('remaining-balance.p')}</span>
        <app-button slot="action">${this.msgLit('remaining-balance.button')}</app-button>
      </status-screen-l>
    `;
  }

  _transactionPending() {
    return html`
      <status-screen-l variant="info">
        <span slot="heading">${this.msgLit('transaction-pending.h1')}</span>
        <span slot="description">${this.msgLit('transaction-pending.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('transaction-pending.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('transaction-pending.button')}</app-button>
      </status-screen-l>
    `;
  }

  // ─── Success — auto icon from variant, no slot override ─────

  _success() {
    return html`
      <status-screen-l variant="success">
        <span slot="heading">Account closed successfully</span>
        <span slot="description">Your account has been closed. You will receive a confirmation email shortly.</span>
        <app-button slot="action">Back to home</app-button>
      </status-screen-l>
    `;
  }

  _track() {
    const msgs = {
      SomethingWentWrong:     ['Technical error', 'Something went wrong'],
      UnableToCloseAccount:   ['Technical error', 'Unable to close'],
      LinkedToAnotherAccount: ['Technical error', 'Account linked'],
      RemainingBalance:       ['Technical error', 'Balance remains'],
      TransactionPending:     ['Technical error', 'Transaction pending'],
      Success:                ['Success', 'Account closed'],
    };
    const m = msgs[this.errorType];
    if (m) trackError(...m);
  }
}

customElements.define('status-screen-l-demo', StatusScreenLDemo);
