import { BaseError } from './BaseError.js';

export class SomethingWentWrong extends BaseError {
  get errorConfig() {
    return {
      trackMessage: ['Technical error', 'Something went wrong'],
      h1Key: 'something-went-wrong.h1',
      pKey: 'something-went-wrong.p',
      actionType: 'button',
      buttonKey: 'something-went-wrong.button',
    };
  }
}

customElements.define('error-something-went-wrong', SomethingWentWrong);
