/**
 * ensemble part
 *
 * @version 0.4.0
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @exports part
 */

import { l10n } from './locale.js';


const REJECTED_TAGS = 'html|head|body|meta|link|style|script';


/**
 * Abstract for ensemble Compo and ensemble Flat
 *
 * @abstract
 */
class part {

  /**
   * Element render
   */
  render() {
    delete this.element;
    delete this.render;
  }

  /**
   * Binds the compo to an element
   *
   * @see Node.appendChild
   *
   * @param {Element} node A valid Element node
   * @param {function} cb Callback function
   * @returns {boolean}
   */
  bind(node, cb) {
    const el = this[this.ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! node.appendChild(el);
  }

  /**
   * Unbinds the compo from an element
   *
   * @see Node.removeChild
   *
   * @param {Element} node A valid Element node
   * @param {function} cb Callback function
   * @returns {boolean}
   */
  unbind(node, cb) {
    const el = this[this.ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! node.removeChild(el);
  }

  /**
   * Replaces a placeholder element with compo and binds the compo
   *
   * @see Node.replaceWith
   *
   * @param {Element} node A valid Element node used as placeholder
   * @param {function} cb Callback function
   * @returns {boolean}
   */
  place(node, cb) {
    const el = this[this.ns];
    typeof cb == 'function' && cb.call(this, el);
    return !! node.replaceWith(el);
  }

  /**
   * Appends a compo to this compo
   *
   * @see Node.appendChild
   *
   * @param {part} compo A compo
   * @returns {boolean}
   */
  append(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.appendChild(compo[ns]);
  }

  /**
   * Prepends a compo to this compo
   *
   * @see Node.insertBefore
   *
   * @param {part} compo A compo
   * @returns {boolean}
   */
  prepend(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.insertBefore(compo[ns], el.firstElementChild || null);
  }

  /**
   * Removes a compo from this composition
   *
   * @see Node.removeChild
   *
   * @param {part} compo A compo
   * @returns {boolean}
   */
  remove(compo) {
    const ns = this.ns, el = this[ns];
    return !! el.removeChild(compo[ns]);
  }

  /**
   * Fills the compo inner with an element node
   *
   * Note: Any inner element contained will be removed.
   *
   * @see Node.appendChild
   *
   * @constant {RegExp} REJECTED_TAGS Regular expression for rejected tag
   * @param {Element} node A valid Element node
   * @returns {boolean}
   */
  fill(node) {
    if (! node instanceof Element || RegExp(REJECTED_TAGS, 'i').test(node.tagName) || RegExp(`(<(${REJECTED_TAGS})*>)`, 'i').test(node.innerHTML)) {
      throw new Error(l10n.EMTAG);
    }

    this.empty();

    return !! this[this.ns].appendChild(node);
  }

  /**
   * Emptys this compo
   *
   * Note: Any inner element will be removed.
   */
  empty() {
    while (this.first) {
      this.remove(this.first);
    }
  }

  /**
   * Getter for children property, the children compo of this compo
   *
   * @var {getter}
   * @returns {array}
   */
  get children() {
    return Array.prototype.map.call(this[this.ns].children, (node) => { return node._1; });
  }

  /**
   * Getter for first property, the first compo in this compo
   *
   * @var {getter}
   * @returns {part}
   */
  get first() {
    const el = this[this.ns];
    return el.firstElementChild ? el.firstElementChild._1 : null;
  }

  /**
   * Getter for last property, the last compo in this compo
   *
   * @var {getter}
   * @returns {part}
   */
  get last() {
    const el = this[this.ns];
    return el.lastElementChild ? el.lastElementChild._1 : null;
  }

}

export default part;
