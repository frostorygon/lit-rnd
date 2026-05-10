/**
 * my-card: Demonstrates Shadow DOM slots and content projection.
 *
 * @slot header - Optional header content.
 * @slot - Default slot for card body content.
 * @slot actions - Optional footer actions.
 *
 * @csspart header - The header container.
 * @csspart content - The body container.
 * @csspart footer - The footer container.
 *
 * @cssprop --card-border-color - Border color. Default: #ddd.
 * @cssprop --card-radius - Border radius. Default: 8px.
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--card-border-color, #ddd);
      border-radius: var(--card-radius, 8px);
      overflow: hidden;
      font-family: system-ui, sans-serif;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .header {
      background: #f8f9fa;
      padding: 16px;
      border-bottom: 1px solid var(--card-border-color, #ddd);
    }

    .content {
      padding: 16px;
    }

    .footer {
      background: #f8f9fa;
      padding: 12px 16px;
      border-top: 1px solid var(--card-border-color, #ddd);
    }

    /* Style slotted content */
    ::slotted(h2) {
      margin: 0;
      color: #1a1a2e;
    }

    ::slotted([slot='actions']) {
      display: flex;
      gap: 8px;
    }
  `;

  @property({ type: String, attribute: 'header-title' })
  headerTitle = '';

  render() {
    return html`
      <div class="header" part="header">
        <slot name="header">
          <h2>${this.headerTitle || 'Card Title'}</h2>
        </slot>
      </div>

      <div class="content" part="content">
        <slot></slot>
      </div>

      <div class="footer" part="footer">
        <slot name="actions">
          <span style="color: #999; font-size: 13px;">No actions provided</span>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-card': MyCard;
  }
}
