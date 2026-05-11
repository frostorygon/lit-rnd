/**
 * B1-V1: Fixes Applied to B1
 *
 * Takes B1's clean { isBlocked, error } service pattern and fixes:
 *   1. _isLoading starts true (modal blocks interaction)
 *   2. _initializing hack removed (unnecessary with modal)
 *   3. err.status instead of string matching
 *   4. Separated navigation from toggle — error stays on page
 *
 * This is the "minimum viable improvement" over B1.
 */
import { LitElement, html } from 'lit';
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageV1 extends LitElement {
  static properties = {
    cardId: { type: String },
    accountId: { type: String },
    isCardBlocked: { type: Boolean },
    _isLoading: { type: Boolean, state: true },
    _errorType: { type: String, state: true },
  };

  constructor() {
    super();
    this.cardId = '';
    this.accountId = '';
    this.isCardBlocked = false;
    this._isLoading = true; // ✅ FIX: modal blocks interaction from the start
    this._errorType = '';
    // ✅ FIX: no _initializing — modal is the guard
  }

  connectedCallback() {
    super.connectedCallback();
    trackPage('temp-hold-card');
  }

  async firstUpdated() {
    const { isBlocked, error } = await getCardStatus(this.cardId);

    if (error) {
      this._errorType = error;
      this._isLoading = false;
      return;
    }

    this.isCardBlocked = isBlocked;
    this._isLoading = false;
  }

  async _handleToggle() {
    this._isLoading = true;

    const { isBlocked, error } = await toggleCardStatus(
      this.cardId,
      this.isCardBlocked,
      this.accountId,
    );

    this.isCardBlocked = isBlocked;
    this._errorType = error || '';
    this._isLoading = false;

    // ✅ FIX: only navigate on success — error stays on page
    if (!error) {
      this._navigateNext();
    }
  }

  _navigateNext() {
    // In production: this.next({ state: { isCardBlocked: this.isCardBlocked } });
    console.log('[Router] Next:', { isCardBlocked: this.isCardBlocked });
  }

  render() {
    if (this._isLoading) {
      return html`<app-spinner></app-spinner>`;
    }

    return html`
      <div class="card-control">
        <h1>Temporary hold card</h1>
        <app-switch
          ?checked=${this.isCardBlocked}
          @change=${this._handleToggle}
          ?disabled=${this._isLoading}
        >
          ${this.isCardBlocked ? 'Card is on hold' : 'Card is active'}
        </app-switch>
        ${this._errorType ? html`<p class="error">${this._errorType}</p>` : ''}
      </div>
    `;
  }
}

customElements.define('card-control-v1', CardControlPageV1);
