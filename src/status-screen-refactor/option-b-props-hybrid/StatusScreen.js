/**
 * StatusScreen — Variation B: Props + Slots Hybrid
 *
 * Props for common content (heading, description) — less boilerplate.
 * Slots for custom content (notification, action) — still flexible.
 *
 * The sweet spot: most screens just pass heading + description + variant,
 * and only the ones that need custom content use slots.
 *
 * @element status-screen
 * @property {string} variant     - 'error' | 'warning' | 'info' | 'success'
 * @property {string} heading     - Title text
 * @property {string} description - Body text
 *
 * @slot icon         - Custom icon (overrides default)
 * @slot notification - Optional notification banner
 * @slot action       - Bottom action button(s)
 */
import { LitElement } from 'lit';
import { statusScreenStyles } from '../_shared/StatusScreen.css.js';
import { renderStatusScreen } from './StatusScreen.template.js';

export class StatusScreen extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    heading: { type: String },
    description: { type: String },
  };

  static styles = [statusScreenStyles];

  constructor() {
    super();
    this.variant = 'error';
    this.heading = '';
    this.description = '';
  }

  render() {
    return renderStatusScreen(this);
  }
}

customElements.define('status-screen-b', StatusScreen);
