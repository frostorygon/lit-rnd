/**
 * ErrorTrackerController — Reactive Controller for analytics tracking.
 *
 * Encapsulates the "track error once per type change" logic.
 * Reusable across any component that needs error tracking.
 *
 * This is the key difference from Options A/B — logic is extracted
 * into a composable unit, not baked into the component class.
 */
import { trackError } from '../../_stubs/track-error.js';

export class ErrorTrackerController {
  /** @type {import('lit').ReactiveControllerHost} */
  host;

  /** @type {string|null} */
  _lastTrackedType = null;

  /**
   * @param {import('lit').ReactiveControllerHost} host
   * @param {() => string} getErrorType - Function that returns current errorType
   * @param {(errorType: string) => [string, string]} getTrackMessage - Returns [category, message]
   */
  constructor(host, { getErrorType, getTrackMessage }) {
    this.host = host;
    host.addController(this);
    this._getErrorType = getErrorType;
    this._getTrackMessage = getTrackMessage;
  }

  /**
   * Called after every render. Tracks only when error type actually changes.
   * Replaces the buggy "track inside render()" pattern.
   */
  hostUpdated() {
    const currentType = this._getErrorType();
    if (currentType && currentType !== this._lastTrackedType) {
      this._lastTrackedType = currentType;
      const message = this._getTrackMessage(currentType);
      if (message) {
        trackError(...message);
      }
    }
  }

  hostDisconnected() {
    this._lastTrackedType = null;
  }
}
