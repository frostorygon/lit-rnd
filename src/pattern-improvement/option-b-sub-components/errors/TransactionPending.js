import { BaseError } from './BaseError.js';

export class TransactionPending extends BaseError {
  get errorConfig() {
    return {
      trackMessage: ['Technical error', 'Unable to close account - transaction pending'],
      h1Key: 'transaction-pending.h1',
      pKey: 'transaction-pending.p',
      actionType: 'notification-button',
      notificationKey: 'transaction-pending.notification_inline',
      buttonKey: 'transaction-pending.button',
    };
  }
}

customElements.define('error-transaction-pending', TransactionPending);
