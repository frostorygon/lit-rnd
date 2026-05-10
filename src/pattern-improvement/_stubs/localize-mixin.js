/**
 * Stub: LocalizeMixin + msgLit()
 * Simulates open-source's localization mixin for demo purposes.
 * Uses a simple key→string map instead of real i18n.
 */
import { LitElement } from 'lit';

/** Simple translation map keyed by namespace.key */
const translations = {
  'something-went-wrong.h1': 'Something went wrong',
  'something-went-wrong.p': 'We encountered an unexpected error. Please try again later.',
  'something-went-wrong.button': 'Try again',

  'unable-close-account.h1': 'Unable to close account',
  'unable-close-account.p': 'We\'re unable to close your account at this time. Please call us for assistance.',

  'linked-to-another-account.h1': 'Account is linked',
  'linked-to-another-account.p': 'This account is linked to another account and cannot be closed independently.',
  'linked-to-another-account.link': 'View linked accounts',
  'linked-to-another-account.notification_inline': 'Please unlink this account before proceeding with closure.',

  'remaining-balance.h1': 'Remaining balance',
  'remaining-balance.p': 'Your account still has a remaining balance. Please transfer or withdraw funds first.',
  'remaining-balance.button': 'Transfer funds',

  'transaction-pending.h1': 'Transaction pending',
  'transaction-pending.p': 'There are pending transactions on this account. Please wait for them to complete.',
  'transaction-pending.notification_inline': 'Pending transactions must be settled before service cancellation.',
  'transaction-pending.button': 'View transactions',
};

/**
 * Mixin that adds msgLit() for localization.
 * Usage: class MyEl extends LocalizeMixin(LitElement) { ... }
 *
 * @param {typeof LitElement} Base
 * @returns {typeof LitElement}
 */
export const LocalizeMixin = (Base) =>
  class extends Base {
    /**
     * Look up a localized string by key.
     * @param {string} key
     * @returns {string}
     */
    msgLit(key) {
      return translations[key] || `[missing: ${key}]`;
    }
  };
