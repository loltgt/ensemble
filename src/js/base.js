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
import { l10n } from './locale.js';


/**
 * The base class for ensemble components
 *
 * @class
 */
class base {

  /**
   * Default properties
   *
   * @virtual
   * @returns {object}
   */
  // defaults() { return {}; }

  /**
   * Methods binding
   *
   * @virtual
   */
  // binds() {}

  /**
   * Constructor method
   *
   * @constructs
   * @param {Element} [element] A valid element
   * @param {object} options Options object
   */
  constructor() {
    const args = arguments;
    let element, options;

    if (args.length > 1) {
      element = args[0];
      options = args[1];
    //TODO nodeType
    } else if ('nodeType' in args[0] && !! args[0].nodeType) {
      element = args[0];
    } else {
      options = args[0];
    }

    if (options && typeof options != 'object') {
      throw new TypeError(l10n.EOPTS);
    }
    if (element && typeof element != 'object') {
      throw new TypeError(l10n.EELEM);
    }

    this.binds();

    this.options = this.opts(this.defaults(), options);
    Object.freeze(this.options);

    this.element = element;
  }

  /**
   * Creates an options Object from a defaults object
   * 
   * Note: Supports only first level depth.
   *
   * @param {object} defaults The default options Object
   * @param {object} options An options Object to extend defaults
   * @returns {object}
   */
  opts(defaults, options = {}) {
    const opts = {};

    for (const key in defaults) {
      if (defaults[key] != null && typeof defaults[key] == 'object') {
        opts[key] = Object.assign(defaults[key], options[key]);
      } else {
        opts[key] = typeof options[key] != 'undefined' ? options[key] : defaults[key];
      }
    }

    return opts;
  }

  /**
   * Shorthand method for ensemble Compo class
   *
   * When passed the first argument, makes a new Compo instance 
   * otherwise returns a reference to the Compo class.
   *
   * @param {string} [tag='div'] The Element node name or compo name, empty for Compo class reference
   * @param {mixed} [name] The compo name, used for CSS className
   * @returns {mixed} Instance of Compo or Compo class reference
   */
  compo(tag, name, props) {
    const ns = this.options.ns;
    return tag != undefined ? new Compo(ns, tag, name, props) : Compo;
  }

  /**
   * Shorthand method for ensemble Data class
   *
   * When passed the first argument, makes a new Data instance 
   * otherwise returns a reference to the Data class.
   *
   * @param {object} obj A starter Object, empty for Data class reference
   * @returns {mixed} Instance of Data or Data class reference
   */
  data(obj) {
    const ns = this.options.ns;
    return obj != undefined ? new Data(ns, obj) : Data;
  }

  /**
   * Shorthand method for ensemble Event class
   *
   * When the passed first argument is a string makes a new Event instance 
   * otherwise it returns a reference to the Event class.
   * 
   * Passing an Event instance as the first argument, 
   * event preventDefault() and blur() will be performed.
   *
   * @param {string|Event} event A valid Event name or Event instance
   * @param {Element} node An Element node
   * @returns {mixed} Instance of Event or Event class reference
   */
  event(event, node) {
    if (typeof event == 'string') {
      return new Event(this.options.ns, event, node);
    } else if (event) {
      event.preventDefault();
      //TODO delay
      event.target.blur();
    } else {
      return Event;
    }
  }

  /**
   * Shorthand for querySelectorAll and querySelector [DOM]
   *
   * @see Element.querySelectorAll
   * @see Element.querySelector
   *
   * @param {string} query Text query
   * @param {Element} node An Element node where find
   * @param {boolean} all Find multiple elements
   * @return {mixed} Element or ElementCollection
   */
  selector(query, node, all = false) {
    node = node || document;

    return all ? node.querySelectorAll(query) : node.querySelector(query);
  }

  /**
   * Shorthand for Element.appendChild [DOM]
   *
   * @see Element.appendChild
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to append
   * @returns {boolean}
   */
  appendNode(parent, node) {
    return !! parent.appendChild(node);
  }

  /**
   * Shorthand for Element.prependChild [DOM]
   *
   * @see Element.prependChild
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to prepend
   * @returns {boolean}
   */
  prependNode(parent, node) {
    return !! parent.prependChild(node);
  }

  /**
   * Shorthand for Element.removeNode [DOM]
   *
   * @see Element.removeNode
   *
   * @param {Element} parent An Element parent
   * @param {Element} node An Element node to remove
   * @returns {boolean}
   */
  removeNode(root, node) {
    return !! root.removeChild(node);
  }

  /**
   * Shorthand for Element.cloneNode [DOM]
   *
   * @see Element.cloneNode
   *
   * @param {Element} node An Element node to clone
   * @param {boolean} deep Clone the whole Element node tree
   * @returns {boolean}
   */
  cloneNode(node, deep = false) {
    return node.cloneNode(deep);
  }

  /**
   * Shorthand for Element.hasAttribute [DOM]
   *
   * @see Element.hasAttribute
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @returns {boolean}
   */
  hasAttr(node, attr) {
    return node.hasAttribute(attr);
  }

  /**
   * Shorthand for Element.getAttribute [DOM]
   *
   * @see Element.getAttribute
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @returns {string}
   */
  getAttr(node, attr) {
    return node.getAttribute(attr);
  }

  /**
   * Shorthand for Element.setAttribute [DOM]
   *
   * @see Element.setAttribute
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   * @param {string} value The value
   */
  setAttr(node, attr, value) {
    node.setAttribute(attr, value);
  }

  /**
   * Shorthand for Element.removeAttribute [DOM]
   *
   * @see Element.removeAttribute
   *
   * @param {Element} node An Element node
   * @param {string} attr An attribute
   */
  delAttr(node, attr) {
    node.removeAttribute(attr);
  }

  /**
   * Gets the time from a style property of an element
   *
   * @see window.getComputedStyle
   *
   * @param {mixed} node An Element node or a compo
   * @param {string} prop A style property
   * @returns {int} time Delay time in milliseconds
   */
  styleTime(node, prop) {
    let time = Compo.isCompo(node) ? node.getStyle(prop) : window.getComputedStyle(node)[prop];

    if (time) {
      time = time.indexOf('s') ? (parseFloat(time) * 1e3) : parseInt(time);
    }

    return time || 0;
  }

  /**
   * Creates a proxy function to the instance
   *
   * @param {function} method A method from the current instance
   * @returns {function}
   */
  wrap(method) {
    const self = this;

    if (this[method] && typeof method != 'function') {
      throw new TypeError(l10n.EMETH);
    }

    return function(event) { method.call(self, event, this); }
  }

  /**
   * Provides a delay with callback function
   *
   * @see window.setTimeout
   *
   * @param {function} func A callback function
   * @param {mixed} node An Element node or a compo
   * @param {int} time Default delay time in milliseconds
   */
  delay(func, node, time) {
    const delay = node ? this.styleTime(node, 'transitionDuration') : 0;

    setTimeout(func, delay || time);
  }

}


export default base;
