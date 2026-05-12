/**
 * Screen configs — centralized definitions for all status screens.
 *
 * Add a new screen = add 1 entry here. No new components needed.
 *
 * @typedef {Object} ScreenConfig
 * @property {'error'|'warning'|'info'|'success'} variant
 * @property {string} heading
 * @property {string} description
 * @property {string} [actionLabel]
 * @property {string} [icon] - override default variant icon
 */

/** @type {Record<string, ScreenConfig>} */
export const SCREEN_CONFIGS = {
  accountClosed: {
    variant: 'success',
    heading: 'Account closed',
    description: 'Your account has been successfully closed. You will receive a confirmation email shortly.',
    actionLabel: 'Back to home',
  },

  genericError: {
    variant: 'error',
    heading: 'Something went wrong',
    description: 'We couldn\'t process your request. Please try again later.',
    actionLabel: 'Try again',
  },

  cardBlocked: {
    variant: 'success',
    heading: 'Card on hold',
    description: 'Your card has been temporarily blocked. You can unblock it at any time.',
    actionLabel: 'Done',
  },

  cardUnblocked: {
    variant: 'success',
    heading: 'Card active',
    description: 'Your card has been unblocked and is ready to use.',
    actionLabel: 'Done',
  },

  verificationNeeded: {
    variant: 'info',
    heading: 'Verification needed',
    description: 'Please verify your identity to continue.',
    actionLabel: 'Verify now',
    icon: 'id-check',
  },

  maintenanceMode: {
    variant: 'warning',
    heading: 'Under maintenance',
    description: 'This feature is temporarily unavailable. Please try again later.',
    // no actionLabel → no button rendered
  },
};
