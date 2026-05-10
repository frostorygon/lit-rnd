import { BaseError } from './BaseError.js';

export class LinkedToAnotherAccount extends BaseError {
  get errorConfig() {
    return {
      trackMessage: ['Technical error', 'Unable to close account - account is linked'],
      h1Key: 'linked-to-another-account.h1',
      pKey: 'linked-to-another-account.p',
      actionType: 'notification-button',
      notificationKey: 'linked-to-another-account.notification_inline',
      buttonKey: 'linked-to-another-account.link',
    };
  }
}

customElements.define('error-linked-to-another', LinkedToAnotherAccount);
