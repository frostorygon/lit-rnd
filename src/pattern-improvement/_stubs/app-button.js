/**
 * Stub: <app-button>
 * Simulates a design system button component for demo purposes.
 */
import { LitElement, html, css } from 'lit';

export class AppButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      margin-top: auto;
      width: 100%;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      background: #ff6200;
      color: white;
      font-size: 16px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #e55800;
    }
  `;

  render() {
    return html`<button><slot></slot></button>`;
  }
}

customElements.define('app-button', AppButton);
