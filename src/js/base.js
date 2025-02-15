/**
 * ensemble base
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports base
 */

import Compo from './Compo.js';
import Data from './Data.js';
import Event from './Event.js';


/**
 * A base class for ensemble components
 *
 * @class
 * @abstract
 * @param {Element} [element] A valid element, could be used within the extending class
 * @param {object} options Options object
 * @example
 * new base([, element], options)
 */
class base {

  /**
   * Constructor method
   */
  constructor() {
    let element, options;

    if (arguments.length > 1) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    }

    if (options && typeof options != 'object') {
      throw new TypeError('Passed argument "options" is not an Object.');
    }
    if (element && typeof element != 'object') {
      throw new TypeError('Passed argument "element" is not an Object.');
    }

    this._bindings();

    this.options = this.defaults(this._defaults(), options);
    Object.freeze(this.options);

    this.element = element;
  }

  /**
   * Creates an options Object from a defaults object of pre-defined properties
   * 
   * Note: Supports only the first level depth.
   *
   * @param {object} defaults The default options Object
   * @param {object} options An options Object to extends
   * @returns {object}
   */
  defaults(defaults, options) {
    const obj = {};

    for (const key in defaults) {
      if (defaults[key] != null && typeof defaults[key] == 'object') {
        obj[key] = Object.assign(defaults[key], options[key]);
      } else {
        obj[key] = typeof options[key] != 'undefined' ? options[key] : defaults[key];
      }
    }

    return obj;
  }

  /**
   * Shorthand method for ensemble.Compo class
   *
   * When passed the first argument it makes a new Compo instance, 
   * otherwise it returns a reference to the Compo class.
   *
   * @param {string} ns Composition namespace
   * @param {string} [tag='div'] The [DOM] Element node tag or component name, empty for ensemble.Compo class reference
   * @param {mixed} [name] The composition name, used for CSS className
   * @returns {mixed} Instance of ensemble.Data or ensemble.Data class reference
   */
  compo(tag, name, props) {
    return tag != undefined ? new Compo(this.options.ns, tag, name, props) : Compo;
  }

  /**
   * Shorthand method for ensemble.Data class
   *
   * When passed the first argument it makes a new Data instance, 
   * otherwise it returns a reference to the Data class.
   *
   * @param {object} obj A starter Object, empty for ensemble.Data class reference
   * @returns {mixed} Instance of ensemble.Data or ensemble.Data class reference
   */
  data(obj) {
    return obj != undefined ? new Data(this.options.ns, obj) : Data;
  }

  /**
   * Shorthand method for ensemble.Event class
   *
   * When the passed first argument is a string it makes a new Event instance, 
   * if you pass an Event as the first argument, a preventDefault and blur will be performed, 
   * otherwise it returns a reference to the Event class.
   *
   * @param {object} obj A starter Object, empty for ensemble.Event class reference
   * @returns {mixed}
   */
  event(event, node) {
    if (typeof event == 'string') {
      return new Event(this.options.ns, event, node);
    } else if (event) {
      event.preventDefault();
      event.target.blur();
    } else {
      return Event;
    }
  }

  /**
   * Shortcut to querySelectorAll() and querySelector() [DOM]
   *
   * @see Element.querySelectorAll()
   * @see Element.querySelector()
   *
   * @param {string} query A text query
   * @param {Element} node An Element node where find
   * @param {boolean} all Find single or multiple elements
   * @return {mixed} Element or ElementCollection
   */
  selector(query, node, all = false) {
    node = node || document;

    return all ? node.querySelectorAll(query) : node.querySelector(query);
  }

  /**
   * Shortcut to appendChild() [DOM]
   *
   * @see Element.appendChild()
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to append
   * @returns {boolean}
   */
  appendNode(parent, node) {
    return !! parent.appendChild(node);
  }

  /**
   * Shortcut to prependChild() [DOM]
   *
   * @see Element.prependChild()
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to prepend
   * @returns {boolean}
   */
  prependNode(parent, node) {
    return !! parent.prependChild(node);
  }

  /**
   * Shortcut to cloneNode() [DOM]
   *
   * @see Element.removeNode()
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to remove
   * @returns {boolean}
   */
  removeNode(root, node) {
    return !! root.removeChild(node);
  }

  /**
   * Shortcut to Element.cloneNode() [DOM]
   *
   * @see Element.cloneNode()
   *
   * @param {Element} node An Element node to clone
   * @param {boolean} deep Clone also all children of the Element node
   * @returns {boolean}
   */
  cloneNode(node, deep = false) {
    return node.cloneNode(deep);
  }

  /**
   * Shortcut to Element.hasAttribute() [DOM]
   *
   * @see Element.hasAttribute()
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @returns {boolean}
   */
  hasAttr(node, attr) {
    return node.hasAttribute(attr);
  }

  /**
   * Shortcut to Element.getAttribute() [DOM]
   *
   * @see Element.getAttribute()
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @returns {string}
   */
  getAttr(node, attr) {
    return node.getAttribute(attr);
  }

  /**
   * Shortcut to Element.setAttribute() [DOM]
   *
   * @see Element.setAttribute()
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @param {string} value The value
   */
  setAttr(node, attr, value) {
    node.setAttribute(attr, value);
  }

  /**
   * Shortcut to Element.removettribute() [DOM]
   *
   * @see Element.removeAttribute()
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   */
  delAttr(node, attr) {
    node.removeAttribute(attr);
  }

  /**
   * Creates a proxy function with bindings to instance and optionally an event
   *
   * @param {function} method A method from the current instance
   * @returns {function}
   * @todo untrusted method
   */
  binds(method) {
    const self = this;

    return function(event) { method.call(self, event, this); }
  }

  /**
   * Provides a delay and executes a callback function
   *
   * @see window.setTimeout()
   *
   * @param {function} func A function callback
   * @param {mixed} node An Element node or an ensemble.Compo composition
   * @param {int} time Default delay time in milliseconds
   */
  delay(func, node, time) {
    const delay = node ? this.timing(node) : 0;

    setTimeout(func, delay || time);
  }

  /**
   * Calculates a time, based on a time property of the style of an element
   *
   * @see window.getComputedStyle()
   *
   * @param {mixed} node An Element node or an ensemble.Compo composition
   * @param {string} prop A style property
   * @returns {int} time Delay time in milliseconds
   */
  timing(node, prop = 'transitionDuration') {
    let time = Compo.isCompo(node) ? node.getStyle(prop) : window.getComputedStyle(node)[prop];

    if (time) {
      time = time.indexOf('s') ? (parseFloat(time) * 1e3) : parseInt(time);
    }

    return time || 0;
  }

}


export default base;
