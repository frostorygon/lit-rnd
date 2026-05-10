/**
 * ErrorScreen — Option B: Sub-Components
 *
 * The parent component is just a router that picks the right
 * child component based on errorType. Each error variant is
 * its own self-contained component extending BaseError.
 *
 * @element error-screen-b
 * @property {string} errorType - Error variant to display.
 */
import { LitElement, html, css } from 'lit';

// Register all error variant components
import './errors/SomethingWentWrong.js';
import './errors/UnableToCloseAccount.js';
import './errors/LinkedToAnotherAccount.js';
import './errors/RemainingBalance.js';
import './errors/TransactionPending.js';



export class ErrorScreenB extends LitElement {
  static properties = {
    errorType: {
      type: String,
      attribute: 'error-type',
    },
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

  render() {
    switch (this.errorType) {
      case 'SomethingWentWrong':
        return html`<error-something-went-wrong></error-something-went-wrong>`;
      case 'UnableToCloseAccount':
        return html`<error-unable-to-close></error-unable-to-close>`;
      case 'LinkedToAnotherAccount':
        return html`<error-linked-to-another></error-linked-to-another>`;
      case 'RemainingBalance':
        return html`<error-remaining-balance></error-remaining-balance>`;
      case 'TransactionPending':
        return html`<error-transaction-pending></error-transaction-pending>`;
      default:
        return html`<p>Unknown error type: ${this.errorType}</p>`;
    }
  }
}

customElements.define('error-screen-b', ErrorScreenB);
