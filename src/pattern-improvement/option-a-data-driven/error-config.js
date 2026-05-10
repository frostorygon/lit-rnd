/**
 * Error configuration map.
 * Single source of truth for all error types — adding a new error
 * is just adding one object here. No switch statements needed.
 *
 * @typedef {'SomethingWentWrong'|'UnableToCloseAccount'|'LinkedToAnotherAccount'|'RemainingBalance'|'TransactionPending'} ErrorType
 *
 * @typedef {Object} ErrorConfig
 * @property {[string, string]} trackMessage - [category, message] for analytics
 * @property {string} h1Key - i18n key for the heading
 * @property {string} pKey - i18n key for the description
 * @property {'button'|'contact-support'|'linked-accounts'|'notification-button'} actionType - which action widget to render
 * @property {string} [buttonKey] - i18n key for the button label
 * @property {string} [linkKey] - i18n key for a link label
 * @property {string} [notificationKey] - i18n key for notification text
 */

/** @type {Record<ErrorType, ErrorConfig>} */
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
    linkKey: 'linked-to-another-account.link',
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
