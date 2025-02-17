/**
 * ensemble Event
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Event
 */

import _Symbol from './_Symbol.js';
import Compo from './Compo.js';


/**
 * Event is an event manager
 * 
 * It is a wrap around Event [DOM]
 *
 * @class
 * @example
 * new ensemble.Event('component-namespace', 'mousewheel', node).add(callback, {capture: true});
 */
class Event {

  /**
   * Constructor method
   *
   * @see Element.addEventListener
   * @see Element.removeElementListener
   *
   * @constructs
   * @param {string} ns Event namespace
   * @param {string} name Event type name
   * @param {Element} node A valid Element node or component
   */
  constructor(ns, name, node) {
    if (! new.target) {
      throw 'Bad invocation. Must be called with `new`.';
    }

    const ns0 = this.ns = '_' + ns;

    node = (Compo.isCompo(node) ? node.node : node) || document;

    this.__Event = true;
    this[ns0] = {name, node};
  }

  /**
   * Adds an event for this composition
   *
   * @see Element.addEventListener
   *
   * @param {function} handle The function handler
   * @param {mixed} options An options Object or useCapture boolean
   */
  add(handle, options = false) {
    const ns = this.ns, e = this[ns], node = e.node, name = e.name;
    node.addEventListener(name, handle, options);
  }

  /**
   * Removes an event from this composition
   *
   * @see Element.removeElementListener
   *
   * @param {function} handle The function handler
   */
  remove(handle) {
    const ns = this.ns, e = this[ns], node = e.node, name = e.name;
    node.removeEventListener(name, handle);
  }

  /**
   * Checks passed object is an ensemble Event instance
   *
   * @static
   * @returns {boolean}
   */
  static isEvent(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Event.prototype);
    else return obj && typeof obj == 'object' && '__Event' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble Event class
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Event';
  }

}


export default Event;
