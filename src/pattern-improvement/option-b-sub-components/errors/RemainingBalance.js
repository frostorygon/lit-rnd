import { BaseError } from './BaseError.js';

export class RemainingBalance extends BaseError {
  get errorConfig() {
    return {
      trackMessage: ['Technical error', 'Unable to close account - balance remains'],
      h1Key: 'remaining-balance.h1',
      pKey: 'remaining-balance.p',
      actionType: 'button',
      buttonKey: 'remaining-balance.button',
    };
  }
}

customElements.define('error-remaining-balance', RemainingBalance);
