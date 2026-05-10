/**
 * ErrorScreen — Option A: Data-Driven Config
 *
 * Same file-split pattern as the current codebase (Component + Template + CSS),
 * but with three key fixes:
 *
 * 1. trackError() is in updated(), not render()
 * 2. One config-driven template replaces 5 duplicate functions
 * 3. Template receives explicit props, not `this`
 *
 * @element error-screen-a
 * @property {string} errorType - Error variant to display.
 */
import { LitElement, html } from 'lit';
import { LocalizeMixin } from '../_stubs/localize-mixin.js';
import { trackError } from '../_stubs/track-error.js';
import { ERROR_CONFIGS } from './error-config.js';
import { errorScreenStyles } from './ErrorScreen.css.js';
import { renderErrorScreen } from './ErrorScreen.template.js';

// Stubs — in real code these come from your design system via scopedElements
import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class ErrorScreenA extends LocalizeMixin(LitElement) {
  static properties = {
    errorType: {
      type: String,
      attribute: 'error-type',
    },
  };

  static styles = [errorScreenStyles];

  constructor() {
    super();
    /** @type {import('./error-config.js').ErrorType} */
    this.errorType = 'SomethingWentWrong';
  }

  /**
   * Track errors here — fires ONCE per errorType change, not on every render.
   * This is the critical fix vs. the current code.
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('errorType')) {
      const config = ERROR_CONFIGS[this.errorType];
      if (config) {
        trackError(...config.trackMessage);
      }
    }
  }

  /**
   * render() is now a one-liner. No switch, no side effects.
   */
  render() {
    const config = ERROR_CONFIGS[this.errorType];
    if (!config) {
      return html`<p>Unknown error type: ${this.errorType}</p>`;
    }

    // Pass explicit props — template never touches `this`
    return renderErrorScreen({
      config,
      msgLit: (key) => this.msgLit(key),
      onAction: () => this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true })),
    });
  }
}

customElements.define('error-screen-a', ErrorScreenA);
