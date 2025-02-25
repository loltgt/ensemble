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
   * Prevents the default event action for Event
   *
   * @see Event.preventDefault
   *
   * @static
   * @param {Event} event An Event
   */
  static prevent(event) {
    event.preventDefault();
  }

  /**
   * Performs focus on event target
   *
   * @see HTMLElement.focus
   *
   * @static
   * @param {Event} event An Event
   * @param {object} options Options for focus
   */
  static focus(event, options) {
    const {currentTarget} = event;
    currentTarget && currentTarget.focus(options);
  }

  /**
   * Performs blur on event target
   *
   * @see HTMLElement.blur
   *
   * @static
   * @param {Event} event An Event
   */
  static blur(event) {
    const {currentTarget} = event;
    currentTarget && currentTarget.blur();
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
