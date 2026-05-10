/**
 * Error config — same as Option A.
 * Shared here so the controller and template can both reference it.
 */

/** @type {Record<string, { trackMessage: [string, string], h1Key: string, pKey: string, actionType: string, buttonKey?: string, notificationKey?: string }>} */
export const ERROR_CONFIGS = {
  SomethingWentWrong: {
    trackMessage: ['Technical error', 'Something went wrong'],
    h1Key: 'something-went-wrong.h1',
    pKey: 'something-went-wrong.p',
    actionType: 'button',
    buttonKey: 'something-went-wrong.button',
  },

  UnableToCloseAccount: {
    trackMessage: ['Technical error', 'Unable to close account - call us'],
    h1Key: 'unable-close-account.h1',
    pKey: 'unable-close-account.p',
    actionType: 'contact-support',
  },

  LinkedToAnotherAccount: {
    trackMessage: ['Technical error', 'Unable to close account - account is linked'],
    h1Key: 'linked-to-another-account.h1',
    pKey: 'linked-to-another-account.p',
    actionType: 'notification-button',
    notificationKey: 'linked-to-another-account.notification_inline',
    buttonKey: 'linked-to-another-account.link',
  },

  RemainingBalance: {
    trackMessage: ['Technical error', 'Unable to close account - balance remains'],
    h1Key: 'remaining-balance.h1',
    pKey: 'remaining-balance.p',
    actionType: 'button',
    buttonKey: 'remaining-balance.button',
  },

  TransactionPending: {
    trackMessage: ['Technical error', 'Unable to close account - transaction pending'],
    h1Key: 'transaction-pending.h1',
    pKey: 'transaction-pending.p',
    actionType: 'notification-button',
    notificationKey: 'transaction-pending.notification_inline',
    buttonKey: 'transaction-pending.button',
  },
};
