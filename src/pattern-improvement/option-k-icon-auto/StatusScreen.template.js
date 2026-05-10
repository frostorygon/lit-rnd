/**
 * Template for StatusScreen — icon auto-mapped from variant.
 *
 * The component internally selects the right lottie animation
 * based on the `variant` prop. Consumer never worries about icons.
 *
 * @param {object} data
 * @param {string} data.variant - 'error' | 'warning' | 'info' | 'success'
 * @param {() => void} [data.onActionClick]
 */
import { html } from 'lit';

/** Small map: variant → icon attribute for the lottie-player stub */
const VARIANT_ICON = {
  error:   'error',
  warning: 'warning',
  info:    'info',
  success: 'success',
};

export function renderStatusScreen({ variant, onActionClick }) {
  const icon = VARIANT_ICON[variant] ?? 'error';

  return html`
    <lottie-player autoplay icon=${icon}></lottie-player>
    <div class="accent-bar"></div>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <div class="action-wrapper" @click=${onActionClick}>
      <slot name="action"></slot>
    </div>
  `;
}
