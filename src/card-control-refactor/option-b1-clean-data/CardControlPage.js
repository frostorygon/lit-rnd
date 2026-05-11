import { LitElement, html } from 'lit';
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageB1 extends LitElement {
  static properties = {
    cardId: { type: String },
    accountId: { type: String },
    isCardBlocked: { type: Boolean },
    _isLoading: { type: Boolean, state: true },
    _errorType: { type: String, state: true },
    _initializing: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.cardId = '';
    this.accountId = '';
    this.isCardBlocked = false;
    this._isLoading = false; 
    this._errorType = '';
    this._initializing = true;
  }

  connectedCallback() {
    super.connectedCallback();
    trackPage('temp-hold-card');
  }

  async firstUpdated() {
    this._isLoading = true;
    const { isBlocked, error } = await getCardStatus(this.cardId);
    this._isLoading = false;

    if (error) {
      this.next({ state: { errorType: error } });
      return;
    }

    this.isCardBlocked = isBlocked;
  }

  async handleToggleState() {
    if (this._initializing && this.isCardBlocked) {
      this._initializing = false;
      return;
    }
    
    this._isLoading = true;
    
    // Very clean consumption thanks to the improved service return type
    const { isBlocked, error } = await toggleCardStatus(
      this.cardId, 
      this.isCardBlocked, 
      this.accountId
    );

    this.isCardBlocked = isBlocked;
    this._errorType = error || '';
    this._isLoading = false;

    this.next({
      state: {
        isCardBlocked: this.isCardBlocked,
        errorType: this._errorType,
      },
    });
  }

  next(routeOptions) {
    console.log('[Router] Next:', routeOptions);
  }

  render() {
    if (this._isLoading && this._initializing) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="card-control">
        <h1>Temporary hold card</h1>
        <label>
          <input 
            type="checkbox" 
            .checked=${this.isCardBlocked}
            @change=${this.handleToggleState}
            ?disabled=${this._isLoading}
          />
          ${this.isCardBlocked ? 'Card is on hold' : 'Card is active'}
        </label>
        ${this._errorType ? html`<p class="error">${this._errorType}</p>` : ''}
      </div>
    `;
  }
}

customElements.define('card-control-page-b1', CardControlPageB1);
