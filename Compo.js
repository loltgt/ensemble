/*!
 * loltgt ensemble.Compo
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  const REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
  const REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
  const DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;

  class Compo {
    // #rejectedTagNames = /html|head|body|meta|link|style|script/i;
    // #rejectedTags = /(<(html|head|body|meta|link|style|script)*>)/i;
    // #deniedProps = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;

    //TODO
    // tag, name
    constructor(ns, tag, name, props) {
      const _ns = this._ns = '_' + ns;
      const ctag = name ? tag.toString() : 'div';

      // if (this.#rejectedTagNames.test(ctag)) {
      if (REJECTED_TAG_NAMES.test(ctag)) {
        throw new Error(`ensemble.Compo error: The tag name provided (\'${ctag}\') is not a valid name.`);
      }

      const node = this[_ns] = document.createElement(ctag);

      this[_ns].__compo = this;

      if (props && typeof props == 'object') {
        for (const prop in props) {
          const cprop = prop.toString();

          // if (this.#deniedProps.test(cprop)) {
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
      // if (node instanceof Element === false || this.#rejectedTagNames.test(node.tagName) || this.#rejectedTags.test(node.innerHTML)) {
      if (node instanceof Element === false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
        throw new Error('ensemble.Compo error: The remote object could not be resolved into a valid node.');
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

    //TODO undef
    get [Symbol.toStringTag]() {
      return 'ensemble.Compo';
    }

  }


  window.ensemble = { ...ensemble, ...{ Compo } };
  module.exports = Compo;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
