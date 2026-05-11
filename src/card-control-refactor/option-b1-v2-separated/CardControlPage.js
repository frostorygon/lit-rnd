/**
 * B1-V2: Separated Template
 *
 * Same as V1 but with the template extracted to its own file,
 * matching your team's existing convention (ErrorScreen → Error.template.js).
 *
 * Structure:
 *   option-b1-v2-separated/
 *   ├── CardControlPage.js              ← component (lifecycle + state, ~55 lines)
 *   ├── CardControlScreen.template.js   ← template (rendering, ~25 lines)
 *   └── services/
 *       └── card-service.js             ← same service as V1
 *
 * Why: Your team already separates templates for Error screens.
 * This applies the same convention here for consistency.
 */
import { LitElement } from 'lit';
import { renderCardControl } from './CardControlScreen.template.js';
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

export class CardControlPageV2 extends LitElement {
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

  // ✅ Template separated — render() is a one-liner
  render() {
    return renderCardControl({
      isCardBlocked: this.isCardBlocked,
      isLoading: this._isLoading,
      errorType: this._errorType,
      onToggle: () => this._handleToggle(),
    });
  }
}

customElements.define('card-control-v2', CardControlPageV2);
