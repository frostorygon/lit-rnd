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
  const config = ctx.config;
  if (!config) return nothing;

  const icon = config.icon ?? VARIANT_ICON[config.variant] ?? 'error';

  return html`
    <div class="icon-area">
      <lottie-player autoplay icon=${icon}></lottie-player>
    </div>

    <div class="accent-bar"></div>

    ${config.heading
      ? html`<h2 class="heading">${config.heading}</h2>`
      : nothing}
    ${config.description
      ? html`<p class="description">${config.description}</p>`
      : nothing}

    ${config.actionLabel
      ? html`
        <div class="action-area">
          <button @click=${() => ctx.handleActionClick()}>
            ${config.actionLabel}
          </button>
        </div>`
      : nothing}
  `;
};
