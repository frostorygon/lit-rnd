/**
 * B1-V5: Helpers Pattern (Maximum Separation)
 *
 * The component is ONLY lifecycle wiring + render.
 * ALL logic — even state transitions — lives in page-helpers.js.
 *
 * Structure:
 *   option-b1-v5-helpers/
 *   ├── CardControlPage.js              ← this file (~45 lines, pure wiring)
 *   ├── page-helpers.js                 ← orchestration + state transitions
 *   ├── CardControlScreen.template.js   ← template
 *   └── services/
 *       └── card-service.js             ← API + parsing + error typing
 *
 * Reading order for a new developer:
 *   1. CardControlPage.js  → "what happens and when" (the story)
 *   2. page-helpers.js     → "how each step works" (the details)
 *   3. card-service.js     → "how it talks to the API" (only if curious)
 *   4. template.js         → "how it looks" (only if touching UI)
 */
import { LitElement } from 'lit';
import { renderCardControl } from './CardControlScreen.template.js';
import { initTracking, loadInitialStatus, handleToggle } from './page-helpers.js';

export class CardControlPageV5 extends LitElement {
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
    initTracking();
  }

  async firstUpdated() {
    await loadInitialStatus(this);
  }

  async _handleToggle() {
    const shouldNavigate = await handleToggle(this);
    if (shouldNavigate) this._navigateNext();
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

customElements.define('card-control-v5', CardControlPageV5);
