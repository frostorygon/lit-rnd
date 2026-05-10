/**
 * CounterController: A reactive controller demonstrating reusable logic.
 *
 * Plain JS — no TypeScript needed. Works identically to the TS version.
 */

export class CounterController {
  /** @type {import('lit').ReactiveControllerHost} */
  host;

  _count = 0;

  get count() {
    return this._count;
  }

  /**
   * @param {import('lit').ReactiveControllerHost} host
   * @param {number} [initialValue=0]
   */
  constructor(host, initialValue = 0) {
    (this.host = host).addController(this);
    this._count = initialValue;
  }

  increment() {
    this._count++;
    this.host.requestUpdate();
  }

  decrement() {
    this._count = Math.max(0, this._count - 1);
    this.host.requestUpdate();
  }

  reset() {
    this._count = 0;
    this.host.requestUpdate();
  }

  hostConnected() {
    console.log('[CounterController] connected, count:', this._count);
  }

  hostDisconnected() {
    console.log('[CounterController] disconnected');
  }
}
