/**
 * B1-V4: "Story" Pattern
 *
 * The component reads like a story — each lifecycle method is a
 * sequence of named actions. You read top-to-bottom and understand
 * the feature without drilling into any file.
 *
 * Structure:
 *   option-b1-v4-story/
 *   ├── CardControlPage.js              ← this file (~65 lines, reads like prose)
 *   ├── CardControlScreen.template.js   ← template
 *   └── services/
 *       └── card-service.js             ← API + parsing + error typing
 *
 * The component answers: "WHAT happens and WHEN"
 * The service answers:   "HOW it talks to the API"
 * The template answers:  "HOW it looks on screen"
 */
import { LitElement } from 'lit';
import { renderCardControl } from './CardControlScreen.template.js';
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageV4 extends LitElement {
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
    this._isLoading = true;
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
    this._dismissLoading();
  }

  // ── The story: user toggles the switch ───────────────
  async _handleToggle() {
    this._showLoading();
    const { isBlocked, error } = await toggleCardStatus(
      this.cardId, this.isCardBlocked, this.accountId,
    );
    this.isCardBlocked = isBlocked;
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
      isCardBlocked: this.isCardBlocked,
      isLoading: this._isLoading,
      errorType: this._errorType,
      onToggle: () => this._handleToggle(),
    });
  }
}

customElements.define('card-control-v4', CardControlPageV4);
