/**
 * StatusScreen — Option J: Icon via Slot
 *
 * The Shoelace pattern. Consumer provides the icon/animation
 * via a named slot. The component doesn't know or care what
 * the icon is — it just renders it.
 *
 * Usage:
 *   <status-screen-j variant="error">
 *     <lottie-player slot="icon" src="error.json" autoplay></lottie-player>
 *     <span slot="heading">Something went wrong</span>
 *     ...
 *   </status-screen-j>
 *
 *   <status-screen-j variant="success">
 *     <lottie-player slot="icon" src="success.json" autoplay></lottie-player>
 *     <span slot="heading">Account closed!</span>
 *     ...
 *   </status-screen-j>
 *
 * @element status-screen-j
 * @property {string} variant - 'error' | 'warning' | 'info' | 'success'
 *
 * @slot icon - The icon/animation (lottie, svg, img, anything)
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

export class StatusScreenJ extends LitElement {
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
    return renderStatusScreen({ onActionClick: () => this._onActionClick() });
  }
}

customElements.define('status-screen-j', StatusScreenJ);
