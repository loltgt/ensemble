/*!
 * loltgt ensemble.Compo
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  class Compo {
    #rejectedTags = /(^html|head|body|meta|link|style|script)/i;

    //TODO
    // tag, name
    constructor(ns, tag, name, props) {
      const _ns = this._ns = '_' + ns;
      const ctag = name ? tag : 'div';

      if (this.#rejectedTags.test(ctag)) {
        throw new Error(`ensemble.Compo error: The tag name provided (\'${ctag}\') is not a valid name.`);
      }

      const node = this[_ns] = document.createElement(ctag);

      this[_ns].__compo = this;

      if (props && typeof props === 'object') {
        Object.assign(node, props);
      }
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
      const _ns = this._ns;
      root.appendChild(this[_ns]);
    }

    uninstall(root) {
      const _ns = this._ns;
      root.removeChild(this[_ns]);
    }

    up(node) {
      const _ns = this._ns;

      this.node = Object.seal({ ref: node });

      return !! node.replaceWith(this[_ns]);
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
      const _ns = this._ns;
    }

    //TODO
    clone(deep = false) {
      const _ns = this._ns;
    }

    inject(node) {
      const errMsg = 'ensemble.Compo error: The remote object could not be resolved into a valid node.';
      if (node instanceof Element === false || node.__proto__.constructor.toString().indexOf('[native code]') === -1) {
        throw new Error(errMsg);
      }
      if (this.#rejectedTags.test(node.tagName)) {
        throw new Error(errMsg);

        //TODO test all childs

      }

      this.empty();

      const _ns = this._ns;

      this._node = this[_ns].appendChild(node);
    }

    empty() {
      while (this.first) {
        this.remove(this.first);
      }
    }

    hasAttr(attr) {
      const _ns = this._ns;
      return this[_ns].hasAttribute(attr);
    }

    getAttr(attr) {
      const _ns = this._ns;
      return this[_ns].getAttribute(attr);
    }

    // return undef
    setAttr(attr, value) {
      const _ns = this._ns;
      this[_ns].setAttribute(attr, value);
    }

    // return undef
    delAttr(attr) {
      const _ns = this._ns;
      this[_ns].removeAttribute(attr);
    }

    getStyle(prop) {
      const _ns = this._ns;
      return window.getComputedStyle(this[_ns])[prop];
    }

    show() {
      const _ns = this._ns;
      this[_ns].hidden = false;
    }

    hide() {
      const _ns = this._ns;
      this[_ns].hidden = true;
    }

    enable() {
      const _ns = this._ns;
      this[_ns].disabled = false;
    }

    disable() {
      const _ns = this._ns;
      this[_ns].disabled = true;
    }

    get children() {
      const _ns = this._ns;
      return Array.prototype.map.call(this[_ns].children, (node) => { return node.__compo; });
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
      const _ns = this._ns;
      return this[_ns].classList;
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
