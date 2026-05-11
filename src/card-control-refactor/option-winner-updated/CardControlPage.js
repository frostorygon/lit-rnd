/**
 * WINNER (Updated) — Story Pattern + Dialog Loading
 *
 * Based on V4 "Story" pattern, updated to handle the real loading UIs:
 *   - Initial load: full-page spinner (switch not in DOM)
 *   - Toggle: transparent modal overlay (switch stays in DOM behind it)
 *
 * Structure:
 *   option-winner-updated/
 *   ├── CardControlPage.js              ← this file
 *   ├── CardControlScreen.template.js   ← two loading states
 *   └── services/
 *       └── card-service.js             ← API + parsing + error typing
 *
 * Key difference from option-winner/:
 *   - Added _initialized flag: controls "show page or full spinner"
 *   - _isLoading now controls the modal overlay AND guards re-entry
 *   - Template uses <component-dialog> instead of replacing the page
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
    this._initialized = false; // "show page or full spinner?"
    this._isLoading = false;   // "open the modal overlay?"
    this._errorType = '';
  }

  connectedCallback() {
    super.connectedCallback();
    trackPage('temp-hold-card');
  }

  // ── The story: initial load ──────────────────────────
  // Switch is NOT in the DOM yet → no change event possible
  async firstUpdated() {
    const { isBlocked, error } = await getCardStatus(this.cardId);
    if (error) return this._showError(error);
    this.isCardBlocked = isBlocked;
    this._initialized = true; // page appears, switch mounts with correct value
  }

  // ── The story: user toggles the switch ───────────────
  async _handleToggle() {
    if (this._isLoading) return; // guard: switch fires change during toggle → ignore

    this._showLoading();
    const { isBlocked, error } = await toggleCardStatus(
      this.cardId, this.isCardBlocked, this.accountId,
    );
    this.isCardBlocked = isBlocked; // switch updates behind modal → change fires → guard catches it
    if (error) return this._showError(error);
    this._dismissLoading();
    this._navigateNext();
  }

  // ── Named state transitions ──────────────────────────
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
    // In production: this.next({ state: { isCardBlocked: this.isCardBlocked } });
    console.log('[Router] Next:', { isCardBlocked: this.isCardBlocked });
  }

  // ── Render ───────────────────────────────────────────
  render() {
    return renderCardControl({
      initialized: this._initialized,
      isCardBlocked: this.isCardBlocked,
      isLoading: this._isLoading,
      errorType: this._errorType,
      onToggle: () => this._handleToggle(),
    });
  }
}

customElements.define('card-control-page', CardControlPage);
