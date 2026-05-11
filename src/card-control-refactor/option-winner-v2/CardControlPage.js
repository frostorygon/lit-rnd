/**
 * WINNER (v2) — Story Pattern + Dialog Loading + `this` as context
 *
 * Same as option-winner-updated but passes `this` to the template
 * instead of building a context object. Cleaner for 1:1 relationships.
 *
 * Structure:
 *   option-winner-v2/
 *   ├── CardControlPage.js              ← this file
 *   ├── CardControlScreen.template.js   ← reads props directly from ctx
 *   └── services/
 *       └── card-service.js             ← same service
 */
import { LitElement } from 'lit';
import { renderCardControl } from './CardControlScreen.template.js';
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPage extends LitElement {
  static properties = {
    cardId: { type: String },
    accountId: { type: String },
    isCardBlocked: { type: Boolean },
    _initialized: { type: Boolean, state: true },
    _isLoading: { type: Boolean, state: true },
    _errorType: { type: String, state: true },
  };

  constructor() {
    super();
    this.cardId = '';
    this.accountId = '';
    this.isCardBlocked = false;
    this._initialized = false;
    this._isLoading = false;
    this._errorType = '';
  }

  connectedCallback() {
    super.connectedCallback();
    trackPage('temp-hold-card');
  }

  // ── The story: initial load ──────────────────────────
  async firstUpdated() {
    const { isBlocked, error } = await getCardStatus(this.cardId);
    if (error) return this._showError(error);
    this.isCardBlocked = isBlocked;
    this._initialized = true;
  }

  // ── The story: user toggles the switch ───────────────
  async handleToggle() {
    if (this._isLoading) return;

    this._showLoading();
    const { isBlocked, error } = await toggleCardStatus(
      this.cardId, this.isCardBlocked, this.accountId,
    );
    this.isCardBlocked = isBlocked;
    if (error) return this._showError(error);
    this._dismissLoading();
    this._navigateNext();
  }

  // ── State transitions ────────────────────────────────
  _showLoading() {
    this._isLoading = true;
    this._errorType = '';
  }

  _dismissLoading() {
    this._isLoading = false;
  }

  _showError(errorType) {
    this._errorType = errorType;
    this._isLoading = false;
  }

  _navigateNext() {
    console.log('[Router] Next:', { isCardBlocked: this.isCardBlocked });
  }

  // ── Render — just pass `this` ────────────────────────
  render() {
    return renderCardControl(this);
  }
}

customElements.define('card-control-page', CardControlPage);
