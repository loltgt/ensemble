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
 * Abstract for ensemble Compo and ensemble Snap
 *
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
   * @see Node.appendChild
   *
   * @param {Element} root A valid Element node
   * @param {function} cb Callback function
   * @returns {boolean}
   */
  bound(root, cb) {
    const ns = this.ns, el = this[ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! root.appendChild(el);
  }

  /**
   * Unbounds the composition from an element
   *
   * @see Node.removeChild
   *
   * @param {Element} root A valid Element node
   * @param {function} cb Callback function
   * @returns {boolean}
   */
  unbound(root, cb) {
    const ns = this.ns, el = this[ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! root.removeChild(el);
  }

  /**
   * Replaces a placeholder element with compo and bounds the composition
   *
   * @see Node.replaceWith
   *
   * @param {Element} node A valid Element node used as placeholder
   * @param {function} cb Callback function
   * @returns {boolean}
   * @todo backward compatibility
   */
  overlap(node, cb) {
    const ns = this.ns, el = this[ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! node.replaceWith(el);
  }

  /**
   * Appends a compo to this composition
   *
   * @see Node.appendChild
   *
   * @param {Compo} compo An ensemble Compo composition
   * @returns {boolean}
   */
  append(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.appendChild(compo[ns]);
  }

  /**
   * Prepends a compo to this composition
   *
   * @see Node.prependChild
   *
   * @param {Compo} compo An ensemble Compo composition
   * @returns {boolean}
   */
  prepend(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.prependChild(compo[ns]);
  }

  /**
   * Removes a compo from this composition
   *
   * @see Node.removeChild
   *
   * @param {Compo} compo An ensemble Compo composition
   * @returns {boolean}
   */
  remove(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.removeChild(compo[ns]);
  }

  /**
   * Fills the composition inner with an element node
   *
   * Note: Any inner element contained will be removed.
   *
   * @see Node.appendChild
   *
   * @constant {RegExp} REJECTED_TAG_NAMES Regular expression for rejected tag names
   * @constant {RegExp} REJECTED_TAGS Regular expression for rejected tag
   * @param {Element} node A valid Element node
   * @returns {boolean}
   */
  fill(node) {
    if (node instanceof Element == false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
      throw new Error('Object cannot be resolved into a valid node.');
    }

    const ns = this.ns, el = this[ns];
    this.empty();

    return !! el.appendChild(node);
  }

  /**
   * Emptys this composition
   *
   * Note: Any inner element contained will be removed.
   */
  empty() {
    while (this.first) {
      this.remove(this.first);
    }
  }

  /**
   * Getter for children property, the children compo of this composition
   *
   * @var {getter}
   * @returns {array}
   */
  get children() {
    const ns = this.ns, el = this[ns];
    return Array.prototype.map.call(el.children, (node) => { return node.__compo; });
  }

  /**
   * Getter for first property, the first compo in this composition
   *
   * @var {getter}
   * @returns {Compo}
   */
  get first() {
    const ns = this.ns, el = this[ns];
    return el.firstElementChild ? el.firstElementChild.__compo : null;
  }

  /**
   * Getter for last property, the last compo in this composition
   *
   * @var {getter}
   * @returns {Compo}
   */
  get last() {
    const ns = this.ns, el = this[ns];
    return el.lastElementChild ? el.lastElementChild.__compo : null;
  }

}

export default _composition;
