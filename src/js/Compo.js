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
 * Compo is a composition element with shorthands method and utils
 * 
 * It is a wrap around an Element node [DOM]
 * It could be used as base for abstraction of a custom component element.
 *
 * @class
 * @extends _composition
 * @inheritdoc
 * @example
 * new ensemble.Compo('component-namespace', 'div', 'foo', {id: 'fooDiv', tabIndex: 1});
 */
class Compo extends _composition {

  /**
   * Constructor method
   *
   * @constructs
   * @constant {RegExp} REJECTED_TAG_NAMES A regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS A regular expression for rejected tag
   * @constant {RegExp} DENIED_PROPS A regular expression for denied properties
   * @param {string} ns Component namespace
   * @param {string} [tag='div'] The Element node name [DOM] or component name
   * @param {(string|string[])} [name] The composition name, used for CSS className
   * @param {object} [props] Properties for composition
   * @param {object} [options] An optional ElementCreationOptions object [DOM]
   * @param {object} [elementNS] Options for namespaced Element node [DOM]
   * @param {string} [elementNS.namespaceURI] A valid namespace URI
   * @param {string} [elementNS.qualifiedName] A valid qualified name
   */
  constructor(ns, tag, name, props, options, elementNS) {
    if (! new.target) {
      throw 'Bad invocation. Must be called with `new`.';
    }

    super();

    const _ns = this._ns = '_' + ns;
    const nn = tag ? tag.toString() : 'div';

    if (REJECTED_TAG_NAMES.test(nn)) {
      throw new Error('Provided node name is not a valid name.');
    }

    const node = this[_ns] = this._element(ns, nn, name, props, options, elementNS);

    this.__Compo = true;
    this[_ns].__compo = this;

    if (props && typeof props == 'object') {
      for (const prop in props) {
        const p = prop.toString();

        if (DENIED_PROPS.test(p)) {
          throw new Error('Provided property name is not a valid name.');
        }
        //TODO dataset
        if (p.indexOf('on') === 0 && props[p] && typeof props[p] == 'function') {
          node[p] = props[p].bind(this);
        } else if (typeof props[p] != 'object') {
          node[p] = props[p];
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
      const nc = node.className;

      node.className = '';

      if (typeof name == 'string') {
        node.className = ns + '-' + name;
      } else if (typeof name == 'object') {
        node.className = name.map((a) => (ns + '-' + a)).join(' ');
      }

      if (nc) {
        node.className += ' ' + nc;
      }
    }

    this._render();
  }

  /**
   * Element wrapper
   *
   * @see document.createElement()
   * @see document.createElementNS()
   *
   * @param {string} ns Component namespace
   * @param {string} tag The Element node name or component name
   * @param {string} name Name for composition, used for CSS className
   * @param {object} props Properties for composition
   * @param {object} [options] An optional ElementCreationOptions object [DOM]
   * @param {object} [elementNS] Options for namespaced Element node [DOM]
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
   * @see Element.hasAttribute()
   *
   * @param {string} attr An attribute
   * @returns {boolean}
   */
  hasAttr(attr) {
    return this[this._ns].hasAttribute(attr);
  }

  /**
   * Gets an attribute from this composition
   *
   * @see Element.getAttribute()
   *
   * @param {string} attr An attribute
   * @returns {string}
   */
  getAttr(attr) {
    return this[this._ns].getAttribute(attr);
  }

  /**
   * Sets an attribute in this composition
   *
   * @see Element.setAttribute()
   *
   * @param {string} attr An attribute
   * @param {string} value The value
   */
  setAttr(attr, value) {
    this[this._ns].setAttribute(attr, value);
  }

  /**
   * Removes an attribute from this composition
   *
   * @see Element.removeAttribute()
   *
   * @param {string} attr An attribute
   */
  delAttr(attr) {
    this[this._ns].removeAttribute(attr);
  }

  /**
   * Gets a current style property
   *
   * @see window.getComputedStyle()
   *
   * @param {string} prop A style property
   * @returns {mixed}
   */
  getStyle(prop) {
    return window.getComputedStyle(this[this._ns])[prop];
  }

  /**
   * Shows this composition
   */
  show() {
    this[this._ns].hidden = false;
  }

  /**
   * Hides this composition
   */
  hide() {
    this[this._ns].hidden = true;
  }

  /**
   * Util to set attribute disabled to true
   */
  enable() {
    this[this._ns].disabled = false;
  }

  /**
   * Util to set attribute disabled to false
   */
  disable() {
    this[this._ns].disabled = true;
  }

  /**
   * Getter for node property, intended as the Element node inside this composition
   *
   * Note: Direct access to the node is discouraged.
   *
   * @var {getter}
   * @returns {Element}
   */
  get node() {
    console.warn('Direct access to the node is discouraged.');

    return this[this._ns];
  }

  /**
   * Getter for parent property, intended as the parent compo of this composition
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get parent() {
    const _ns = this._ns;
    return this[_ns].parentElement && '__compo' in this[_ns].parentElement ? this[_ns].parentElement.__compo : null;
  }

  /**
   * Getter for previous property, intended as the previous sibling of this composition
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get previous() {
    const _ns = this._ns;
    return this[_ns].previousElementSibling ? this[_ns].previousElementSibling.__compo : null;
  }

  /**
   * Getter for next property, intended as the next sibling of this composition
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get next() {
    const _ns = this._ns;
    return this[_ns].nextElementSibling ? this[_ns].nextElementSibling.__compo : null;
  }

  /**
   * Getter for classList property, intended as the classList of the Element node inside this composition
   *
   * @see DOMTokenList
   *
   * @var {getter}
   * @returns {DOMTokenList}
   */
  get classList() {
    return this[this._ns].classList;
  }

  /**
   * Checks passed object is an ensemble.Compo instance
   *
   * @static
   * @returns {boolean}
   */
  static isCompo(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Compo.prototype);
    else return obj && typeof obj == 'object' && '__Compo' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble.Compo class
   *
   * @see Symbol.toStringTag()
   *
   * @override
   * @returns {string}
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Compo';
  }

}


export default Compo;
