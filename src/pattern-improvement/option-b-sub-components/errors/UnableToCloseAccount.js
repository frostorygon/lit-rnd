import { BaseError } from './BaseError.js';

export class UnableToCloseAccount extends BaseError {
  get errorConfig() {
    return {
      trackMessage: ['Technical error', 'Unable to close account - call us'],
      h1Key: 'unable-close-account.h1',
      pKey: 'unable-close-account.p',
      actionType: 'contact-support',
    };
  }
}

customElements.define('error-unable-to-close', UnableToCloseAccount);
