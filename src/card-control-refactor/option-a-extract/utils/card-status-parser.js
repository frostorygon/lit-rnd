/**
 * Extracted parsing logic from the component.
 * Pure functions — no side effects, no navigation, fully testable.
 */

/**
 * Parse debit cards response to determine card block status.
 *
 * @param {{debitCards: Array}} response - API response from getDebitCards
 * @param {string} cardId - Card to look up
 * @returns {'block'|'unblock'|null} Current status, or null if not found
 */
export function parseCardStatus(response, cardId) {
  const { debitCards = [] } = response;
  const matchedCard = debitCards.find((card) => card.id === cardId);

  if (!matchedCard || !Array.isArray(matchedCard.actionGroups)) {
    return null;
  }

  const manageGroup = matchedCard.actionGroups.find(
    (group) => group.id === 'MANAGE',
  );
  const actions = manageGroup?.actions ?? [];

  const hasBlock = actions.some((action) => action.rel === 'block');
  const hasUnblock = actions.some((action) => action.rel === 'unblock');

  // Returns the opposite of the available action (available = what you CAN do)
  if (hasBlock) return 'unblock';
  if (hasUnblock) return 'block';

  return null;
}

/**
 * Classify an API error into a user-facing error type.
 *
 * @param {Error} err
 * @param {boolean} isCardBlocked - Current card state
 * @returns {string} Error type key
 */
export function classifyError(err, isCardBlocked) {
  if (err.status === 422) {
    return isCardBlocked ? 'unableToTakeOffHold' : 'unableToHold';
  }
  return 'somethingWentWrong';
}
