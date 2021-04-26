/*!
 * loltgt ensemble.Compo
 *
 * @version 0.0.1
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
 * Compo is a composition element with shorthands method and utils.
 * 
 * It is a wrapper around an Element node [DOM].
 * It could be used as base for abstraction of a custom component element.
 *
 * @class
 * @extends _composition
 * @inheritdoc
 * @example
 * new ensemble.Compo('namespace-of-my-foo-component', 'div', 'foo', { id: 'fooDiv', tabIndex: 1 });
 */
class Compo extends _composition {

  /**
   * Constructor method.
   *
   * @constructs
   * @constant {RegExp} REJECTED_TAG_NAMES - A regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS - A regular expression for rejected tag
   * @constant {RegExp} DENIED_PROPS - A regular expression for denied properties
   * @param {string} ns - Component namespace
   * @param {string} [tag='div'] - The [DOM] Element node tag -or- component name
   * @param {(string|string[])} [name] - The composition name, used for CSS className
   * @param {object} [props] - Properties for composition
   * @param {object} [options] - An optional ElementCreationOptions object [DOM]
   * @param {object} [elementNS] - Options for namespaced Element node [DOM]
   * @param {string} [elementNS.namespaceURI] - A valid namespace URI
   * @param {string} [elementNS.qualifiedName] - A valid qualified name
   * @todo props.dataset
   */
  constructor(ns, tag, name, props, options, elementNS) {
    if (! new.target) {
      throw 'ensemble.Compo error: Bad invocation, must be called with new.';
    }

    super();

    const _ns = this._ns = '_' + ns;
    const ctag = tag ? tag.toString() : 'div';

    if (REJECTED_TAG_NAMES.test(tag)) {
      throw new Error(`ensemble.Compo error: The tag name provided ('${ctag}') is not a valid name.`);
    }

    const node = this[_ns] = this._element(ns, ctag, name, props, options, elementNS);

    this.__Compo = true;
    this[_ns].__compo = this;

    if (props && typeof props == 'object') {
      for (const prop in props) {
        const cprop = prop.toString();

        if (DENIED_PROPS.test(cprop)) {
          throw new Error(`ensemble.Compo error: The property name provided ('${cprop}') is not a valid name.`);
        }
        if (cprop.indexOf('on') === 0 && props[cprop] && typeof props[cprop] == 'function') {
          node[cprop] = props[cprop].bind(this);
        //TODO
        // } else if (cprop == 'dataset' && typeof props[cprop] == 'object') {
        //   node.dataset = Object.assign(node.dataset, props[cprop]);
        } else if (typeof props[cprop] != 'object') {
          node[cprop] = props[cprop];
        } else if (cprop == 'children') {
          if (typeof props[cprop] == 'object' && props[cprop].length) {
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
      const _name = node.className;

      node.className = '';

      if (typeof name == 'string') {
        node.className = ns + '-' + name;
      } else if (typeof name == 'object') {
        node.className = name.map((a) => (ns + '-' + a)).join(' ');
      }

      if (_name) {
        node.className += ' ' + _name;
      }
    }

    this._renderer();
  }

  /**
   * Element wrapper.
   *
   * @see document.createElement()
   * @see document.createElementNS()
   *
   * @param {string} ns - Component namespace
   * @param {string} tag - The element Node tag -or- component name
   * @param {string} name - Name for composition, used for CSS className
   * @param {object} props - Properties for composition
   * @param {object} [options] - An optional ElementCreationOptions object [DOM]
   * @param {object} [elementNS] - Options for namespaced Element node [DOM]
   * @param {string} [elementNS.namespaceURI] - A valid namespace URI
   * @param {string} [elementNS.qualifiedName] - A valid qualified name
   */
  _element(ns, tag, name, props, options, elementNS) {
    if (elementNS) return document.createElementNS(tag, [...elementNS, ...options]);
    else return document.createElement(tag, options);
  }

  /**
   * Check for an attribute of this composition.
   *
   * @see Element.hasAttribute()
   *
   * @param {string} attr - An attribute
   * @returns {boolean}
   */
  hasAttr(attr) {
    return this[this._ns].hasAttribute(attr);
  }

  /**
   * Gets an attribute from this composition.
   *
   * @see Element.getAttribute()
   *
   * @param {string} attr - An attribute
   * @returns {string}
   */
  getAttr(attr) {
    return this[this._ns].getAttribute(attr);
  }

  /**
   * Sets an attribute in this composition.
   *
   * @see Element.setAttribute()
   *
   * @param {string} attr - An attribute
   * @param {string} value - The value
   */
  setAttr(attr, value) {
    this[this._ns].setAttribute(attr, value);
  }

  /**
   * Removes an attribute from this composition. 
   *
   * @see Element.removeAttribute()
   *
   * @param {string} attr - An attribute
   */
  delAttr(attr) {
    this[this._ns].removeAttribute(attr);
  }

  /**
   * Gets a current style property.
   *
   * @see window.getComputedStyle()
   *
   * @param {string} prop - A style property
   * @returns {mixed}
   */
  getStyle(prop) {
    return window.getComputedStyle(this[this._ns])[prop];
  }

  /**
   * Time to show this composition.
   */
  show() {
    this[this._ns].hidden = false;
  }

  /**
   * Time to hide this composition.
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
   * Getter for node property, intended as the Element node inside this composition.
   * Note that a direct access to the node is discouraged.
   *
   * @var {getter}
   * @returns {Element}
   */
  get node() {
    console.warn('ensemble.Compo', 'Direct access to the node is strongly discouraged.');

    return this[this._ns];
  }

  /**
   * Getter for parent property, intended as the parent compo of this composition.
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get parent() {
    const _ns = this._ns;
    return this[_ns].parentElement && '__compo' in this[_ns].parentElement ? this[_ns].parentElement.__compo : null;
  }

  /**
   * Getter for previous property, intended as the previous sibling of this composition.
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get previous() {
    const _ns = this._ns;
    return this[_ns].previousElementSibling ? this[_ns].previousElementSibling.__compo : null;
  }

  /**
   * Getter for next property, intended as the next sibling of this composition.
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get next() {
    const _ns = this._ns;
    return this[_ns].nextElementSibling ? this[_ns].nextElementSibling.__compo : null;
  }

  /**
   * Getter for classList property, intended as the classList of the Element node inside this composition.
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
   * Check if passed object is an ensemble.Compo instance.
   *
   * @static
   * @returns {boolean}
   * @todo backward compatibility
   */
  static isCompo(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Compo.prototype);
    else return obj && typeof obj == 'object' && '__Compo' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble.Compo class.
   *
   * @see Symbol.toStringTag()
   *
   * @override
   * @returns {string}
   * @todo return undef
   * @todo backward compatibility
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Compo';
  }

}


export default Compo;
