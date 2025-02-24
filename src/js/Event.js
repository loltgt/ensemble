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

import Compo from './Compo.js';
import { l10n } from './locale.js';


/**
 * Event is an event dispatcher
 * 
 * It is a wrap around Event [DOM]
 *
 * @class
 * @example
 * new ensemble.Event('compo-namespace', 'mousewheel', node).add(callback, {capture: true});
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
   * @param {Element} node A valid Element node or compo
   */
  constructor(ns, name, node) {
    const ns0 = this.ns = `_${ns}`;

    node = (Compo.isCompo(node) ? node[ns] : node) || document;

    this.__Event = 0;
    this[ns0] = {name, node};
  }

  /**
   * Adds an event for this compo
   *
   * @see Element.addEventListener
   *
   * @param {function} func The function handler
   * @param {mixed} options An options Object or useCapture boolean
   */
  add(func, options = false) {
    const {node, name} = this[this.ns];
    node.addEventListener(name, func, options);
  }

  /**
   * Removes an event from this compo
   *
   * @see Element.removeElementListener
   *
   * @param {function} func The function handler
   */
  remove(func) {
    const {node, name} = this[this.ns];
    node.removeEventListener(name, func);
  }

  /**
   * Checks passed object is an ensemble Event instance
   *
   * @static
   * @returns {boolean}
   */
  static isEvent(obj) {
    return obj instanceof Event;
  }

}


export default Event;
