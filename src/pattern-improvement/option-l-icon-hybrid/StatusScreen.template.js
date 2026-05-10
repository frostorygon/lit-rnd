/**
 * Template for StatusScreen — icon auto with slot fallback.
 *
 * Best of both worlds:
 * - By default, renders a lottie based on variant
 * - If consumer provides <slot name="icon">, that overrides the default
 *
 * Uses Lit's slot fallback pattern:
 *   <slot name="icon"><lottie-player ...></lottie-player></slot>
 *
 * @param {object} data
 * @param {string} data.variant
 * @param {() => void} [data.onActionClick]
 */
import { html } from 'lit';

const VARIANT_ICON = {
  error:   'error',
  warning: 'warning',
  info:    'info',
  success: 'success',
};

export function renderStatusScreen({ variant, onActionClick }) {
  const icon = VARIANT_ICON[variant] ?? 'error';

  return html`
    <slot name="icon">
      <lottie-player autoplay icon=${icon}></lottie-player>
    </slot>
    <div class="accent-bar"></div>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <div class="action-wrapper" @click=${onActionClick}>
      <slot name="action"></slot>
    </div>
  `;
}
