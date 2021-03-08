/*!
 * loltgt ensemble.Compo
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  const REJECTED_TAGS = /(^html|head|body|meta|link|style|script)/i;

  class Compo {
    // #rejectedTags = /(^html|head|body|meta|link|style|script)/i;

    //TODO
    // tag, name
    constructor(ns, tag, name, props) {
      const _ns = this._ns = '_' + ns;
      const ctag = name ? tag.toString() : 'div';

      // if (this.#rejectedTags.test(ctag)) {
      if (REJECTED_TAGS.test(ctag)) {
        throw new Error(`ensemble.Compo error: The tag name provided (\'${ctag}\') is not a valid name.`);
      }

      const node = this[_ns] = document.createElement(ctag);

      this[_ns].__compo = this;

      if (props && typeof props === 'object') {
        Object.assign(node, props);
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

    install(root) {
      root.appendChild(this[this._ns]);
    }

    uninstall(root) {
      root.removeChild(this[this._ns]);
    }

    up(node) {
      this.node = Object.seal({ ref: node });

      return !! node.replaceWith(this[this._ns]);
    }

    // return bool
    append(compo) {
      const _ns = this._ns;
      return !! this[_ns].appendChild(compo[_ns]);
    }

    // return bool
    prepend(compo) {
      const _ns = this._ns;
      return !! this[_ns].prependChild(compo[_ns]);
    }

    // return bool
    remove(compo) {
      const _ns = this._ns;
      return !! this[_ns].removeChild(compo[_ns]);
    }

    //TODO
    replace(compo) {
    }

    //TODO
    clone(deep = false) {
    }

    inject(node) {
      const errMsg = 'ensemble.Compo error: The remote object could not be resolved into a valid node.';

      if (node instanceof Element === false || node.__proto__.constructor.toString().indexOf('[native code]') === -1) {
        throw new Error(errMsg);
      }
      // if (this.#rejectedTags.test(node.tagName)) {
      if (REJECTED_TAGS.test(node.tagName)) {
        throw new Error(errMsg);

        //TODO test all childs

      }

      this.empty();

      this._node = this[this._ns].appendChild(node);
    }

    empty() {
      while (this.first) {
        this.remove(this.first);
      }
    }

    hasAttr(attr) {
      return this[this._ns].hasAttribute(attr);
    }

    getAttr(attr) {
      return this[this._ns].getAttribute(attr);
    }

    // return undef
    setAttr(attr, value) {
      this[this._ns].setAttribute(attr, value);
    }

    // return undef
    delAttr(attr) {
      this[this._ns].removeAttribute(attr);
    }

    getStyle(prop) {
      return window.getComputedStyle(this[this._ns])[prop];
    }

    show() {
      this[this._ns].hidden = false;
    }

    hide() {
      this[this._ns].hidden = true;
    }

    enable() {
      this[this._ns].disabled = false;
    }

    disable() {
      this[this._ns].disabled = true;
    }

    get children() {
      return Array.prototype.map.call(this[this._ns].children, (node) => { return node.__compo; });
    }

    get first() {
      const _ns = this._ns;
      return this[_ns].firstElementChild ? this[_ns].firstElementChild.__compo : null;
    }

    get last() {
      const _ns = this._ns;
      return this[_ns].lastElementChild ? this[_ns].lastElementChild.__compo : null;
    }

    get previous() {
      const _ns = this._ns;
      return this[_ns].previousElementSibling ? this[_ns].previousElementSibling.__compo : null;
    }

    get next() {
      const _ns = this._ns;
      return this[_ns].nextElementSibling ? this[_ns].nextElementSibling.__compo : null;
    }

    get classList() {
      return this[this._ns].classList;
    }

    static isCompo(node) {
      return Symbol.for(node) === Symbol.for(Compo.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Compo';
    }

  }


  window.ensemble = { ...ensemble, ...{ Compo } };
  module.exports = Compo;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
