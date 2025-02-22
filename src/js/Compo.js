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

import part from './part.js';
import { l10n } from './locale.js';


const REJECTED_TAGS = 'html|head|body|meta|link|style|script';
const DENIED_PROPS ='attributes|classList|innerHTML|outerHTML|nodeName|nodeType';


/**
 * Compo is a composition element with shorthand methods and utils
 * 
 * It is a wrap around Element node [DOM]
 * It could be used as abstraction for a component.
 *
 * @class
 * @extends part
 * @inheritdoc
 * @example
 * new ensemble.Compo('compo-namespace', 'div', 'compo-name', {id: 'compo-id', tabIndex: 1});
 */
class Compo extends part {

  /**
   * Constructor method
   *
   * @constructs
   * @constant {RegExp} REJECTED_TAG_NAMES Regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS Regular expression for rejected tag
   * @constant {RegExp} DENIED_PROPS Regular expression for denied properties
   * @param {string} ns Compo namespace
   * @param {string} [tag='div'] The Element node name or compo name
   * @param {string[]} [name] The compo name, used for CSS className
   * @param {object} [props] Properties for compo
   * @param {object} [options] An optional ElementCreationOptions object
   * @param {object} [elementNS] Options for namespaced Element node
   * @param {string} [elementNS.namespaceURI] A valid namespace URI
   * @param {string} [elementNS.qualifiedName] A valid qualified name
   */
  constructor(ns, tag, name, props, options, elementNS) {
    if (! new.target) {
      throw l10n.EBADH;
    }

    super();

    const ns0 = this.ns = '_' + ns;
    const tagName = tag ? tag.toString() : 'div';

    if (RegExp(REJECTED_TAGS, 'i').test(tagName)) {
      throw new Error(l10n.ETAGN);
    }

    const el = this[ns0] = this.element(ns, tagName, name, props, options, elementNS);

    this.__Compo = true;
    this[ns0]._1 = this;

    if (props && typeof props == 'object') {
      for (const prop in props) {
        const p = prop.toString();

        if (RegExp(DENIED_PROPS).test(p)) {
          throw new Error(l10n.EPROP);
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
        el.className = Object.values(name).map((a) => (ns + '-' + a)).join(' ');
      }

      if (nodeClass) {
        el.className += ' ' + nodeClass;
      }
    }

    this.render();
  }

  /**
   * Object wrapper
   *
   * @see document.createElement
   * @see document.createElementNS
   *
   * @param {string} ns Compo namespace
   * @param {string} tag The Element node name or compo name
   * @param {string} name Name for compo, used for CSS className
   * @param {object} props Properties for compo
   * @param {object} [options] An optional ElementCreationOptions object
   * @param {object} [elementNS] Options for namespaced Element node
   * @param {string} [elementNS.namespaceURI] A valid namespace URI
   * @param {string} [elementNS.qualifiedName] A valid qualified name
   */
  element(ns, tag, name, props, options, elementNS) {
    if (elementNS) return document.createElementNS(tag, [...elementNS, ...options]);
    else return document.createElement(tag, options);
  }

  /**
   * Checks for an attribute of this compo
   *
   * @see Element.hasAttribute
   *
   * @param {string} attr An attribute
   * @returns {boolean}
   */
  hasAttr(attr) {
    return this[this.ns].hasAttribute(attr);
  }

  /**
   * Gets an attribute from this compo
   *
   * @see Element.getAttribute
   *
   * @param {string} attr An attribute
   * @returns {string}
   */
  getAttr(attr) {
    return this[this.ns].getAttribute(attr);
  }

  /**
   * Sets an attribute in this compo
   *
   * @see Element.setAttribute
   *
   * @param {string} attr An attribute
   * @param {string} value The value
   */
  setAttr(attr, value) {
    this[this.ns].setAttribute(attr, value);
  }

  /**
   * Removes an attribute from this compo
   *
   * @see Element.removeAttribute
   *
   * @param {string} attr An attribute
   */
  delAttr(attr) {
    this[this.ns].removeAttribute(attr);
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
    return window.getComputedStyle(this[this.ns])[prop];
  }

  /**
   * Shows this compo
   */
  show() {
    this[this.ns].hidden = false;
  }

  /**
   * Hides this compo
   */
  hide() {
    this[this.ns].hidden = true;
  }

  /**
   * Util to set attribute disabled to true
   */
  enable() {
    this[this.ns].disabled = false;
  }

  /**
   * Util to set attribute disabled to false
   */
  disable() {
    this[this.ns].disabled = true;
  }

  /**
   * Getter for node property, the Element node in this compo
   *
   * Note: Direct access to the node is discouraged.
   *
   * @var {getter}
   * @returns {Element}
   */
  get node() {
    console.warn(l10n.DOM);

    return this[this.ns];
  }

  /**
   * Getter for parent property, the parent compo of this compo
   *
   * @var {getter}
   * @returns {Compo}
   */
  get parent() {
    const el = this[this.ns];
    return el.parentElement && '_1' in el.parentElement ? el.parentElement._1 : null;
  }

  /**
   * Getter for previous property, the previous sibling of this compo
   *
   * @var {getter}
   * @returns {Compo}
   */
  get previous() {
    const el = this[this.ns];
    return el.previousElementSibling ? el.previousElementSibling._1 : null;
  }

  /**
   * Getter for next property, the next sibling of this compo
   *
   * @var {getter}
   * @returns {Compo}
   */
  get next() {
    const el = this[this.ns];
    return el.nextElementSibling ? el.nextElementSibling._1 : null;
  }

  /**
   * Getter for classList property, the classList of the Element node in this compo
   *
   * @see DOMTokenList
   *
   * @var {getter}
   * @returns {DOMTokenList}
   */
  get classList() {
    return this[this.ns].classList;
  }

  /**
   * Checks passed object is an ensemble Compo instance
   *
   * @static
   * @returns {boolean}
   */
  static isCompo(obj) {
    return obj instanceof Compo;
  }

}


export default Compo;
