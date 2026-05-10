import { fixture, html, expect } from '@open-wc/testing';

// Import from JS source (no build needed for tests)
import '../src/js/components/my-greeting.js';

describe('MyGreeting', () => {
  it('renders with default name', async () => {
    const el = await fixture(html`<my-greeting></my-greeting>`);
    const h2 = el.shadowRoot.querySelector('h2');
    expect(h2.textContent).to.equal('Hello, World!');
  });

  it('renders with a custom name attribute', async () => {
    const el = await fixture(html`<my-greeting name="Lit"></my-greeting>`);
    const h2 = el.shadowRoot.querySelector('h2');
    expect(h2.textContent).to.equal('Hello, Lit!');
  });

  it('starts with count 0', async () => {
    const el = await fixture(html`<my-greeting></my-greeting>`);
    expect(el.count).to.equal(0);
  });

  it('increments count on button click', async () => {
    const el = await fixture(html`<my-greeting></my-greeting>`);
    const btn = el.shadowRoot.querySelector('button');
    btn.click();
    await el.updateComplete;
    expect(el.count).to.equal(1);
    expect(el.shadowRoot.querySelector('p').textContent).to.equal('Click count: 1');
  });

  it('dispatches count-changed event', async () => {
    const el = await fixture(html`<my-greeting></my-greeting>`);
    let detail = null;
    el.addEventListener('count-changed', (e) => {
      detail = e.detail;
    });

    el.shadowRoot.querySelector('button').click();
    expect(detail).to.deep.equal({ count: 1 });
  });
});
