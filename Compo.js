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

    //TODO
    // tag, name
    constructor(ns, tag, name, props) {
      this.__compo = this;
      this.tag = name ? tag : 'div';
      const node = this.node = document.createElement(this.tag);
      this.node.__compo = this;

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

    static isCompo(node) {
      return (node && '__compo' in node ? Symbol.for(node.__compo) : false) === Symbol.for(Compo.prototype);
    }

    append(compo) {
      this.node.appendChild(compo.node);
    }

    prepend(compo) {
      this.node.prependChild(compo.node);
    }

    remove(compo) {
      this.node.removeChild(compo.node);
    }

    // return undef
    clone(deep = false) {
    }

    // return undef
    hasAttr(attr) {
      return this.node.hasAttribute(attr);
    }

    // return undef
    getAttr(attr) {
      return this.node.getAttribute(attr);
    }

    // return undef
    setAttr(attr, value) {
      return this.node.setAttribute(attr, value);
    }

    // return undef
    delAttr(attr) {
      return this.node.removeAttribute(attr);
    }

    get children() {
      return Array.prototype.map.call(this.node.children, (node) => { return node.__compo; });
    }

    get first() {
      return this.node.firstElementChild ? this.node.firstElementChild.__compo : null;
    }

    get last() {
      return this.node.lastElementChild ? this.node.lastElementChild.__compo : null;
    }

    get previous() {
      return this.node.previousElementSibling ? this.node.previousElementSibling.__compo : null;
    }

    get next() {
      return this.node.nextElementSibling ? this.node.nextElementSibling.__compo : null;
    }

    get classList() {
      return this.node.classList;
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Compo';
    }

  }


  window.ensemble = { ...ensemble, ...{ Compo } };
  module.exports = Compo;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
