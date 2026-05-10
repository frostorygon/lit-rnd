/**
 * <error-layout> — A dumb, composable shell.
 *
 * It doesn't know what "SomethingWentWrong" is. It doesn't track errors.
 * It doesn't pick templates. It just lays things out.
 *
 * The CONSUMER decides what goes inside via slots.
 *
 * Usage:
 *   <error-layout>
 *     <span slot="heading">Something went wrong</span>
 *     <span slot="description">Please try again later.</span>
 *     <app-button slot="action">Try again</app-button>
 *   </error-layout>
 *
 * @element error-layout
 * @slot heading - The error title
 * @slot description - The error message
 * @slot action - Button, link, or popover
 * @slot notification - Optional notification bar (appears above action)
 */
import { LitElement, html, css } from 'lit';
import '../_stubs/lottie-player.js';

export class ErrorLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 32px 24px;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 400px;
    }

    lottie-player {
      width: 160px;
    }

    ::slotted([slot='heading']) {
      display: block;
      font-size: 19px;
      font-weight: 700;
      margin: 16px 0 0;
    }

    ::slotted([slot='description']) {
      display: block;
      font-size: 16px;
      margin: 8px 0 0;
      color: #555;
    }

    ::slotted([slot='notification']) {
      display: block;
      margin-top: 24px;
      width: 100%;
      text-align: left;
    }

    ::slotted([slot='action']) {
      display: block;
      margin-top: auto;
      width: 100%;
    }
  `;

  render() {
    return html`
      <lottie-player autoplay></lottie-player>
      <slot name="heading"></slot>
      <slot name="description"></slot>
      <slot name="notification"></slot>
      <slot name="action"></slot>
    `;
  }
}

customElements.define('error-layout', ErrorLayout);
