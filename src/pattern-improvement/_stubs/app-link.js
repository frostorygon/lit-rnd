/**
 * Stub: <app-link>
 * Simulates a design system link component.
 */
import { LitElement, html, css } from 'lit';

export class AppLink extends LitElement {
  static styles = css`
    :host {
      display: inline;
    }

    a {
      color: #ff6200;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 500;
    }

    a:hover {
      color: #e55800;
    }
  `;

  render() {
    return html`<a href="#"><slot></slot></a>`;
  }
}

customElements.define('app-link', AppLink);
