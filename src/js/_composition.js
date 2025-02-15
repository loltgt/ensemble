/**
 * ensemble _composition
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

const REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
const REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
const DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;


/**
 * Base class for ensemble.Compo and ensemble.Snap composition elements.
 *
 * @class
 * @abstract
 */
class _composition {

  /**
   * Element render
   */
  _render() {
    delete this._element;
    delete this._render;
  }

  /**
   * Bounds the composition to an element
   *
   * @see Node.appendChild()
   *
   * @param {Element} root A valid Element node
   * @param {function} cb A function callback
   * @returns {boolean}
   */
  bound(root, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! root.appendChild(this[this._ns]);
  }

  /**
   * Unbounds the composition from an element
   *
   * @see Node.removeChild()
   *
   * @param {Element} root A valid Element node
   * @param {function} cb A function callback
   * @returns {boolean}
   */
  unbound(root, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! root.removeChild(this[this._ns]);
  }

  /**
   * Bounds the composition replacing a placeholder element
   *
   * @see Node.replaceWith()
   *
   * @param {Element} node A valid Element node used as placeholder
   * @param {function} cb A function callback
   * @returns {boolean}
   * @todo backward compatibility
   */
  overlap(node, cb) {
    typeof cb == 'function' && cb.call(this, this[this._ns]);
    return !! node.replaceWith(this[this._ns]);
  }

  /**
   * Appends a compo inside this composition
   *
   * @see Node.appendChild()
   *
   * @param {ensemble.Compo} compo An ensemble.Compo composition
   * @returns {boolean}
   */
  append(compo) {
    const _ns = this._ns;
    return !! this[_ns].appendChild(compo[_ns]);
  }

  /**
   * Prepends a compo inside this composition
   *
   * @see Node.prependChild()
   *
   * @param {ensemble.Compo} compo An ensemble.Compo composition
   * @returns {boolean}
   */
  prepend(compo) {
    const _ns = this._ns;
    return !! this[_ns].prependChild(compo[_ns]);
  }

  /**
   * Removes a compo from this composition
   *
   * @see Node.removeChild()
   *
   * @param {ensemble.Compo} compo An ensemble.Compo composition
   * @returns {boolean}
   */
  remove(compo) {
    const _ns = this._ns;
    return !! this[_ns].removeChild(compo[_ns]);
  }

  /**
   * Fill this composition with an element node
   *
   * Note: Any inner element contained will be removed.
   *
   * @see Node.appendChild()
   *
   * @constant {RegExp} REJECTED_TAG_NAMES A regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS A regular expression for rejected tag
   * @param {Element} node A valid Element node
   * @returns {boolean}
   */
  fill(node) {
    if (node instanceof Element == false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
      throw new Error('Object cannot be resolved into a valid node.');
    }

    this.empty();

    return !! this[this._ns].appendChild(node);
  }

  /**
   * Empty this composition
   *
   * Note: Any inner element contained will be removed.
   */
  empty() {
    while (this.first) {
      this.remove(this.first);
    }
  }

  /**
   * Getter for children property, intended as children compo of this composition
   *
   * @var {getter}
   * @returns {array}
   */
  get children() {
    return Array.prototype.map.call(this[this._ns].children, (node) => { return node.__compo; });
  }

  /**
   * Getter for first property, intended as the first compo contained inside of this composition
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get first() {
    const _ns = this._ns;
    return this[_ns].firstElementChild ? this[_ns].firstElementChild.__compo : null;
  }

  /**
   * Getter for last property, intended as the last compo contained inside of this composition
   *
   * @var {getter}
   * @returns {ensemble.Compo}
   */
  get last() {
    const _ns = this._ns;
    return this[_ns].lastElementChild ? this[_ns].lastElementChild.__compo : null;
  }

}

export default _composition;
