/**
 * Cards API service — pure fetch wrappers.
 * No business logic, no navigation, no state.
 */

const API_ROOT = '/api/cards';

/**
 * @param {string} cardId
 * @param {string} accountId
 */
export async function blockCard(cardId, accountId) {
  const response = await fetchJson(`${API_ROOT}/block`, {
    method: 'POST',
    body: { cardId, accountId },
  });
  return response.body;
}

/**
 * @param {string} cardId
 * @param {string} accountId
 */
export async function unblockCard(cardId, accountId) {
  const response = await fetchJson(`${API_ROOT}/unblock`, {
    method: 'POST',
    body: { cardId, accountId },
  });
  return response.body;
}

/** @returns {Promise<{debitCards: Array}>} */
export async function getDebitCards() {
  const response = await fetchJson(`${API_ROOT}/debitcards`, {
    method: 'GET',
  });
  return response.body;
}

// Stub — in production this comes from your framework's HTTP layer
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
