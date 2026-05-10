/**
 * Demo wrapper for Option F.
 *
 * In the real app, the FLOW CONFIG or PAGE already knows which error
 * occurred. It passes the right strings directly. No switch in the
 * component — the switch lives where the knowledge lives.
 *
 * This wrapper simulates that parent knowledge for the demo.
 *
 * @element error-screen-f-demo
 */
import { LitElement, html, css } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import './ErrorScreenF.js';

// This is what the flow-config or page would define.
// The error knowledge lives HERE, not in the UI component.
const ERRORS = {
  SomethingWentWrong: {
    heading: 'something-went-wrong.h1',
    description: 'something-went-wrong.p',
    actionType: 'button',
    actionLabel: 'something-went-wrong.button',
    track: ['Technical error', 'Something went wrong'],
  },
  UnableToCloseAccount: {
    heading: 'unable-close-account.h1',
    description: 'unable-close-account.p',
    actionType: 'contact-support',
    track: ['Technical error', 'Unable to close account'],
  },
  LinkedToAnotherAccount: {
    heading: 'linked-to-another-account.h1',
    description: 'linked-to-another-account.p',
    actionType: 'button',
    actionLabel: 'linked-to-another-account.link',
    notificationText: 'linked-to-another-account.notification_inline',
    track: ['Technical error', 'Account is linked'],
  },
  RemainingBalance: {
    heading: 'remaining-balance.h1',
    description: 'remaining-balance.p',
    actionType: 'button',
    actionLabel: 'remaining-balance.button',
    track: ['Technical error', 'Balance remains'],
  },
  TransactionPending: {
    heading: 'transaction-pending.h1',
    description: 'transaction-pending.p',
    actionType: 'button',
    actionLabel: 'transaction-pending.button',
    notificationText: 'transaction-pending.notification_inline',
    track: ['Technical error', 'Transaction pending'],
  },
};

export class ErrorScreenFDemo extends LocalizeMixin(LitElement) {
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
      const err = ERRORS[this.errorType];
      if (err) trackError(...err.track);
    }
  }

  render() {
    const err = ERRORS[this.errorType];
    if (!err) return html`<p>Unknown error</p>`;

    return html`
      <error-screen-f
        heading=${this.msgLit(err.heading)}
        description=${this.msgLit(err.description)}
        action-type=${err.actionType}
        action-label=${err.actionLabel ? this.msgLit(err.actionLabel) : ''}
        notification-text=${err.notificationText ? this.msgLit(err.notificationText) : ''}
      ></error-screen-f>
    `;
  }
}

customElements.define('error-screen-f-demo', ErrorScreenFDemo);
