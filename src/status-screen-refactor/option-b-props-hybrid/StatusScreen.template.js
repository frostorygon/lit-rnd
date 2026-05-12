import { html, nothing } from 'lit';

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
    <slot name="icon">
      <div class="icon-area">
        <lottie-player autoplay icon=${icon}></lottie-player>
      </div>
    </slot>

    <div class="accent-bar"></div>

    <!-- Heading + description from props — no slots needed for text -->
    ${ctx.heading
      ? html`<h2 class="heading">${ctx.heading}</h2>`
      : nothing}
    ${ctx.description
      ? html`<p class="description">${ctx.description}</p>`
      : nothing}

    <!-- Slots for custom content -->
    <slot name="notification"></slot>

    <div class="action-area">
      <slot name="action"></slot>
    </div>
  `;
};
