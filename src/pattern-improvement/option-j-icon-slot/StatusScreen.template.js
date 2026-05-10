/**
 * Template for StatusScreen — icon via slot.
 *
 * The consumer provides the icon/animation via <slot name="icon">.
 * This is how Shoelace's sl-alert handles it:
 *   <sl-alert><sl-icon slot="icon" name="check-circle"></sl-icon>...</sl-alert>
 *
 * @param {object} [data]
 * @param {() => void} [data.onActionClick]
 */
import { html } from 'lit';

export function renderStatusScreen({ onActionClick } = {}) {
  return html`
    <slot name="icon"></slot>
    <div class="accent-bar"></div>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <div class="action-wrapper" @click=${onActionClick}>
      <slot name="action"></slot>
    </div>
  `;
}
