/*!
 * loltgt ensemble.Event
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Event
 */

import Compo from './Compo.js';

/**
 * @borrows Symbol as _Symbol
 * @todo backward compatibility
 */
const _Symbol = typeof Symbol == 'undefined' ? 0 : Symbol;


/**
 * Event is an event manager.
 * 
 * It is a wrapper around the native Event [DOM].
 *
 * @example
 * new ensemble.Event('namespace-of-my-foo-component', 'mousewheel', node).add(func, { capture: true });
 * @class
 */
class Event {

  /**
   * Constructor method.
   *
   * @see Element.addEventListener()
   * @see Element.removeElementListener()
   *
   * //global ensemble.Compo
   * @constructs
   * @param {string} ns - Event namespace
   * @param {string} name - The [DOM] Event type name
   * @param {Element} node - A valid Element node -or- component
   */
  constructor(ns, name, node) {
    if (! new.target) {
      throw 'ensemble error: Bad invocation, must be called with new.';
    }

    const _ns = this._ns = '_' + ns;

    node = (Compo.isCompo(node) ? node.node : node) || document;

    //TODO
    this.__Event = true;
    this[_ns] = { name, node };
  }

  /**
   * Adds an event for this composition.
   *
   * @see Element.addEventListener()
   *
   * @param {function} handle - The function handler
   * @param {mixed} options - An options Object -or- useCapture boolean
   */
  add(handle, options = false) {
    this[this._ns].node.addEventListener(this[this._ns].name, handle, options);
  }

  /**
   * Removes an event from this composition.
   *
   * @see Element.removeElementListener()
   *
   * @param {function} handle - The function handler
   * @todo ? removes handle ref.
   */
  remove(handle) {
    this[this._ns].node.removeEventListener(this[this._ns].name, handle);
  }

  /**
   * Check if passed object is an ensemble.Event instance.
   *
   * @static
   * @returns {boolean}
   * @todo backward compatibility
   */
  static isEvent(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Event.prototype);
    else return obj && typeof obj == 'object' && '__Event' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble.Event class.
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   * @todo return undef
   * @todo backward compatibility
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Event';
  }

}


export default Event;