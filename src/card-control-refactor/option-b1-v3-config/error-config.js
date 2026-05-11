import { CARD_ERRORS } from './services/card-service.js';

/**
 * Error config map — defines how each error type renders.
 * Adding a new error = 1 entry here, 0 template changes.
 */
export const ERROR_CONFIG = {
  [CARD_ERRORS.GENERIC]: {
    title: 'Something went wrong',
    message: 'Please try again later.',
    action: 'retry', // template uses this to pick button type
  },
  [CARD_ERRORS.UNABLE_TO_HOLD]: {
    title: 'Unable to hold card',
    message: 'This card cannot be put on hold right now. Please contact support.',
    action: 'contact',
  },
  [CARD_ERRORS.UNABLE_TO_UNHOLD]: {
    title: 'Unable to take off hold',
    message: 'This card cannot be taken off hold right now. Please contact support.',
    action: 'contact',
  },
};
