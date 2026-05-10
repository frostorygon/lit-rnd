/**
 * ErrorScreen — Option C: Controller + Composition
 *
 * The most "modern Lit" approach:
 * - ErrorTrackerController handles analytics (lifecycle-aware, reusable)
 * - Component class is pure UI (~30 lines)
 * - Template is a pure function (no `this`)
 * - Config is declarative data
 *
 * The controller is independently testable and can be reused in
 * any other component that needs error tracking.
 *
 * @element error-screen-c
 * @property {string} errorType - Error variant to display.
 */
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { ErrorTrackerController } from './controllers/error-tracker.js';
import { ERROR_CONFIGS } from './controllers/error-config.js';
import { errorScreenStyles } from './ErrorScreen.css.js';
import { renderErrorScreen } from './templates/error-template.js';

// Stubs
import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class ErrorScreenC extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: {
      type: String,
      attribute: 'error-type',
    },
  };

  static styles = [errorScreenStyles];

  /**
   * The controller handles all tracking logic.
   * The component doesn't even import trackError — it's not its job.
   */
  tracker = new ErrorTrackerController(this, {
    getErrorType: () => this.errorType,
    getTrackMessage: (type) => ERROR_CONFIGS[type]?.trackMessage,
  });

  constructor() {
    super();
    this.errorType = 'SomethingWentWrong';
  }

  /** Pure render — no side effects, no switch, no logic. */
  render() {
    const config = ERROR_CONFIGS[this.errorType];
    if (!config) {
      return html`<p>Unknown error type: ${this.errorType}</p>`;
    }

    return renderErrorScreen({
      config,
      msgLit: (key) => this.msgLit(key),
      onAction: () => this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true })),
    });
  }
}

customElements.define('error-screen-c', ErrorScreenC);
