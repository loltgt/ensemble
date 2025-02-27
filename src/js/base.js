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
   * Constructor method
   *
   * @constructs
   * @param {Element} [element] An optional valid Element node
   * @param {object} options Options object
   */
  constructor() {
    const args = arguments;
    let element, options;

    if (args.length > 1) {
      element = args[0];
      options = args[1];
    //TODO nodeType
    } else if (args[0] && typeof args[0] == 'object' && args[0].nodeType) {
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
   * @param {string} name A valid Event name
   * @param {Element} node An Element node
   * @returns {mixed} Instance of Event or Event class reference
   */
  event(name, node) {
    const ns = this.options.ns;
    return name != undefined ? new Event(ns, name, node) : Event;
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
   * Util to create an icon
   *
   * @param {string} type Icons type: font, svg, symbol, shape
   * @param {string} name Icon name
   * @param {string} prefix Icon prefix, CSS class name
   * @param {string} path Icon SVG path or SVG image src
   * @param {string} hash Icon SVG symbol href or SVG image src hash
   */
  icon(type, name, prefix, path, hash) {
    const ns = this.options.ns;
    const className = prefix ? `${prefix}-${name}` : name;
    const icon = this.compo('span', 'icon', {className});

    if (type != 'font') {
      if (type == 'symbol' || type == 'path') {
        const svgNsUri = 'http://www.w3.org/2000/svg';
        const svg = new Compo(ns, 'svg', false, false, false, svgNsUri);
        const node = new Compo(ns, type, false, false, false, svgNsUri);

        if (type == 'symbol') {
          node.setAttr('href', `#${name}`);
        } else {
          node.setAttr('d', path);
        }
        svg.append(node);

        icon.append(svg);
      //TODO check origin ?
      } else if (type == 'svg' && path && hash) {
        const img = new compo(ns, 'img', false, {
          'src': `${path}#${hash}`
        });
        icon.append(img);
      }
    }

    return icon;
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
    let time = Compo.isCompo(node) ? node.getStyle(prop) : getComputedStyle(node)[prop];

    if (time) {
      time = time.indexOf('s') ? (parseFloat(time) * 1e3) : parseInt(time);
    }

    return time || 0;
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

}


export default base;
