/**
 * Template for the hybrid ErrorScreen.
 *
 * Adds a visual accent bar (colored by variant CSS) between
 * the animation and the slots. Wraps the action slot in a
 * click handler so the component can fire events upward.
 *
 * @param {object} [data]
 * @param {() => void} [data.onActionClick] - Handler for action slot clicks
 */
import { html } from 'lit';

export function renderErrorScreen({ onActionClick } = {}) {
  return html`
    <lottie-player autoplay></lottie-player>
    <div class="accent-bar"></div>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <div @click=${onActionClick}>
      <slot name="action"></slot>
    </div>
  `;
}
