/*!
 * loltgt ensemble.Data
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  const Compo = ensemble ? ensemble.Compo : require('./Compo');


  class Data {

    constructor(ns, obj) {
      if (obj && typeof obj === 'object') {
        Object.assign(this, {}, obj);
      }

      const _ns = this._ns = '_' + ns;
      this.ns = ns;
      this[_ns] = [];
    }

    compo(tag, name, props, defer = false, load = false, unload = false) {
      const ns = this.ns;
      let compo;

      if (defer) {
        compo = { ns, tag, name, props, load, unload };
      } else {
        compo = new Compo(ns, tag, name, props);
      }
      if (load && typeof load === 'function') {
        compo.load = props.onload = load;
      }
      if (unload && typeof unload === 'function') {
        compo.unload = props.onunload = unload;
      }

      return compo;
    }

    async render(slot) {
      const _ns = this._ns;

      if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].load();
      } else {
        this[_ns][slot] = { rendered: true, load: this[slot].load, unload: this[slot].unload, params: this[slot] };
        this[slot] = new Compo(this[slot].ns, this[slot].tag, this[slot].name, this[slot].props);
      }
    }

    async stale(slot) {
      const _ns = this._ns;

      if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].unload();
      }
    }

    async reflow(slot, force) {
      const _ns = this._ns;

      if (force) {
        this[_ns][slot] = this.compo(this[_ns][slot].params.ns, this[_ns][slot].params.name, this[_ns][slot].params.props);
      } else if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].load();
      }
    }

    static isData(node) {
      return Symbol.for(node) === Symbol.for(Data.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Data';
    }

  }


  window.ensemble = { ...ensemble, ...{ Data } };
  module.exports = Data;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
