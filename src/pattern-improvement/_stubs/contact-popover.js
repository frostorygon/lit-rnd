/**
 * Stub: <contact-popover>
 * Simulates a design system contact/support popover component for demo purposes.
 */
import { LitElement, html, css } from 'lit';

export class ContactPopover extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
      margin-top: auto;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 24px;
      border: 2px solid #ff6200;
      border-radius: 4px;
      background: white;
      color: #ff6200;
      font-size: 16px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #fff5ef;
    }
  `;

  render() {
    return html`<button>📞 Contact support</button>`;
  }
}

customElements.define('contact-popover', ContactPopover);
