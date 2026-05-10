/**
 * CounterController: A reactive controller demonstrating reusable logic.
 *
 * Encapsulates increment/decrement/reset logic that any component can use.
 */
import { ReactiveController, ReactiveControllerHost } from 'lit';

export class CounterController implements ReactiveController {
  host: ReactiveControllerHost;

  private _count = 0;

  get count() {
    return this._count;
  }

  constructor(host: ReactiveControllerHost, initialValue = 0) {
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

  // Lifecycle hooks — controllers can participate in the host's lifecycle
  hostConnected() {
    // Called when the host element is added to the DOM
    console.log('[CounterController] connected, count:', this._count);
  }

  hostDisconnected() {
    // Called when the host element is removed from the DOM
    console.log('[CounterController] disconnected');
  }
}
