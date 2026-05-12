/**
 * StatusScreen — Variation A: Pure Layout Shell
 *
 * The component is just a styled container with slots.
 * It owns layout + variant coloring. Consumer owns content + behavior.
 *
 * - No heading/description props — consumer provides via slots
 * - No action event — consumer handles clicks on their own buttons
 * - Icon auto-picked from variant, overridable via slot
 *
 * @element status-screen
 * @property {string} variant - 'error' | 'warning' | 'info' | 'success'
 *
 * @slot icon         - Custom icon (overrides default variant icon)
 * @slot heading      - Title text
 * @slot description  - Body text
 * @slot notification - Optional notification banner
 * @slot action       - Bottom action button(s)
 */
import { LitElement } from 'lit';
import { statusScreenStyles } from '../_shared/StatusScreen.css.js';
import { renderStatusScreen } from './StatusScreen.template.js';

export class StatusScreen extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
  };

  static styles = [statusScreenStyles];

  constructor() {
    super();
    this.variant = 'error';
  }

  render() {
    return renderStatusScreen(this);
  }
}

customElements.define('status-screen-a', StatusScreen);
