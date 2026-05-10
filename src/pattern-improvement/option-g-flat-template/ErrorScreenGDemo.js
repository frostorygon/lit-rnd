/**
 * Demo wrapper for Option G.
 * Simulates the parent (flow-config / page) that owns error knowledge.
 */
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ErrorScreen.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/app-notification.js';

const ERRORS = {
  SomethingWentWrong:     { h: 'something-went-wrong.h1',           p: 'something-went-wrong.p',           action: 'button',  btn: 'something-went-wrong.button',          track: ['Technical error', 'Something went wrong'] },
  UnableToCloseAccount:   { h: 'unable-close-account.h1',           p: 'unable-close-account.p',           action: 'contact-support',                                              track: ['Technical error', 'Unable to close'] },
  LinkedToAnotherAccount: { h: 'linked-to-another-account.h1',      p: 'linked-to-another-account.p',      action: 'button',  btn: 'linked-to-another-account.link',       track: ['Technical error', 'Account linked'],        notif: 'linked-to-another-account.notification_inline' },
  RemainingBalance:       { h: 'remaining-balance.h1',              p: 'remaining-balance.p',              action: 'button',  btn: 'remaining-balance.button',             track: ['Technical error', 'Balance remains'] },
  TransactionPending:     { h: 'transaction-pending.h1',            p: 'transaction-pending.p',            action: 'button',  btn: 'transaction-pending.button',           track: ['Technical error', 'Transaction pending'],   notif: 'transaction-pending.notification_inline' },
};

export class ErrorScreenGDemo extends LocalizeMixin(LitElement) {
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
      const e = ERRORS[this.errorType];
      if (e) trackError(...e.track);
    }
  }

  render() {
    const e = ERRORS[this.errorType];
    if (!e) return html`<p>Unknown error</p>`;

    return html`
      <error-screen-g
        heading=${this.msgLit(e.h)}
        description=${this.msgLit(e.p)}
        action-type=${e.action}
        action-label=${ifDefined(e.btn ? this.msgLit(e.btn) : undefined)}
        notification-text=${ifDefined(e.notif ? this.msgLit(e.notif) : undefined)}
      ></error-screen-g>
    `;
  }
}

customElements.define('error-screen-g-demo', ErrorScreenGDemo);
