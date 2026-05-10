/**
 * Slot scaffold template for ErrorScreen.
 *
 * Defines the layout structure with named slots.
 * The CONSUMER fills the slots with actual content.
 *
 * This template has zero logic — it's pure structure.
 */
import { html } from 'lit';

export function renderErrorScreen() {
  return html`
    <lottie-player autoplay></lottie-player>
    <slot name="heading"></slot>
    <slot name="description"></slot>
    <slot name="notification"></slot>
    <slot name="action"></slot>
  `;
}
