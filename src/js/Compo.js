/**
 * ensemble Compo
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Compo
 */

import _Symbol from './_Symbol.js';
import _composition from './_composition.js';


const REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
const REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
const DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;


/**
 * Compo is a composition element with shorthand methods and utils
 * 
 * It is a wrap around Element node [DOM]
 * It could be used as base for abstraction of a custom component element.
 *
 * @class
 * @extends _composition
 * @inheritdoc
 * @example
 * new ensemble.Compo('compo-namespace', 'div', 'compo-name', {id: 'compo-id', tabIndex: 1});
 */
class Compo extends _composition {

  /**
   * Constructor method
   *
   * @constructs
   * @constant {RegExp} REJECTED_TAG_NAMES Regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS Regular expression for rejected tag
   * @constant {RegExp} DENIED_PROPS Regular expression for denied properties
   * @param {string} ns Component namespace
   * @param {string} [tag='div'] The Element node name or component name
   * @param {string[]} [name] The composition name, used for CSS className
   * @param {object} [props] Properties for composition
   * @param {object} [options] An optional ElementCreationOptions object
   * @param {object} [elementNS] Options for namespaced Element node
   * @param {string} [elementNS.namespaceURI] A valid namespace URI
   * @param {string} [elementNS.qualifiedName] A valid qualified name
   */
  constructor(ns, tag, name, props, options, elementNS) {
    if (! new.target) {
      throw 'Bad invocation. Must be called with `new`.';
    }

    super();

    const ns0 = this.ns = '_' + ns;
    const nodeName = tag ? tag.toString() : 'div';

    if (REJECTED_TAG_NAMES.test(nodeName)) {
      throw new Error('Provided node name is not a valid name.');
    }

    const el = this[ns0] = this._element(ns, nodeName, name, props, options, elementNS);

    this.__Compo = true;
    this[ns0].__compo = this;

    if (props && typeof props == 'object') {
      for (const prop in props) {
        const p = prop.toString();

        if (DENIED_PROPS.test(p)) {
          throw new Error('Provided property name is not a valid name.');
        }
        //TODO dataset
        if (p.indexOf('on') === 0 && props[p] && typeof props[p] == 'function') {
          el[p] = props[p].bind(this);
        } else if (typeof props[p] != 'object') {
          el[p] = props[p];
        } else if (p == 'children') {
          if (typeof props[p] == 'object' && props[p].length) {
            for (const child of props.children) {
              const tag = child.tag;
              const name = child.name;
              const props = child.props;

              this.append(new Compo(ns, tag, name, props));
            }
          }
        }
      }
    }

    if (name) {
      const nodeClass = el.className;

      el.className = '';

      if (typeof name == 'string') {
        el.className = ns + '-' + name;
      } else if (typeof name == 'object') {
        el.className = name.map((a) => (ns + '-' + a)).join(' ');
      }

      if (nodeClass) {
        el.className += ' ' + nodeClass;
      }
    }

    this._render();
  }

  /**
   * Element wrapper
   *
   * @see document.createElement
   * @see document.createElementNS
   *
   * @param {string} ns Component namespace
   * @param {string} tag The Element node name or component name
   * @param {string} name Name for composition, used for CSS className
   * @param {object} props Properties for composition
   * @param {object} [options] An optional ElementCreationOptions object
   * @param {object} [elementNS] Options for namespaced Element node
   * @param {string} [elementNS.namespaceURI] A valid namespace URI
   * @param {string} [elementNS.qualifiedName] A valid qualified name
   */
  _element(ns, tag, name, props, options, elementNS) {
    if (elementNS) return document.createElementNS(tag, [...elementNS, ...options]);
    else return document.createElement(tag, options);
  }

  /**
   * Checks for an attribute of this composition
   *
   * @see Element.hasAttribute
   *
   * @param {string} attr An attribute
   * @returns {boolean}
   */
  hasAttr(attr) {
    const ns = this.ns, el = this[ns];
    return el.hasAttribute(attr);
  }

  /**
   * Gets an attribute from this composition
   *
   * @see Element.getAttribute
   *
   * @param {string} attr An attribute
   * @returns {string}
   */
  getAttr(attr) {
    const ns = this.ns, el = this[ns];
    return el.getAttribute(attr);
  }

  /**
   * Sets an attribute in this composition
   *
   * @see Element.setAttribute
   *
   * @param {string} attr An attribute
   * @param {string} value The value
   */
  setAttr(attr, value) {
    const ns = this.ns, el = this[ns];
    el.setAttribute(attr, value);
  }

  /**
   * Removes an attribute from this composition
   *
   * @see Element.removeAttribute
   *
   * @param {string} attr An attribute
   */
  delAttr(attr) {
    const ns = this.ns, el = this[ns];
    el.removeAttribute(attr);
  }

  /**
   * Gets a current style property
   *
   * @see window.getComputedStyle
   *
   * @param {string} prop A style property
   * @returns {mixed}
   */
  getStyle(prop) {
    const ns = this.ns, el = this[ns];
    return window.getComputedStyle(el)[prop];
  }

  /**
   * Shows this composition
   */
  show() {
    const ns = this.ns, el = this[ns];
    el.hidden = false;
  }

  /**
   * Hides this composition
   */
  hide() {
    const ns = this.ns, el = this[ns];
    el.hidden = true;
  }

  /**
   * Util to set attribute disabled to true
   */
  enable() {
    const ns = this.ns, el = this[ns];
    el.disabled = false;
  }

  /**
   * Util to set attribute disabled to false
   */
  disable() {
    const ns = this.ns, el = this[ns];
    el.disabled = true;
  }

  /**
   * Getter for node property, the Element node in this composition
   *
   * Note: Direct access to the node is discouraged.
   *
   * @var {getter}
   * @returns {Element}
   */
  get node() {
    console.warn('Direct access to the node is discouraged.');

    return this[this.ns];
  }

  /**
   * Getter for parent property, the parent compo of this composition
   *
   * @var {getter}
   * @returns {Compo}
   */
  get parent() {
    const ns = this.ns, el = this[ns];
    return el.parentElement && '__compo' in el.parentElement ? el.parentElement.__compo : null;
  }

  /**
   * Getter for previous property, the previous sibling of this composition
   *
   * @var {getter}
   * @returns {Compo}
   */
  get previous() {
    const ns = this.ns, el = this[ns];
    return el.previousElementSibling ? el.previousElementSibling.__compo : null;
  }

  /**
   * Getter for next property, the next sibling of this composition
   *
   * @var {getter}
   * @returns {Compo}
   */
  get next() {
    const ns = this.ns, el = this[ns];
    return el.nextElementSibling ? el.nextElementSibling.__compo : null;
  }

  /**
   * Getter for classList property, the classList of the Element node in this composition
   *
   * @see DOMTokenList
   *
   * @var {getter}
   * @returns {DOMTokenList}
   */
  get classList() {
    const ns = this.ns, el = this[ns];
    return el.classList;
  }

  /**
   * Checks passed object is an ensemble Compo instance
   *
   * @static
   * @returns {boolean}
   */
  static isCompo(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Compo.prototype);
    else return obj && typeof obj == 'object' && '__Compo' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble Compo class
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Compo';
  }

}


export default Compo;
