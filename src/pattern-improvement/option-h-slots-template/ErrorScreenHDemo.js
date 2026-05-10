/**
 * Demo wrapper for Option H.
 * The parent composes content into <error-screen-h> slots.
 */
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import './ErrorScreen.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/app-notification.js';

export class ErrorScreenHDemo extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: { type: String, attribute: 'error-type' },
  };

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

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

  _somethingWentWrong() {
    return html`
      <error-screen-h>
        <span slot="heading">${this.msgLit('something-went-wrong.h1')}</span>
        <span slot="description">${this.msgLit('something-went-wrong.p')}</span>
        <app-button slot="action">${this.msgLit('something-went-wrong.button')}</app-button>
      </error-screen-h>
    `;
  }

  _unableToClose() {
    return html`
      <error-screen-h>
        <span slot="heading">${this.msgLit('unable-close-account.h1')}</span>
        <span slot="description">${this.msgLit('unable-close-account.p')}</span>
        <contact-popover slot="action"></contact-popover>
      </error-screen-h>
    `;
  }

  _linkedAccount() {
    return html`
      <error-screen-h>
        <span slot="heading">${this.msgLit('linked-to-another-account.h1')}</span>
        <span slot="description">${this.msgLit('linked-to-another-account.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('linked-to-another-account.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('linked-to-another-account.link')}</app-button>
      </error-screen-h>
    `;
  }

  _remainingBalance() {
    return html`
      <error-screen-h>
        <span slot="heading">${this.msgLit('remaining-balance.h1')}</span>
        <span slot="description">${this.msgLit('remaining-balance.p')}</span>
        <app-button slot="action">${this.msgLit('remaining-balance.button')}</app-button>
      </error-screen-h>
    `;
  }

  _transactionPending() {
    return html`
      <error-screen-h>
        <span slot="heading">${this.msgLit('transaction-pending.h1')}</span>
        <span slot="description">${this.msgLit('transaction-pending.p')}</span>
        <app-notification slot="notification" type="information">
          ${this.msgLit('transaction-pending.notification_inline')}
        </app-notification>
        <app-button slot="action">${this.msgLit('transaction-pending.button')}</app-button>
      </error-screen-h>
    `;
  }

  _track() {
    const msgs = {
      SomethingWentWrong:     ['Technical error', 'Something went wrong'],
      UnableToCloseAccount:   ['Technical error', 'Unable to close'],
      LinkedToAnotherAccount: ['Technical error', 'Account linked'],
      RemainingBalance:       ['Technical error', 'Balance remains'],
      TransactionPending:     ['Technical error', 'Transaction pending'],
    };
    const m = msgs[this.errorType];
    if (m) trackError(...m);
  }
}

customElements.define('error-screen-h-demo', ErrorScreenHDemo);
