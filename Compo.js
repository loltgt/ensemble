'use strict';

(function(ensemble) {

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

    reflow(force = false) {
    }

    append(compo) {
      this.node.appendChild(compo.node);
      this.reflow();
    }

    prepend(compo) {
      this.node.prependChild(compo.node);
      this.reflow();
    }

    remove(compo) {
      this.node.removeChild(compo.node);
      this.reflow();
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
      return this.node.children;
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
  }


  globalThis.ensemble = { ...ensemble, ...{ Compo } };

}(globalThis.ensemble));
