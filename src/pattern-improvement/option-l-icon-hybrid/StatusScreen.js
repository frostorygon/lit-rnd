/**
 * StatusScreen — Option L: Icon Auto + Slot Override
 *
 * Best of both worlds:
 * - Default: variant automatically picks the right icon (like K)
 * - Override: consumer can provide a custom icon via <slot name="icon"> (like J)
 *
 * This uses the web platform's native slot fallback content:
 *   <slot name="icon">
 *     <lottie-player ...default...></lottie-player>
 *   </slot>
 *
 * If the consumer provides nothing → default lottie renders.
 * If the consumer provides an icon slot → their content replaces the default.
 *
 * Usage (auto icon):
 *   <status-screen-l variant="success">
 *     <span slot="heading">Account closed!</span>
 *     ...
 *   </status-screen-l>
 *
 * Usage (custom icon override):
 *   <status-screen-l variant="error">
 *     <img slot="icon" src="custom-error.svg" />
 *     <span slot="heading">Custom error</span>
 *     ...
 *   </status-screen-l>
 *
 * @element status-screen-l
 * @property {string} variant - 'error' | 'warning' | 'info' | 'success'
 *
 * @slot icon - Optional. Overrides the default variant icon.
 * @slot heading
 * @slot description
 * @slot notification
 * @slot action
 *
 * @fires status-action
 */
import { LitElement } from 'lit';
import { statusScreenStyles } from './StatusScreen.css.js';
import { renderStatusScreen } from './StatusScreen.template.js';

import '../_stubs/lottie-player.js';

export class StatusScreenL extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  static styles = [statusScreenStyles];

  constructor() {
    super();
    this.variant = 'error';
  }

  _onActionClick() {
    this.dispatchEvent(new CustomEvent('status-action', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return renderStatusScreen({
      variant: this.variant,
      onActionClick: () => this._onActionClick(),
    });
  }
}

customElements.define('status-screen-l', StatusScreenL);
