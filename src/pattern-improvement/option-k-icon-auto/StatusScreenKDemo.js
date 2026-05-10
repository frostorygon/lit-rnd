/**
 * Demo for Option K — icon auto-selected from variant.
 * Consumer never specifies an icon — it comes from the variant.
 */
import { LitElement, html, css } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import './StatusScreen.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/app-notification.js';

export class StatusScreenKDemo extends LocalizeMixin(LitElement) {
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

  _somethingWentWrong() {
    return html`
      <status-screen-k variant="error">
        <span slot="heading">${this.msgLit('something-went-wrong.h1')}</span>
        <span slot="description">${this.msgLit('something-went-wrong.p')}</span>
        <app-button slot="action">${this.msgLit('something-went-wrong.button')}</app-button>
      </status-screen-k>
    `;
  }

  _unableToClose() {
    return html`
      <status-screen-k variant="error">
        <span slot="heading">${this.msgLit('unable-close-account.h1')}</span>
        <span slot="description">${this.msgLit('unable-close-account.p')}</span>
        <contact-popover slot="action"></contact-popover>
      </status-screen-k>
    `;
  }

  _linkedAccount() {
    return html`
      <status-screen-k variant="warning">
        <span slot="heading">${this.msgLit('linked-to-another-account.h1')}</span>
        <span slot="description">${this.msgLit('linked-to-another-account.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('linked-to-another-account.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('linked-to-another-account.link')}</app-button>
      </status-screen-k>
    `;
  }

  _remainingBalance() {
    return html`
      <status-screen-k variant="warning">
        <span slot="heading">${this.msgLit('remaining-balance.h1')}</span>
        <span slot="description">${this.msgLit('remaining-balance.p')}</span>
        <app-button slot="action">${this.msgLit('remaining-balance.button')}</app-button>
      </status-screen-k>
    `;
  }

  _transactionPending() {
    return html`
      <status-screen-k variant="info">
        <span slot="heading">${this.msgLit('transaction-pending.h1')}</span>
        <span slot="description">${this.msgLit('transaction-pending.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('transaction-pending.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('transaction-pending.button')}</app-button>
      </status-screen-k>
    `;
  }

  _success() {
    return html`
      <status-screen-k variant="success">
        <span slot="heading">Account closed successfully</span>
        <span slot="description">Your account has been closed. You will receive a confirmation email shortly.</span>
        <app-button slot="action">Back to home</app-button>
      </status-screen-k>
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

customElements.define('status-screen-k-demo', StatusScreenKDemo);
