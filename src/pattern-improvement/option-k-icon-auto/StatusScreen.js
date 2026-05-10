/**
 * StatusScreen — Option K: Icon Auto-Mapped from Variant
 *
 * The component automatically picks the right icon/animation
 * based on the `variant` prop. The consumer just says
 * variant="success" and gets the checkmark. No icon slot needed.
 *
 * Trade-off: less flexible (can't use a custom icon),
 * but simpler consumer API.
 *
 * Usage:
 *   <status-screen-k variant="error">
 *     <span slot="heading">Something went wrong</span>
 *     ...
 *   </status-screen-k>
 *
 *   <status-screen-k variant="success">
 *     <span slot="heading">Account closed!</span>
 *     ...
 *   </status-screen-k>
 *
 * @element status-screen-k
 * @property {string} variant - 'error' | 'warning' | 'info' | 'success'
 * @fires status-action
 */
import { LitElement } from 'lit';
import { statusScreenStyles } from './StatusScreen.css.js';
import { renderStatusScreen } from './StatusScreen.template.js';

import '../_stubs/lottie-player.js';

export class StatusScreenK extends LitElement {
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

customElements.define('status-screen-k', StatusScreenK);
