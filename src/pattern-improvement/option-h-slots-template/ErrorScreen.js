/**
 * ErrorScreen — Option H: Slots + Separate Template
 *
 * A layout shell. It renders a lottie animation and named slots.
 * The consumer composes whatever content they want into the slots.
 *
 * @element error-screen-h
 * @slot heading - The error title
 * @slot description - The error message body
 * @slot notification - Optional notification bar
 * @slot action - Button, link, popover, or any action widget
 */
import { LitElement } from 'lit';
import { errorScreenStyles } from './ErrorScreen.css.js';
import { renderErrorScreen } from './ErrorScreen.template.js';

import '../_stubs/lottie-player.js';

export class ErrorScreenH extends LitElement {
  static styles = [errorScreenStyles];

  render() {
    return renderErrorScreen();
  }
}

customElements.define('error-screen-h', ErrorScreenH);
