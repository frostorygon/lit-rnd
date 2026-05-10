/**
 * my-todo: A more complex component demonstrating:
 * - Internal state (via static properties with state: true)
 * - List rendering with .map()
 * - Conditional rendering
 * - Event dispatching with CustomEvent
 * - Form handling
 *
 * Plain JS — no decorators, no TypeScript needed.
 */
import { LitElement, html, css } from 'lit';

export class MyTodo extends LitElement {
  static properties = {
    heading: { type: String },
    // state: true = internal only, not reflected to attributes
    _items: { type: Array, state: true },
    _inputValue: { type: String, state: true },
  };

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
      margin: 0 0 16px;
      color: #1a1a2e;
    }

    .input-row {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    input[type='text'] {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    input[type='text']:focus {
      outline: none;
      border-color: #4361ee;
      box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.15);
    }

    button.add {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: #4361ee;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }

    button.add:hover {
      background: #3a56d4;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    li:last-child {
      border-bottom: none;
    }

    .done {
      text-decoration: line-through;
      color: #999;
    }

    .remove {
      margin-left: auto;
      background: none;
      border: none;
      color: #e63946;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
    }

    .empty {
      color: #999;
      font-style: italic;
      font-size: 14px;
    }

    .summary {
      margin-top: 12px;
      font-size: 13px;
      color: #777;
    }
  `;

  constructor() {
    super();
    this.heading = 'Todo List';
    this._items = [];
    this._inputValue = '';
    this._nextId = 1;
  }

  render() {
    const remaining = this._items.filter((i) => !i.done).length;

    return html`
      <h3>${this.heading}</h3>

      <div class="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          .value=${this._inputValue}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
        />
        <button class="add" @click=${this._addItem}>Add</button>
      </div>

      ${this._items.length === 0
        ? html`<p class="empty">No items yet. Add one above!</p>`
        : html`
            <ul>
              ${this._items.map(
                (item) => html`
                  <li>
                    <input
                      type="checkbox"
                      ?checked=${item.done}
                      @change=${() => this._toggleItem(item.id)}
                    />
                    <span class=${item.done ? 'done' : ''}>${item.text}</span>
                    <button class="remove" @click=${() => this._removeItem(item.id)}>×</button>
                  </li>
                `,
              )}
            </ul>

            <p class="summary">${remaining} item${remaining !== 1 ? 's' : ''} remaining</p>
          `}
    `;
  }

  _onInput(e) {
    this._inputValue = e.target.value;
  }

  _onKeydown(e) {
    if (e.key === 'Enter') {
      this._addItem();
    }
  }

  _addItem() {
    const text = this._inputValue.trim();
    if (!text) return;

    this._items = [
      ...this._items,
      { id: this._nextId++, text, done: false },
    ];
    this._inputValue = '';

    this.dispatchEvent(
      new CustomEvent('item-added', {
        detail: { text },
        bubbles: true,
      }),
    );
  }

  _toggleItem(id) {
    this._items = this._items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item,
    );
  }

  _removeItem(id) {
    this._items = this._items.filter((item) => item.id !== id);
  }
}

customElements.define('my-todo', MyTodo);
