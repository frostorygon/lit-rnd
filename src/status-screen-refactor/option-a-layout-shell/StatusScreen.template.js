import { html } from 'lit';

const VARIANT_ICON = {
  error:   'error',
  warning: 'warning',
  info:    'info',
  success: 'success',
};

/**
 * @param {StatusScreen} ctx - the component instance
 */
export const renderStatusScreen = (ctx) => {
  const icon = VARIANT_ICON[ctx.variant] ?? 'error';

  return html`
    <!-- Icon: auto from variant, overridable via slot -->
    <slot name="icon">
      <div class="icon-area">
        <lottie-player autoplay icon=${icon}></lottie-player>
      </div>
    </slot>

    <div class="accent-bar"></div>

    <!-- Content: consumer provides everything -->
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>

    <!-- Action: consumer owns the button and its behavior -->
    <div class="action-area">
      <slot name="action"></slot>
    </div>
  `;
};
