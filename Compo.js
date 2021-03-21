/*!
 * loltgt ensemble.Compo
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Compo
 */

/**
 * @borrows Symbol as _Symbol
 * @todo backward compatibility
 */
const _Symbol = typeof Symbol == 'undefined' ? 0 : Symbol;


const REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
const REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
const DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;


/**
 * Compo is a composition element with shorthands method and utils.
 * 
 * It is a wrapper around an Element node [DOM].
 * It could be used as a base for abstraction of a custom component element.
 *
 * @example
 * new ensemble.Compo('namespace-of-my-foo-component', 'div', 'foo', { id: 'fooDiv', tabIndex: 1 });
 * @class
 */
class Compo {

  /**
   * Constructor method.
   *
   * @see document.createElement()
   * @see document.createElementNS()
   *
   * //global document.createElement
   * @constructs
   * @constant {RegExp} REJECTED_TAG_NAMES - A regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS - A regular expression for rejected tag
   * @constant {RegExp} DENIED_PROPS - A regular expression for denied properties
   * @param {string} ns - Composition namespace
   * @param {string} tag - The [DOM] Element node tag -or- component name
   * @param {string} name
   * @param {object} props - Properties for Element node -or- component
   * @todo tag, name
   */
  constructor(ns, tag, name, props) {
    if (! new.target) {
      throw 'ensemble error: Bad invocation, must be called with new.';
    }

    const _ns = this._ns = '_' + ns;
    const ctag = name ? tag.toString() : 'div';

    if (REJECTED_TAG_NAMES.test(ctag)) {
      throw new Error(`ensemble.Compo error: The tag name provided (\'${ctag}\') is not a valid name.`);
    }

    const node = this[_ns] = document.createElement(ctag);

    //TODO
    this.__Compo = true;
    this[_ns].__compo = this;

    if (props && typeof props == 'object') {
      for (const prop in props) {
        const cprop = prop.toString();

        if (DENIED_PROPS.test(cprop)) {
          throw new Error(`ensemble.Compo error: The property name provided (\'${cprop}\')' is not a valid name.`);
        }
        if (cprop.indexOf('on') === 0 && props[cprop]) {
          node[cprop] = props[cprop].bind(this);
        } else if (typeof props[cprop] != 'object') {
          node[cprop] = props[cprop];
        } else if (cprop === 'children') {
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

    //TODO args coherence
    if (name != false && name != true) {
      const _name = node.className;

      node.className = ns + '-' + tag;

      if (name) {
        node.className += ' ' + ns + '-' + name;
      }
      if (_name) {
        node.className += ' ' + _name;
      }
    }
  }

  /**
   * Install the composition.
   *
   * @see HTMLElement.appendChild()
   *
   * @param {Element} root - A valid Element node
   * @param {function} cb - A function callback
   * @returns {boolean}
   */
  install(root, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! root.appendChild(this[this._ns]);
  }

  /**
   * Uninstall the composition.
   *
   * @see Element.removeChild()
   *
   * @param {Element} root - A valid Element node
   * @param {function} cb - A function callback
   * @returns {boolean}
   */
  uninstall(root, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! root.removeChild(this[this._ns]);
  }

  /**
   * Loads the composition replacing a placeholder element.
   *
   * @see Element.replaceWith()
   *
   * @param {Element} pholder - A valid Element node
   * @param {function} cb - A function callback
   * @returns {boolean}
   * @todo backward compatibility
   */
  up(pholder, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! pholder.replaceWith(this[this._ns]);
  }

  /**
   * Appends a compo inside this composition.
   *
   * @see Element.appendChild()
   *
   * @param {ensemble.Compo} compo - An ensemble.Compo composition
   * @returns {boolean}
   */
  append(compo) {
    const _ns = this._ns;
    return !! this[_ns].appendChild(compo[_ns]);
  }

  /**
   * Prepends a compo inside this composition.
   *
   * @see Element.prependChild()
   *
   * @param {ensemble.Compo} compo - An ensemble.Compo composition
   * @returns {boolean}
   */
  prepend(compo) {
    const _ns = this._ns;
    return !! this[_ns].prependChild(compo[_ns]);
  }

  /**
   * Removes a compo from this composition.
   *
   * @see Element.removeChild()
   *
   * @param {ensemble.Compo} compo - An ensemble.Compo composition
   * @returns {boolean}
   */
  remove(compo) {
    const _ns = this._ns;
    return !! this[_ns].removeChild(compo[_ns]);
  }

  /**
   * Replace this composition with another compo.
   *
   * @todo TODO
   * @param {ensemble.Compo} compo - An ensemble.Compo composition
   */
  replace(compo) {
  }

  /**
   * Clones this composition.
   * 
   * @todo TODO
   * @param {boolean} deep - Clone also all compo inside this composition
   */
  clone(deep = false) {
  }

  /**
   * Inject an element node inside this composition.
   * Note that any inner element contained will be removed.
   *
   * @see Element.appendChild()
   *
   * @param {Element} node - A valid Element node
   * @returns {boolean}
   */
  inject(node) {
    if (node instanceof Element == false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
      throw new Error('ensemble.Compo error: The remote object could not be resolved into a valid node.');
    }

    this.empty();

    return !! this[this._ns].appendChild(node);
  }

  /**
   * Empty this composition.
   * Any inner element contained will be removed.
   *
   * @see Element.remove()
   */
  empty() {
    while (this.first) {
      //TODO
      // backward compatibility
      this.remove(this.first);
    }
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
   * //global window.getComputedStyle
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
   * Note that a direct access to the Element node is discouraged.
   *
   * @var {getter}
   * @returns {Element}
   */
  get node() {
    console.warn('ensemble.Compo', 'Direct access to the Element node is strongly discouraged.');

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
   * Getter for children property, intended as children compo of this composition.
   *
   * @var {getter}
   * @returns {array}
   */
  get children() {
    return Array.prototype.map.call(this[this._ns].children, (node) => { return node.__compo; });
  }

  /**
   * Getter for first property, intended as the first compo contained inside of this composition.
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get first() {
    const _ns = this._ns;
    return this[_ns].firstElementChild ? this[_ns].firstElementChild.__compo : null;
  }

  /**
   * Getter for last property, intended as the last compo contained inside of this composition.
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get last() {
    const _ns = this._ns;
    return this[_ns].lastElementChild ? this[_ns].lastElementChild.__compo : null;
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
   * @see Symbol.toStringTag
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