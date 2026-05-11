export const CARD_ERRORS = {
  GENERIC: 'somethingWentWrong',
  UNABLE_TO_HOLD: 'unableToHoldCard',
  UNABLE_TO_UNHOLD: 'unableToTakeOffHoldCard',
};

/**
 * Option B.3: Class-Based Service (Stateful / Configurable)
 * 
 * By using an ES6 class, the service can hold internal state (like a cache)
 * and accept dependencies (like a mock HTTP client) via the constructor.
 */
export class CardService {
  /**
   * @param {object} httpClient - Allows dependency injection for tests
   */
  constructor(httpClient = null) {
    this.http = httpClient || { fetchJson: (...args) => fetchJson(...args) };
    this.API_ROOT = '/api/cards';

    // Internal cache to prevent duplicate fetching
    this._cardsCache = null;
  }

  /**
   * Fetches debit cards, utilizing an internal cache.
   */
  async _getCardsList() {
    if (this._cardsCache) return this._cardsCache;
    
    const response = await this.http.fetchJson(`${this.API_ROOT}/debitcards`, { method: 'GET' });
    this._cardsCache = response.body || response;
    return this._cardsCache;
  }

  async getCardStatus(cardId) {
    try {
      const { debitCards = [] } = await this._getCardsList();
      const matchedCard = debitCards.find(card => card.id === cardId);

      if (!matchedCard || !Array.isArray(matchedCard.actionGroups)) {
        return { isBlocked: null, error: CARD_ERRORS.GENERIC };
      }

      const manageGroup = matchedCard.actionGroups.find(group => group.id === 'MANAGE');
      const availableRels = manageGroup?.actions?.map(a => a.rel) || [];

      if (availableRels.includes('unblock')) return { isBlocked: true, error: null };
      if (availableRels.includes('block')) return { isBlocked: false, error: null };

      return { isBlocked: null, error: CARD_ERRORS.GENERIC };
    } catch (err) {
      return { isBlocked: null, error: CARD_ERRORS.GENERIC };
    }
  }

  async toggleCardStatus(cardId, isCurrentlyBlocked, accountId) {
    const endpoint = isCurrentlyBlocked ? 'unblock' : 'block';

    try {
      await this.http.fetchJson(`${this.API_ROOT}/${endpoint}`, {
        method: 'POST',
        body: { cardId, accountId },
      });
      return { isBlocked: !isCurrentlyBlocked, error: null };
    } catch (err) {
      if (err.message && err.message.includes('status 422')) {
        const errorType = isCurrentlyBlocked ? CARD_ERRORS.UNABLE_TO_UNHOLD : CARD_ERRORS.UNABLE_TO_HOLD;
        return { isBlocked: isCurrentlyBlocked, error: errorType };
      }
      return { isBlocked: isCurrentlyBlocked, error: CARD_ERRORS.GENERIC };
    }
  }
}

// Stub — in production this comes from your framework
async function fetchJson(url, options) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return { body: await res.json() };
}

// Export a singleton instance for normal use
export const cardService = new CardService();
