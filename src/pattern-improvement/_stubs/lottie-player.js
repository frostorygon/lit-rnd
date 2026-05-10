/**
 * Stub: <lottie-player>
 * Simulates a Lottie animation player with a simple CSS animation.
 */
import { LitElement, html, css } from 'lit';

export class LottiePlayer extends LitElement {
  static properties = {
    src: { type: String },
    autoplay: { type: Boolean },
    icon: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      font-size: 48px;
      animation: pulse 2s ease-in-out infinite;
    }

    :host([icon='error']) .placeholder   { background: linear-gradient(135deg, #fff5ef, #ffe0cc); }
    :host([icon='warning']) .placeholder { background: linear-gradient(135deg, #fff9e6, #ffecb3); }
    :host([icon='info']) .placeholder    { background: linear-gradient(135deg, #e3f2fd, #bbdefb); }
    :host([icon='success']) .placeholder { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); }
    .placeholder:not([class])            { background: linear-gradient(135deg, #fff5ef, #ffe0cc); }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
  `;

  constructor() {
    super();
    this.src = '';
    this.autoplay = false;
    this.icon = '';
  }

  render() {
    const icons = { error: '⚠️', warning: '⚠️', info: 'ℹ️', success: '✅' };
    const emoji = icons[this.icon] ?? '⚠️';
    return html`<div class="placeholder">${emoji}</div>`;
  }
}

customElements.define('lottie-player', LottiePlayer);
