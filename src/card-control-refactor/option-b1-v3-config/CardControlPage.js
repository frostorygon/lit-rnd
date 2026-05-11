/**
 * B1-V3: Config-Driven Errors
 *
 * Builds on V2 but adds an error config map so the template
 * can render different error UIs without a switch statement.
 *
 * Structure:
 *   option-b1-v3-config/
 *   ├── CardControlPage.js              ← component (~55 lines)
 *   ├── CardControlScreen.template.js   ← template with error rendering
 *   ├── error-config.js                 ← NEW: maps error types to UI config
 *   └── services/
 *       └── card-service.js             ← same service
 *
 * Why: If you later need different error messages, buttons, or icons
 * per error type, you add 1 config entry instead of a new switch case.
 */
import { LitElement } from 'lit';
import { renderCardControl } from './CardControlScreen.template.js';
import { getCardStatus, toggleCardStatus, CARD_ERRORS } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageV3 extends LitElement {
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
      this.cardId, this.isCardBlocked, this.accountId,
    );
    this.isCardBlocked = isBlocked;
    this._errorType = error || '';
    this._isLoading = false;

    if (!error) this._navigateNext();
  }

  _navigateNext() {
    console.log('[Router] Next:', { isCardBlocked: this.isCardBlocked });
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

customElements.define('card-control-v3', CardControlPageV3);
