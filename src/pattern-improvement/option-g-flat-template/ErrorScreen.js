/**
 * ErrorScreen — Option G: Flat Props + Separate Template
 *
 * Dumb component. Takes props, calls template. That's it.
 * No error types, no switches, no config maps, no business logic.
 *
 * @element error-screen-g
 * @property {string} heading
 * @property {string} description
 * @property {string} actionType - 'button' | 'contact-support'
 * @property {string} actionLabel
 * @property {string} notificationText
 */
import { LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { errorScreenStyles } from './ErrorScreen.css.js';
import { renderErrorScreen } from './ErrorScreen.template.js';

import '../_stubs/app-button.js';
import '../_stubs/contact-popover.js';
import '../_stubs/lottie-player.js';
import '../_stubs/app-notification.js';

export class ErrorScreenG extends LitElement {
  static properties = {
    heading:          { type: String },
    description:      { type: String },
    actionType:       { type: String, attribute: 'action-type' },
    actionLabel:      { type: String, attribute: 'action-label' },
    notificationText: { type: String, attribute: 'notification-text' },
  };

  static styles = [errorScreenStyles];

  constructor() {
    super();
    this.heading = '';
    this.description = '';
    this.actionType = 'button';
    this.actionLabel = '';
    this.notificationText = '';
  }

  render() {
    return renderErrorScreen({
      heading: this.heading,
      description: this.description,
      actionType: this.actionType,
      actionLabel: this.actionLabel || undefined,
      notificationText: this.notificationText || undefined,
      onAction: () => this.dispatchEvent(new CustomEvent('error-action', { bubbles: true, composed: true })),
    });
  }
}

customElements.define('error-screen-g', ErrorScreenG);
