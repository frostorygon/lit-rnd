/**
 * Page helpers — named state transitions extracted from the component.
 *
 * Each function takes the component instance and mutates its state.
 * The component calls these by name — the "how" lives here,
 * the "what/when" lives in the component.
 *
 * Why extract? So the component file is ONLY lifecycle + render.
 * A noob reads CardControlPage.js and sees the flow.
 * They only open this file if they need to know what "showError" actually does.
 */
import { getCardStatus, toggleCardStatus } from './services/card-service.js';

const trackPage = (name) => console.log(`[track] ${name}`);

/**
 * Initialize tracking. Called once on connect.
 */
export function initTracking() {
  trackPage('temp-hold-card');
}

/**
 * Load initial card status from API.
 * @param {LitElement} host
 */
export async function loadInitialStatus(host) {
  const { isBlocked, error } = await getCardStatus(host.cardId);

  if (error) {
    showError(host, error);
    return;
  }

  host.isCardBlocked = isBlocked;
  dismissLoading(host);
}

/**
 * Toggle card block/unblock via API.
 * @param {LitElement} host
 * @returns {Promise<boolean>} true if navigation should happen
 */
export async function handleToggle(host) {
  showLoading(host);

  const { isBlocked, error } = await toggleCardStatus(
    host.cardId, host.isCardBlocked, host.accountId,
  );

  host.isCardBlocked = isBlocked;

  if (error) {
    showError(host, error);
    return false;
  }

  dismissLoading(host);
  return true;
}

// ── State transitions ──────────────────────────────────

function showLoading(host) {
  host._isLoading = true;
  host._errorType = '';
}

function dismissLoading(host) {
  host._isLoading = false;
}

function showError(host, errorType) {
  host._errorType = errorType;
  host._isLoading = false;
}
