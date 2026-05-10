/**
 * Stub: <app-notification>
 * Simulates a design system inline notification component.
 */
import { LitElement, html, css } from 'lit';

export class AppNotification extends LitElement {
  static properties = {
    type: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      margin-top: 16px;
    }

    .notification {
      padding: 12px 16px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.4;
    }

    .notification.information {
      background: #e8f4fd;
      border-left: 4px solid #0077b6;
      color: #0077b6;
    }

    .notification.warning {
      background: #fff8e1;
      border-left: 4px solid #f9a825;
      color: #8d6e00;
    }
  `;

  constructor() {
    super();
    this.type = 'information';
  }

  render() {
    return html`<div class="notification ${this.type}"><slot></slot></div>`;
  }
}

customElements.define('app-notification', AppNotification);
