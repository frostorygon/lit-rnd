/**
 * my-greeting: A minimal Lit component demonstrating core concepts.
 *
 * @property {String} name - The name to greet.
 * @property {Number} count - Click counter.
 * @fires count-changed - When the counter changes.
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-greeting')
export class MyGreeting extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      border: 1px solid var(--greeting-border-color, #e0e0e0);
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      background: var(--greeting-bg, #fafafa);
    }

    h2 {
      margin: 0 0 8px;
      color: var(--greeting-heading-color, #1a1a2e);
    }

    p {
      margin: 0 0 12px;
      color: #555;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: var(--greeting-btn-bg, #4361ee);
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    button:hover {
      background: var(--greeting-btn-bg-hover, #3a56d4);
    }
  `;

  @property({ type: String })
  name = 'World';

  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <h2>Hello, ${this.name}!</h2>
      <p>Click count: ${this.count}</p>
      <button @click=${this._increment}>Click me</button>
    `;
  }

  private _increment() {
    this.count++;
    this.dispatchEvent(
      new CustomEvent('count-changed', {
        detail: { count: this.count },
        bubbles: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-greeting': MyGreeting;
  }
}
