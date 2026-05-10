/**
 * my-counter: Demonstrates reactive controllers for composable logic.
 *
 * Uses CounterController to manage state — the component is just UI.
 * Plain JS — no decorators, no TypeScript needed.
 */
import { LitElement, html, css } from 'lit';
import { CounterController } from '../controllers/counter-controller.js';

export class MyCounter extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      background: #fafafa;
    }

    h3 {
      margin: 0 0 12px;
      color: #1a1a2e;
    }

    .controls {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .count {
      font-size: 24px;
      font-weight: bold;
      min-width: 40px;
      text-align: center;
      color: #4361ee;
    }

    button {
      padding: 8px 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s;
    }

    button:hover {
      background: #f0f0f0;
    }

    button.reset {
      margin-left: 8px;
      color: #e63946;
      border-color: #e63946;
    }

    button.reset:hover {
      background: #fde8ea;
    }
  `;

  constructor() {
    super();
    // Reactive controller — composable logic, not inheritance
    this.counter = new CounterController(this, 0);
  }

  render() {
    return html`
      <h3>Reactive Controller Demo</h3>
      <div class="controls">
        <button @click=${() => this.counter.decrement()}>−</button>
        <span class="count">${this.counter.count}</span>
        <button @click=${() => this.counter.increment()}>+</button>
        <button class="reset" @click=${() => this.counter.reset()}>Reset</button>
      </div>
    `;
  }
}

customElements.define('my-counter', MyCounter);
