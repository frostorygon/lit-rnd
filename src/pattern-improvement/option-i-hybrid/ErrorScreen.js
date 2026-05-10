/**
 * ErrorScreen — Option I: Hybrid (CSS Variant + Slots + Template)
 *
 * Combines the best patterns from Shoelace and open-source base library:
 * - `variant` prop drives visual styling via CSS (no JS switches)
 * - Named slots for content composition
 * - Separate template file for structure
 * - Fires `error-action` event when action slot is clicked (events up)
 *
 * This is the "production-ready" version.
 *
 * @element error-screen-i
 * @property {string} variant - Visual theme: 'error' | 'warning' | 'info'
 *
 * @slot heading - Error title
 * @slot description - Error message body
 * @slot notification - Optional inline notification
 * @slot action - Action widget (button, link, popover)
 *
 * @fires error-action - When the action slot is clicked
 *
 * @csspart accent - The colored accent bar
 * @cssprop --error-screen-accent - Override the variant accent color
 */
import { LitElement } from 'lit';
import { errorScreenStyles } from './ErrorScreen.css.js';
import { renderErrorScreen } from './ErrorScreen.template.js';

import '../_stubs/lottie-player.js';

export class ErrorScreenI extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  static styles = [errorScreenStyles];

  constructor() {
    super();
    this.variant = 'error';
  }

  /** Dispatch error-action when the action slot is clicked */
  _onActionClick() {
    this.dispatchEvent(new CustomEvent('error-action', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return renderErrorScreen({ onActionClick: () => this._onActionClick() });
  }
}

customElements.define('error-screen-i', ErrorScreenI);
