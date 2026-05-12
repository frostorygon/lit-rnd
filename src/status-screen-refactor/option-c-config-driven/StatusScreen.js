/**
 * StatusScreen — Variation C: Config-Driven
 *
 * The component accepts a config object that defines everything:
 * variant, heading, description, action label, icon.
 *
 * Consumer just picks a config (or builds one) and passes it.
 * Zero slots, zero boilerplate at the call site.
 *
 * Emits 'action-click' when the action button is pressed.
 *
 * @element status-screen
 * @property {Object} config - { variant, heading, description, actionLabel, icon? }
 *
 * @fires action-click
 */
import { LitElement } from 'lit';
import { statusScreenStyles } from '../_shared/StatusScreen.css.js';
import { renderStatusScreen } from './StatusScreen.template.js';

export class StatusScreen extends LitElement {
  static properties = {
    config: { type: Object },
  };

  static styles = [statusScreenStyles];

  /** @returns {string} Variant from config for CSS :host([variant]) */
  get variant() {
    return this.config?.variant ?? 'error';
  }

  constructor() {
    super();
    this.config = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Reflect variant to attribute for CSS :host([variant]) selector
    this._syncVariantAttribute();
  }

  updated(changedProps) {
    if (changedProps.has('config')) {
      this._syncVariantAttribute();
    }
  }

  _syncVariantAttribute() {
    this.setAttribute('variant', this.variant);
  }

  handleActionClick() {
    this.dispatchEvent(new CustomEvent('action-click', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return renderStatusScreen(this);
  }
}

customElements.define('status-screen-c', StatusScreen);
