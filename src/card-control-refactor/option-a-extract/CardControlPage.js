/**
 * OPTION A: Extract & Fix
 *
 * Minimal change from the original. Fixes the bugs and extracts
 * the response-parsing logic into a testable utility.
 *
 * Structure:
 *   option-a-extract/
 *   ├── CardControlPage.js          ← this file (~70 lines)
 *   ├── CardControlScreen.js        ← template (unchanged)
 *   ├── CardControlScreen.css.js    ← styles (unchanged)
 *   ├── services/
 *   │   └── cards-service.js        ← pure API wrappers (unchanged)
 *   └── utils/
 *       └── card-status-parser.js   ← NEW: extracted parsing + error classification
 *
 * Fixes applied:
 *   1. trackPage() moved from constructor → connectedCallback()
 *   2. _initializing hack removed — _isLoading starts true, modal blocks interaction
 *   3. err.message.includes('422') → err.status === 422
 *   4. Dead code after this.next() removed
 *   5. Response parsing extracted to pure function
 *   6. Error classification extracted to pure function
 */
import { LitElement } from 'lit';
import { renderCardControl } from '../_shared/card-control.template.js';
import { getDebitCards, blockCard, unblockCard } from './services/cards-service.js';
import { parseCardStatus, classifyError } from './utils/card-status-parser.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageA extends LitElement {
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
    this._isLoading = true; // modal blocks interaction until data loads
    this._errorType = '';
  }

  connectedCallback() {
    super.connectedCallback();
    trackPage('temp-hold-card');
    document.addEventListener('keydown', this.constructor._handleKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.constructor._handleKeyDown);
    super.disconnectedCallback();
  }

  static _handleKeyDown(e) {
    if (e.key === 'Escape') e.preventDefault();
  }

  async firstUpdated() {
    try {
      const response = await getDebitCards();
      const status = parseCardStatus(response, this.cardId);
      if (!status) {
        this._errorType = 'somethingWentWrong';
        return;
      }
      this.isCardBlocked = status === 'block';
    } catch {
      this._errorType = 'somethingWentWrong';
    } finally {
      this._isLoading = false;
    }
  }

  async _handleToggle() {
    this._isLoading = true;
    try {
      if (this.isCardBlocked) {
        await unblockCard(this.cardId, this.accountId);
      } else {
        await blockCard(this.cardId, this.accountId);
      }
      this._errorType = '';
      this.isCardBlocked = !this.isCardBlocked;
    } catch (err) {
      this._errorType = classifyError(err, this.isCardBlocked);
    } finally {
      this._isLoading = false;
    }
  }

  render() {
    return renderCardControl({
      isCardBlocked: this.isCardBlocked,
      isLoading: this._isLoading,
      errorType: this._errorType,
      onToggle: () => this._handleToggle(),
    });
  }
}

customElements.define('card-control-a', CardControlPageA);
