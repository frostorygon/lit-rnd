/**
 * Card Service — B1's { isBlocked, error } pattern with bug fixes.
 *
 * Changes from B1's service:
 *   - err.status === 422 instead of string matching
 *   - CARD_ERRORS exported as frozen object
 *   - Sanitized API URLs
 */

const API_ROOT = '/api/cards';

export const CARD_ERRORS = Object.freeze({
  GENERIC: 'somethingWentWrong',
  UNABLE_TO_HOLD: 'unableToHoldCard',
  UNABLE_TO_UNHOLD: 'unableToTakeOffHoldCard',
});

/**
 * @param {string} cardId
 * @returns {Promise<{isBlocked: boolean|null, error: string|null}>}
 */
export async function getCardStatus(cardId) {
  try {
    const response = await fetchJson(`${API_ROOT}/debitcards`, { method: 'GET' });
    const { debitCards = [] } = response.body || response;
    const matchedCard = debitCards.find((card) => card.id === cardId);

    if (!matchedCard || !Array.isArray(matchedCard.actionGroups)) {
      return { isBlocked: null, error: CARD_ERRORS.GENERIC };
    }

    const manageGroup = matchedCard.actionGroups.find((g) => g.id === 'MANAGE');
    const availableRels = manageGroup?.actions?.map((a) => a.rel) || [];

    if (availableRels.includes('unblock')) return { isBlocked: true, error: null };
    if (availableRels.includes('block')) return { isBlocked: false, error: null };

    return { isBlocked: null, error: CARD_ERRORS.GENERIC };
  } catch {
    return { isBlocked: null, error: CARD_ERRORS.GENERIC };
  }
}

/**
 * @param {string} cardId
 * @param {boolean} isCurrentlyBlocked
 * @param {string} accountId
 * @returns {Promise<{isBlocked: boolean, error: string|null}>}
 */
export async function toggleCardStatus(cardId, isCurrentlyBlocked, accountId) {
  const endpoint = isCurrentlyBlocked ? 'unblock' : 'block';

  try {
    await fetchJson(`${API_ROOT}/${endpoint}`, {
      method: 'POST',
      body: { cardId, accountId },
    });
    return { isBlocked: !isCurrentlyBlocked, error: null };
  } catch (err) {
    // ✅ FIX: check status code, not string
    if (err.status === 422) {
      const errorType = isCurrentlyBlocked
        ? CARD_ERRORS.UNABLE_TO_UNHOLD
        : CARD_ERRORS.UNABLE_TO_HOLD;
      return { isBlocked: isCurrentlyBlocked, error: errorType };
    }
    return { isBlocked: isCurrentlyBlocked, error: CARD_ERRORS.GENERIC };
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
